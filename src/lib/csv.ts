// Import des apprentis depuis un export CSV Netyparéo (ou tout tableur équivalent).
import Papa from 'papaparse';
import type { Learner, Trade } from './types';

export type LearnerField =
  | 'lastName'
  | 'firstName'
  | 'fullName'
  | 'birthDate'
  | 'email'
  | 'phone'
  | 'externalId'
  | 'formation'
  | 'groupName'
  | 'company';

export const FIELD_LABELS: Record<LearnerField, string> = {
  lastName: 'Nom',
  firstName: 'Prénom',
  fullName: 'Nom et prénom (colonne unique)',
  birthDate: 'Date de naissance',
  email: 'E-mail',
  phone: 'Téléphone',
  externalId: 'Identifiant apprenant',
  formation: 'Formation / diplôme',
  groupName: 'Groupe / classe',
  company: 'Entreprise',
};

export type ColumnMapping = Partial<Record<LearnerField, number>>;

export interface ParsedCsv {
  headers: string[];
  rows: string[][];
  mapping: ColumnMapping;
  encoding: 'utf-8' | 'windows-1252';
}

export type ImportedLearner = Omit<Learner, 'id'>;

export function normalize(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[’'`_.\-/()°:]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Décode un fichier : UTF-8 si valide, sinon Windows-1252 (exports Excel/Netyparéo). */
export function decodeBuffer(buf: ArrayBuffer): { text: string; encoding: 'utf-8' | 'windows-1252' } {
  try {
    const text = new TextDecoder('utf-8', { fatal: true }).decode(buf);
    return { text: text.replace(/^﻿/, ''), encoding: 'utf-8' };
  } catch {
    return { text: new TextDecoder('windows-1252').decode(buf), encoding: 'windows-1252' };
  }
}

// Ordre important : les champs les plus spécifiques sont testés en premier.
const SYNONYMS: [LearnerField, string[]][] = [
  ['birthDate', ['date de naissance', 'date naissance', 'naissance', 'ne le', 'nee le', 'ne e le', 'dt naissance', 'date nais']],
  ['email', ['email', 'e mail', 'mail', 'courriel', 'adresse mail', 'adresse electronique']],
  ['phone', ['telephone', 'tel', 'portable', 'mobile', 'tel portable', 'telephone portable']],
  ['company', ['entreprise', 'employeur', 'raison sociale', 'societe', 'nom entreprise', 'nom employeur']],
  [
    'externalId',
    ['code apprenant', 'id apprenant', 'identifiant', 'identifiant apprenant', 'numero apprenant', 'n apprenant', 'matricule', 'ine', 'code', 'id', 'num apprenant'],
  ],
  [
    'formation',
    ['formation', 'libelle formation', 'libelle de la formation', 'intitule formation', 'diplome', 'diplome prepare', 'specialite', 'cursus'],
  ],
  ['groupName', ['groupe', 'classe', 'section', 'libelle groupe', 'code groupe', 'nom groupe', 'promotion']],
  ['firstName', ['prenom', 'prenom apprenant', 'prenom de l apprenant', 'prenom usuel', 'prenom stagiaire']],
  ['fullName', ['nom prenom', 'nom et prenom', 'apprenant', 'stagiaire', 'nom complet', 'identite']],
  ['lastName', ['nom', 'nom apprenant', 'nom de l apprenant', 'nom usuel', 'nom de naissance', 'nom de famille', 'nom stagiaire']],
];

const EXCLUDE_FOR_LASTNAME = ['prenom', 'entreprise', 'employeur', 'groupe', 'formation', 'tuteur', 'maitre', 'responsable', 'representant', 'pere', 'mere', 'ville', 'commune'];

export function guessMapping(headers: string[]): ColumnMapping {
  const norm = headers.map(normalize);
  const mapping: ColumnMapping = {};
  const used = new Set<number>();
  // 1) correspondances exactes
  for (const [field, syns] of SYNONYMS) {
    const idx = norm.findIndex((h, i) => !used.has(i) && syns.includes(h));
    if (idx >= 0) {
      mapping[field] = idx;
      used.add(idx);
    }
  }
  // 2) correspondances partielles
  for (const [field, syns] of SYNONYMS) {
    if (mapping[field] !== undefined) continue;
    const idx = norm.findIndex((h, i) => {
      if (used.has(i)) return false;
      if (field === 'lastName' && EXCLUDE_FOR_LASTNAME.some((x) => h.includes(x))) return false;
      if (field === 'firstName' && ['tuteur', 'maitre', 'responsable', 'representant'].some((x) => h.includes(x))) return false;
      if (field === 'externalId' && !h.includes('apprenant') && !h.includes('stagiaire') && h !== 'code') return false;
      return syns.some((s) => s.length > 3 && (h.startsWith(s + ' ') || h.endsWith(' ' + s) || h.includes(' ' + s + ' ') || h === s));
    });
    if (idx >= 0) {
      mapping[field] = idx;
      used.add(idx);
    }
  }
  if (mapping.lastName !== undefined && mapping.firstName !== undefined) delete mapping.fullName;
  return mapping;
}

function headerScore(row: string[]): number {
  const m = guessMapping(row);
  let score = 0;
  if (m.lastName !== undefined || m.fullName !== undefined) score += 2;
  if (m.firstName !== undefined) score += 2;
  score += Object.keys(m).length;
  return score;
}

export function parseCsvText(text: string, encoding: 'utf-8' | 'windows-1252' = 'utf-8'): ParsedCsv {
  const firstLine = text.split(/\r?\n/).find((l) => l.trim()) ?? '';
  const semicolons = (firstLine.match(/;/g) ?? []).length;
  const commas = (firstLine.match(/,/g) ?? []).length;
  const tabs = (firstLine.match(/\t/g) ?? []).length;
  const delimiter = tabs > semicolons && tabs > commas ? '\t' : semicolons >= commas ? ';' : ',';
  const result = Papa.parse<string[]>(text, { delimiter, skipEmptyLines: 'greedy' });
  const all = (result.data as string[][]).map((r) => r.map((c) => (c ?? '').trim()));

  // Certains exports commencent par des lignes de titre : on cherche la ligne d'en-tête.
  let headerIdx = 0;
  let best = -1;
  for (let i = 0; i < Math.min(all.length, 15); i++) {
    const s = headerScore(all[i]);
    if (s > best) {
      best = s;
      headerIdx = i;
    }
  }
  const headers = all[headerIdx] ?? [];
  const rows = all.slice(headerIdx + 1).filter((r) => r.some((c) => c !== ''));
  return { headers, rows, mapping: guessMapping(headers), encoding };
}

export function parseCsvBuffer(buf: ArrayBuffer): ParsedCsv {
  const { text, encoding } = decodeBuffer(buf);
  return parseCsvText(text, encoding);
}

/** Convertit une date saisie (JJ/MM/AAAA, AAAA-MM-JJ, JJ/MM/AA, numéro de série Excel) en AAAA-MM-JJ. */
export function parseDate(raw: string): string {
  const s = (raw ?? '').trim();
  if (!s) return '';
  let m = s.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})/);
  if (m) return fmt(+m[1], +m[2], +m[3]);
  m = s.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{2,4})/);
  if (m) {
    let y = +m[3];
    if (m[3].length === 2) {
      const current = new Date().getFullYear() % 100;
      y += y > current ? 1900 : 2000;
    }
    return fmt(y, +m[2], +m[1]);
  }
  if (/^\d{5}$/.test(s)) {
    // Numéro de série Excel (jours depuis le 30/12/1899)
    const d = new Date(Date.UTC(1899, 11, 30) + +s * 86400000);
    return fmt(d.getUTCFullYear(), d.getUTCMonth() + 1, d.getUTCDate());
  }
  return '';
}

function fmt(y: number, mo: number, d: number): string {
  if (mo < 1 || mo > 12 || d < 1 || d > 31 || y < 1900 || y > 2100) return '';
  return `${y}-${String(mo).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

export function formatLastName(s: string): string {
  return s.trim().replace(/\s+/g, ' ').toLocaleUpperCase('fr-FR');
}

export function formatFirstName(s: string): string {
  return s
    .trim()
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('fr-FR')
    .replace(/(^|[\s-])(\p{L})/gu, (_, sep: string, ch: string) => sep + ch.toLocaleUpperCase('fr-FR'));
}

/** « DUPONT Jean-Marc » ou « Jean-Marc DUPONT » -> nom / prénom. */
export function splitFullName(full: string): { lastName: string; firstName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length <= 1) return { lastName: parts[0] ?? '', firstName: '' };
  const isUpper = (w: string) => w === w.toLocaleUpperCase('fr-FR') && /\p{L}/u.test(w);
  const upper = parts.filter(isUpper);
  if (upper.length > 0 && upper.length < parts.length) {
    return { lastName: upper.join(' '), firstName: parts.filter((w) => !isUpper(w)).join(' ') };
  }
  return { lastName: parts[0], firstName: parts.slice(1).join(' ') };
}

export function rowsToLearners(parsed: ParsedCsv, mapping: ColumnMapping = parsed.mapping): ImportedLearner[] {
  const get = (row: string[], f: LearnerField) => {
    const i = mapping[f];
    return i === undefined ? '' : (row[i] ?? '').trim();
  };
  const out: ImportedLearner[] = [];
  for (const row of parsed.rows) {
    let lastName = get(row, 'lastName');
    let firstName = get(row, 'firstName');
    if ((!lastName || !firstName) && mapping.fullName !== undefined) {
      const split = splitFullName(get(row, 'fullName'));
      lastName = lastName || split.lastName;
      firstName = firstName || split.firstName;
    }
    if (!lastName && !firstName) continue;
    const learner: ImportedLearner = {
      lastName: formatLastName(lastName),
      firstName: formatFirstName(firstName),
      source: 'csv',
    };
    const birthDate = parseDate(get(row, 'birthDate'));
    if (birthDate) learner.birthDate = birthDate;
    const optional: [LearnerField, keyof ImportedLearner][] = [
      ['email', 'email'],
      ['phone', 'phone'],
      ['externalId', 'externalId'],
      ['formation', 'formation'],
      ['groupName', 'groupName'],
      ['company', 'company'],
    ];
    for (const [field, key] of optional) {
      const v = get(row, field);
      if (v) (learner as Record<string, unknown>)[key] = v;
    }
    out.push(learner);
  }
  return out;
}

// ---------------------------------------------------------------- Détection du métier

function keywordMatches(text: string, keyword: string): boolean {
  const k = normalize(keyword);
  if (!k) return false;
  if (k.length <= 4) return new RegExp(`(^|[^a-z0-9])${k}([^a-z]|$)`).test(text);
  return text.includes(k);
}

export function detectTrade(text: string, trades: Trade[]): Trade | null {
  const t = normalize(text);
  if (!t) return null;
  let best: { trade: Trade; len: number } | null = null;
  for (const trade of trades) {
    for (const kw of trade.keywords) {
      if (keywordMatches(t, kw)) {
        const len = normalize(kw).length;
        if (!best || len > best.len) best = { trade, len };
      }
    }
  }
  return best?.trade ?? null;
}

/** Métier majoritaire parmi les apprentis importés. */
export function detectSessionTrade(learners: ImportedLearner[], trades: Trade[]): Trade | null {
  const counts = new Map<string, { trade: Trade; n: number }>();
  for (const l of learners) {
    const trade = detectTrade(`${l.formation ?? ''} ${l.groupName ?? ''}`, trades);
    if (!trade) continue;
    const c = counts.get(trade.id) ?? { trade, n: 0 };
    c.n++;
    counts.set(trade.id, c);
  }
  let best: { trade: Trade; n: number } | null = null;
  for (const c of counts.values()) if (!best || c.n > best.n) best = c;
  return best?.trade ?? null;
}

// ---------------------------------------------------------------- Mise à jour d'une liste existante

export interface ImportDiff {
  added: ImportedLearner[];
  updated: { existing: Learner; incoming: ImportedLearner; changes: string[] }[];
  unchanged: Learner[];
  missing: Learner[];
}

function identityKeys(l: Pick<Learner, 'externalId' | 'lastName' | 'firstName' | 'birthDate'>): string[] {
  const keys: string[] = [];
  if (l.externalId) keys.push('id:' + normalize(l.externalId));
  const name = normalize(`${l.lastName}|${l.firstName}`);
  if (l.birthDate) keys.push(`nb:${name}|${l.birthDate}`);
  keys.push('n:' + name);
  return keys;
}

const COMPARED: (keyof ImportedLearner)[] = [
  'lastName',
  'firstName',
  'birthDate',
  'email',
  'phone',
  'externalId',
  'formation',
  'groupName',
  'company',
];

export function diffLearners(existing: Learner[], incoming: ImportedLearner[]): ImportDiff {
  const index = new Map<string, Learner>();
  for (const l of existing) for (const k of identityKeys(l)) if (!index.has(k)) index.set(k, l);
  const matched = new Set<string>();
  const diff: ImportDiff = { added: [], updated: [], unchanged: [], missing: [] };

  for (const inc of incoming) {
    const found = identityKeys(inc)
      .map((k) => index.get(k))
      .find((l) => l && !matched.has(l.id));
    if (!found) {
      diff.added.push(inc);
      continue;
    }
    matched.add(found.id);
    const changes = COMPARED.filter((k) => {
      const v = inc[k];
      return v !== undefined && v !== '' && v !== found[k as keyof Learner];
    }).map(String);
    if (changes.length) diff.updated.push({ existing: found, incoming: inc, changes });
    else diff.unchanged.push(found);
  }
  diff.missing = existing.filter((l) => !matched.has(l.id));
  return diff;
}

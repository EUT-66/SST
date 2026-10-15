// Noms des fichiers PDF des grilles : « Grille Evaluation SST 2026-2027 NOM Prénom.pdf ».
import { todayIso } from './format';

/** Année scolaire d'une date (AAAA-MM-JJ) : elle change au 1er septembre. */
export function schoolYear(iso?: string | null, today = todayIso()): string {
  const d = iso && /^\d{4}-\d{2}/.test(iso) ? iso : today;
  const y = Number(d.slice(0, 4));
  const m = Number(d.slice(5, 7));
  return m >= 9 ? `${y}-${y + 1}` : `${y - 1}-${y}`;
}

/** Retire les caractères interdits dans un nom de fichier (Windows, macOS). */
export function safeFileName(s: string): string {
  return s
    .replace(/[\\/:*?"<>|\u0000-\u001f]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/, '');
}

/** « jean-marc » ou « JEAN-MARC » -> « Jean-Marc » ; une saisie déjà en casse mixte est gardée. */
export function formatFirstName(s: string): string {
  const t = s.trim();
  if (t !== t.toLocaleUpperCase('fr-FR') && t !== t.toLocaleLowerCase('fr-FR')) return t;
  return t.toLocaleLowerCase('fr-FR').replace(/(^|[\s'’-])(\p{L})/gu, (_, sep: string, c: string) => sep + c.toLocaleUpperCase('fr-FR'));
}

export function gridFileName(candidate: { lastName: string; firstName: string }, year: string): string {
  const name = [candidate.lastName.trim().toLocaleUpperCase('fr-FR'), formatFirstName(candidate.firstName)].filter(Boolean).join(' ');
  return `${safeFileName(`Grille Evaluation SST ${year} ${name}`)}.pdf`;
}

export function sessionGridsFileName(sessionTitle: string, year: string, ext: 'pdf' | 'zip'): string {
  return `${safeFileName(`Grilles Evaluation SST ${year} ${sessionTitle}`)}.${ext}`;
}

/** Ajoute « (2) », « (3) »… aux noms en double (homonymes dans une même archive). */
export function uniqueNames(names: string[]): string[] {
  const seen = new Map<string, number>();
  return names.map((n) => {
    const key = n.toLocaleLowerCase('fr-FR');
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    return count === 1 ? n : n.replace(/(\.[a-z]+)$/i, ` (${count})$1`);
  });
}

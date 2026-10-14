import { arrayUnion, collection, doc, getDocs, writeBatch, type DocumentData } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { BTP_CASES } from './casesBtp';
import { MIT_CASES } from './casesMit';
import { COURSE_AIDE_MEMOIRE } from './courseAideMemoire';
import { COURSE_MIT } from './courseMit';
import { TRADE_COURSES } from './courses';
import { DEFAULT_QUESTIONS, DEFAULT_QUIZZES } from './questions';
import { DEFAULT_TRADES } from './trades';

export { CONTENT_VERSION } from './version';

export type SeedPart = 'trades' | 'courses' | 'questions' | 'cases';

export const SEED_SUMMARY: Record<SeedPart, { label: string; count: number }> = {
  trades: { label: 'Métiers du BTP', count: DEFAULT_TRADES.length },
  courses: { label: 'Supports de cours', count: 2 + TRADE_COURSES.length },
  questions: { label: 'Questions et modèles de QCM', count: DEFAULT_QUESTIONS.length + DEFAULT_QUIZZES.length },
  cases: { label: 'Cas pratiques', count: MIT_CASES.length + BTP_CASES.length },
};

function docsFor(part: SeedPart): [string, { id: string } & DocumentData][] {
  switch (part) {
    case 'trades':
      return DEFAULT_TRADES.map((t) => ['trades', t]);
    case 'courses':
      return [COURSE_AIDE_MEMOIRE, COURSE_MIT, ...TRADE_COURSES].map((c) => ['courses', c]);
    case 'questions':
      return [
        ...DEFAULT_QUESTIONS.map((q): [string, { id: string } & DocumentData] => ['questions', q]),
        ...DEFAULT_QUIZZES.map((q): [string, { id: string } & DocumentData] => ['quizzes', q]),
      ];
    case 'cases':
      return [...MIT_CASES, ...BTP_CASES].map((c) => ['cases', c]);
  }
}

/** Retire les champs `undefined`, refusés par Firestore. */
function clean<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

/** Codes de métiers renommés depuis la première version (alignés sur ceux de la formatrice). */
const TRADE_CODE_MIGRATIONS: { id: string; from: string; to: string; keyword?: string }[] = [
  { id: 'peintre', from: 'PEI', to: 'PAR' },
  { id: 'froid', from: 'FRO', to: 'FCA', keyword: 'FCA' },
];

/**
 * Installe le contenu par défaut. Sans `overwrite`, les documents déjà présents
 * (éventuellement modifiés par la formatrice) sont conservés.
 */
export async function installDefaultContent(parts: SeedPart[], overwrite: boolean, uid: string): Promise<number> {
  const entries = parts.flatMap(docsFor);
  const existing = new Set<string>();
  if (!overwrite) {
    const collections = [...new Set(entries.map(([c]) => c))];
    for (const c of collections) {
      const snap = await getDocs(collection(db, c));
      snap.forEach((d) => existing.add(`${c}/${d.id}`));
    }
  }
  const toWrite = entries.filter(([c, d]) => overwrite || !existing.has(`${c}/${d.id}`));
  const now = Date.now();

  // métiers déjà installés avec un ancien code : on ne change que le code (et un mot-clé)
  let migrated = 0;
  if (parts.includes('trades') && !overwrite) {
    const snap = await getDocs(collection(db, 'trades'));
    const batch = writeBatch(db);
    snap.forEach((d) => {
      const m = TRADE_CODE_MIGRATIONS.find((x) => x.id === d.id && d.data().code === x.from);
      if (!m) return;
      batch.update(d.ref, { code: m.to, ...(m.keyword ? { keywords: arrayUnion(m.keyword) } : {}), updatedAt: now });
      migrated++;
    });
    if (migrated) await batch.commit();
  }

  for (let i = 0; i < toWrite.length; i += 400) {
    const batch = writeBatch(db);
    for (const [c, d] of toWrite.slice(i, i + 400)) {
      const { id, ...data } = d;
      batch.set(doc(db, c, id), clean({ ...data, createdBy: uid, updatedAt: now }));
    }
    await batch.commit();
  }
  return toWrite.length + migrated;
}

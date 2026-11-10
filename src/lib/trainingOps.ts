// Entraînement à la mise en pratique : même roue et même tirage des cas que pour la
// certification, mais rien n'est écrit sur les apprentis, les évaluations ou la session.
import { doc, runTransaction } from 'firebase/firestore';
import { db } from './firebase';
import { randomInt } from './format';
import { caseMatchesPool } from './sessions';
import type { PracticalCase, Session, TrainingDraw } from './types';

export const trainingPath = (sessionId: string) => `sessions/${sessionId}/training/current`;

export function emptyTraining(session: Pick<Session, 'casePool'>): TrainingDraw {
  return { series: 1, passages: [], usedCaseIds: [], casePool: session.casePool ?? 'both', avoidCertificationCases: true, updatedAt: 0 };
}

/** Cas jouables à l'entraînement pour cette session (métier et type de cas choisis). */
export function trainingPool(cases: PracticalCase[], session: Pick<Session, 'tradeId' | 'drawnCaseIds'>, state: TrainingDraw): PracticalCase[] {
  const certification = new Set(session.drawnCaseIds ?? []);
  return cases.filter((c) => caseMatchesPool(c, session.tradeId, state.casePool) && !(state.avoidCertificationCases && certification.has(c.id)));
}

/**
 * Cas au hasard, sans répétition tant que tous les cas n'ont pas été joués ; ensuite un
 * nouveau tour commence (`recycled`). `exclude` écarte le cas qu'on veut remplacer.
 */
export function pickTrainingCase(
  cases: PracticalCase[],
  session: Pick<Session, 'tradeId' | 'drawnCaseIds'>,
  state: TrainingDraw,
  exclude: (string | null)[] = [],
): { kase: PracticalCase | null; recycled: boolean } {
  const pool = trainingPool(cases, session, state).filter((c) => !exclude.includes(c.id));
  const fresh = pool.filter((c) => !state.usedCaseIds.includes(c.id));
  if (fresh.length) return { kase: fresh[randomInt(fresh.length)], recycled: false };
  return pool.length ? { kase: pool[randomInt(pool.length)], recycled: true } : { kase: null, recycled: false };
}

// ------------------------------------------------------------------ transitions (pures)

export function withPassage(state: TrainingDraw, learnerId: string, caseId: string | null, recycled: boolean, at = Date.now()): TrainingDraw {
  if (state.passages.some((p) => p.learnerId === learnerId)) return state;
  const used = caseId ? (recycled ? [caseId] : [...new Set([...state.usedCaseIds, caseId])]) : state.usedCaseIds;
  return { ...state, passages: [...state.passages, { learnerId, caseId, at }], usedCaseIds: used, updatedAt: at };
}

export function withCaseChange(state: TrainingDraw, learnerId: string, caseId: string, recycled: boolean, at = Date.now()): TrainingDraw {
  const previous = state.passages.find((p) => p.learnerId === learnerId)?.caseId ?? null;
  // le cas remplacé n'a pas été joué : il revient dans le tirage
  const kept = state.usedCaseIds.filter((id) => id !== previous);
  const used = recycled ? [caseId] : [...new Set([...kept, caseId])];
  return { ...state, passages: state.passages.map((p) => (p.learnerId === learnerId ? { ...p, caseId } : p)), usedCaseIds: used, updatedAt: at };
}

/** Nouvelle série : tout le monde revient dans la roue ; les cas joués restent écartés, sauf remise à zéro. */
export function nextSeries(state: TrainingDraw, keepPlayedCases: boolean, at = Date.now()): TrainingDraw {
  return { ...state, series: state.series + 1, passages: [], usedCaseIds: keepPlayedCases ? state.usedCaseIds : [], updatedAt: at };
}

// ------------------------------------------------------------------ enregistrement

async function update(session: Session, change: (state: TrainingDraw) => TrainingDraw) {
  const ref = doc(db, trainingPath(session.id));
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    const current = snap.exists() ? ({ ...emptyTraining(session), ...(snap.data() as TrainingDraw) } as TrainingDraw) : emptyTraining(session);
    tx.set(ref, change(current));
  });
}

export const recordTrainingPassage = (session: Session, learnerId: string, caseId: string | null, recycled: boolean) =>
  update(session, (s) => withPassage(s, learnerId, caseId, recycled));

export const changeTrainingCase = (session: Session, learnerId: string, caseId: string, recycled: boolean) =>
  update(session, (s) => withCaseChange(s, learnerId, caseId, recycled));

export const startNextSeries = (session: Session, keepPlayedCases: boolean) => update(session, (s) => nextSeries(s, keepPlayedCases));

export const setTrainingOptions = (session: Session, options: Pick<TrainingDraw, 'casePool' | 'avoidCertificationCases'>) =>
  update(session, (s) => ({ ...s, ...options, updatedAt: Date.now() }));

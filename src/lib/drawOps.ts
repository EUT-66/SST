// Tirage au sort : ordre de passage des apprentis et attribution des cas pratiques (sans remise).
import { doc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { randomInt } from './format';
import { availableCases } from './sessions';
import type { Learner, PracticalCase, Session } from './types';

export async function recordLearnerDraw(session: Session, learner: Learner) {
  const order = (session.drawCounter ?? 0) + 1;
  const batch = writeBatch(db);
  batch.update(doc(db, 'sessions', session.id, 'learners', learner.id), { drawOrder: order, drawnAt: Date.now() });
  batch.update(doc(db, 'sessions', session.id), { drawCounter: order, updatedAt: Date.now() });
  await batch.commit();
  return order;
}

/** Tire un cas au hasard parmi ceux encore disponibles dans la session. */
export function pickRandomCase(cases: PracticalCase[], session: Session, exclude: string[] = []): PracticalCase | null {
  const pool = availableCases(cases, session).filter((c) => !exclude.includes(c.id));
  return pool.length ? pool[randomInt(pool.length)] : null;
}

/**
 * Attribue un cas à un apprenti. L'ancien cas éventuel est remis dans le tirage,
 * le nouveau en est retiré ; l'évaluation déjà saisie pour l'ancien cas est effacée.
 */
export async function assignCase(session: Session, learner: Learner, caseId: string, manual: boolean) {
  const drawn = new Set(session.drawnCaseIds ?? []);
  if (learner.caseId) drawn.delete(learner.caseId);
  drawn.add(caseId);
  const batch = writeBatch(db);
  batch.update(doc(db, 'sessions', session.id, 'learners', learner.id), { caseId, caseChangedManually: manual, updatedAt: Date.now() });
  batch.update(doc(db, 'sessions', session.id), { drawnCaseIds: [...drawn], updatedAt: Date.now() });
  if (learner.caseId && learner.caseId !== caseId) {
    batch.set(
      doc(db, 'sessions', session.id, 'evaluations', learner.id),
      { learnerId: learner.id, caseId, actions: {}, prevention: {} },
      { mergeFields: ['learnerId', 'caseId', 'actions', 'prevention'] },
    );
  }
  await batch.commit();
}

export async function resetDraw(session: Session, learners: Learner[], keepCases: boolean) {
  for (let i = 0; i < Math.max(learners.length, 1); i += 400) {
    const batch = writeBatch(db);
    for (const l of learners.slice(i, i + 400)) {
      const data: Partial<Learner> = { drawOrder: null, drawnAt: null };
      if (!keepCases) Object.assign(data, { caseId: null, caseChangedManually: false });
      batch.update(doc(db, 'sessions', session.id, 'learners', l.id), data);
    }
    if (i === 0) {
      batch.update(doc(db, 'sessions', session.id), {
        drawCounter: 0,
        ...(keepCases ? {} : { drawnCaseIds: [] }),
        updatedAt: Date.now(),
      });
    }
    await batch.commit();
  }
}

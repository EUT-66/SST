// Opérations d'écriture sur les sessions et leurs apprentis.
import { collection, doc, increment, writeBatch, type WriteBatch } from 'firebase/firestore';
import type { ImportDiff, ImportedLearner } from './csv';
import { db } from './firebase';
import type { Learner } from './types';

function clean<T extends object>(o: T): T {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as T;
}

/** Exécute des écritures par lots de 400 (limite Firestore : 500). */
async function chunked<T>(items: T[], write: (batch: WriteBatch, item: T) => void, extra?: (batch: WriteBatch) => void) {
  if (items.length === 0 && extra) {
    const b = writeBatch(db);
    extra(b);
    await b.commit();
    return;
  }
  for (let i = 0; i < items.length; i += 400) {
    const batch = writeBatch(db);
    items.slice(i, i + 400).forEach((it) => write(batch, it));
    if (i === 0 && extra) extra(batch);
    await batch.commit();
  }
}

export async function addLearners(sessionId: string, learners: ImportedLearner[], tradeId: string) {
  const now = Date.now();
  await chunked(
    learners,
    (batch, l) => {
      const ref = doc(collection(db, 'sessions', sessionId, 'learners'));
      batch.set(ref, clean({ ...l, tradeId: l.tradeId ?? tradeId, createdAt: now, updatedAt: now }));
    },
    (batch) => batch.update(doc(db, 'sessions', sessionId), { learnerCount: increment(learners.length), updatedAt: now }),
  );
}

/** Applique une mise à jour par CSV : ajouts, modifications et, au choix, suppression des absents. */
export async function applyImport(sessionId: string, diff: ImportDiff, tradeId: string, removeMissing: boolean) {
  const now = Date.now();
  type Op = { kind: 'add'; l: ImportedLearner } | { kind: 'update'; id: string; data: Partial<Learner> } | { kind: 'delete'; id: string };
  const ops: Op[] = [
    ...diff.added.map((l): Op => ({ kind: 'add', l })),
    ...diff.updated.map((u): Op => {
      const data: Partial<Learner> = {};
      for (const k of u.changes) (data as Record<string, unknown>)[k] = (u.incoming as Record<string, unknown>)[k];
      return { kind: 'update', id: u.existing.id, data };
    }),
    ...(removeMissing ? diff.missing.map((l): Op => ({ kind: 'delete', id: l.id })) : []),
  ];
  const delta = diff.added.length - (removeMissing ? diff.missing.length : 0);
  await chunked(
    ops,
    (batch, op) => {
      if (op.kind === 'add') {
        batch.set(doc(collection(db, 'sessions', sessionId, 'learners')), clean({ ...op.l, tradeId, createdAt: now, updatedAt: now }));
      } else if (op.kind === 'update') {
        batch.update(doc(db, 'sessions', sessionId, 'learners', op.id), { ...clean(op.data), updatedAt: now });
      } else {
        batch.delete(doc(db, 'sessions', sessionId, 'learners', op.id));
        batch.delete(doc(db, 'sessions', sessionId, 'evaluations', op.id));
      }
    },
    (batch) => batch.update(doc(db, 'sessions', sessionId), { learnerCount: increment(delta), updatedAt: now }),
  );
}

export async function deleteLearner(sessionId: string, learner: Learner) {
  const batch = writeBatch(db);
  batch.delete(doc(db, 'sessions', sessionId, 'learners', learner.id));
  batch.delete(doc(db, 'sessions', sessionId, 'evaluations', learner.id));
  batch.update(doc(db, 'sessions', sessionId), { learnerCount: increment(-1), updatedAt: Date.now() });
  await batch.commit();
}

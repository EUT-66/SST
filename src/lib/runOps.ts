// Création et correction des passations de QCM.
import { deleteDoc, doc, getDoc, setDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { db } from './firebase';
import { accessCode, newId } from './format';
import { scoreAnswers, stripCorrection, toRunQuestion } from './quiz';
import type { Learner, PrivateRun, PublicRun, QcmResult, Question, QuizType, Session, Submission } from './types';

export function learnerLabel(l: Learner): string {
  return `${l.firstName} ${l.lastName.charAt(0)}.`;
}

export async function createRun(params: {
  session: Session;
  ownerId: string;
  title: string;
  type: QuizType;
  questions: Question[];
  learners: Learner[];
  remote: boolean;
}): Promise<PrivateRun> {
  const { session, ownerId, title, type, questions, learners, remote } = params;
  const training = type === 'entrainement';
  const full = questions.map((q) => toRunQuestion(q, true));
  const run: PrivateRun = {
    id: newId('run-'),
    code: remote ? accessCode() : '',
    title,
    type,
    open: remote,
    questions: full,
    createdAt: Date.now(),
    appliedLearnerIds: [],
  };
  // évite une collision de code (très improbable)
  if (remote && (await getDoc(doc(db, 'publicRuns', run.code))).exists()) run.code = accessCode(7);

  const batch = writeBatch(db);
  const { id, ...data } = run;
  batch.set(doc(db, 'sessions', session.id, 'runs', id), JSON.parse(JSON.stringify(data)));
  if (remote) {
    const present = learners.filter((l) => !l.absent);
    const pub: PublicRun = {
      code: run.code,
      sessionId: session.id,
      runId: id,
      ownerId,
      title,
      type,
      open: true,
      learners: present.map((l) => ({ id: l.id, label: learnerLabel(l) })),
      learnerIds: present.map((l) => l.id),
      questions: full.map((q) => (training ? q : stripCorrection(q))),
      createdAt: run.createdAt,
    };
    batch.set(doc(db, 'publicRuns', run.code), JSON.parse(JSON.stringify(pub)));
  }
  await batch.commit();
  return run;
}

export async function setRunOpen(sessionId: string, run: PrivateRun, open: boolean) {
  const batch = writeBatch(db);
  batch.update(doc(db, 'sessions', sessionId, 'runs', run.id), { open });
  if (run.code) batch.update(doc(db, 'publicRuns', run.code), { open });
  await batch.commit();
}

export async function deleteRun(sessionId: string, run: PrivateRun) {
  await deleteDoc(doc(db, 'sessions', sessionId, 'runs', run.id));
  if (run.code) await deleteDoc(doc(db, 'publicRuns', run.code)).catch(() => undefined);
}

export function resultFor(run: PrivateRun, answers: Record<string, number[]>, mode: QcmResult['mode'], date = Date.now()): QcmResult {
  return { ...scoreAnswers(run.questions, answers), runId: run.id, quizTitle: run.title, answers, date, mode };
}

// Remplace entièrement le résultat précédent sans toucher au reste de l'évaluation.
const QCM_FIELDS = { mergeFields: ['learnerId', 'qcm', 'updatedAt'] };

/** Enregistre le résultat d'un QCM d'évaluation dans l'évaluation de l'apprenti. */
export async function saveQcmResult(sessionId: string, learnerId: string, result: QcmResult) {
  await setDoc(doc(db, 'sessions', sessionId, 'evaluations', learnerId), { learnerId, qcm: result, updatedAt: Date.now() }, QCM_FIELDS);
}

export async function applySubmissions(sessionId: string, run: PrivateRun, submissions: Submission[]) {
  const applied = new Set(run.appliedLearnerIds ?? []);
  const pending = submissions.filter((s) => !applied.has(s.learnerId));
  if (!pending.length) return 0;
  const batch = writeBatch(db);
  for (const s of pending) {
    const result = resultFor(run, s.answers ?? {}, 'distance', s.submittedAt);
    batch.set(doc(db, 'sessions', sessionId, 'evaluations', s.learnerId), { learnerId: s.learnerId, qcm: result, updatedAt: Date.now() }, QCM_FIELDS);
    applied.add(s.learnerId);
  }
  batch.update(doc(db, 'sessions', sessionId, 'runs', run.id), { appliedLearnerIds: [...applied] });
  await batch.commit();
  return pending.length;
}

export async function deleteSubmission(sessionId: string, run: PrivateRun, submission: Submission) {
  await deleteDoc(doc(db, 'publicRuns', run.code, 'submissions', submission.id));
  const applied = (run.appliedLearnerIds ?? []).filter((id) => id !== submission.learnerId);
  await updateDoc(doc(db, 'sessions', sessionId, 'runs', run.id), { appliedLearnerIds: applied });
}

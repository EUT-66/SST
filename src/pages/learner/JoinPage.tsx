import { signInAnonymously } from 'firebase/auth';
import { addDoc, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { ArrowRight, CheckCircle2, HeartPulse, KeyRound, UserRound } from 'lucide-react';
import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuizPlayer, { ScoreCard } from '../../components/QuizPlayer';
import { errorMessage, Spinner } from '../../components/ui';
import { auth, db } from '../../lib/firebase';
import { scoreAnswers } from '../../lib/quiz';
import type { PublicRun } from '../../lib/types';

type Step = 'code' | 'name' | 'quiz' | 'done';

const storageKey = (code: string) => `sst-qcm-${code}`;

function readLocal(code: string): { learnerId?: string; submitted?: boolean } {
  try {
    return JSON.parse(localStorage.getItem(storageKey(code)) ?? '{}');
  } catch {
    return {};
  }
}
function writeLocal(code: string, value: { learnerId?: string; submitted?: boolean }) {
  try {
    localStorage.setItem(storageKey(code), JSON.stringify(value));
  } catch {
    /* navigation privée : sans importance */
  }
}

/** Page publique : un apprenti rejoint un QCM avec le code donné par le formateur. */
export default function JoinPage() {
  const params = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState((params.code ?? '').toUpperCase());
  const [run, setRun] = useState<PublicRun | null>(null);
  const [step, setStep] = useState<Step>('code');
  const [learnerId, setLearnerId] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [score, setScore] = useState<{ score: number; total: number } | null>(null);
  const startedAt = useState(() => Date.now())[0];

  const join = async (value: string) => {
    const c = value.trim().toUpperCase();
    if (c.length < 6) return;
    setError('');
    setBusy(true);
    try {
      if (!auth.currentUser) await signInAnonymously(auth);
      const snap = await getDoc(doc(db, 'publicRuns', c));
      if (!snap.exists()) throw new Error('Code inconnu. Vérifie le code donné par ton formateur.');
      const data = snap.data() as PublicRun;
      if (!data.open) throw new Error('Ce QCM est fermé.');
      setRun(data);
      if (params.code !== c) navigate(`/apprenti/${c}`, { replace: true });
      const local = readLocal(c);
      if (local.submitted && data.type === 'evaluation') {
        setLearnerId(local.learnerId ?? '');
        setStep('done');
      } else {
        setLearnerId(local.learnerId ?? '');
        setStep('name');
      }
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  useEffect(() => {
    if (params.code && params.code.length >= 6 && !run) join(params.code);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.code]);

  const submit = async (answers: Record<string, number[]>) => {
    if (!run || !auth.currentUser) return;
    setError('');
    const label = run.learners.find((l) => l.id === learnerId)?.label ?? '';
    const payload = { learnerId, label, uid: auth.currentUser.uid, answers, startedAt, submittedAt: Date.now() };
    try {
      if (run.type === 'evaluation') await setDoc(doc(db, 'publicRuns', run.code, 'submissions', learnerId), payload);
      else await addDoc(collection(db, 'publicRuns', run.code, 'submissions'), payload);
      writeLocal(run.code, { learnerId, submitted: true });
      if (run.type === 'entrainement') {
        const full = run.questions.filter((q) => q.correct).map((q) => ({ ...q, correct: q.correct! }));
        const s = scoreAnswers(full, answers);
        setScore({ score: s.score, total: s.total });
      }
      setStep('done');
    } catch (err) {
      const denied = (err as { code?: string }).code === 'permission-denied';
      setError(denied ? 'Envoi refusé : une copie existe déjà pour ce nom, ou le QCM vient d’être fermé. Préviens ton formateur.' : errorMessage(err));
    }
  };

  const learnerLabel = run?.learners.find((l) => l.id === learnerId)?.label;

  return (
    <div className="min-h-screen bg-gradient-to-br from-sst-600 via-sst-700 to-sst-900 px-4 py-6">
      <div className="mx-auto mb-6 flex max-w-3xl items-center gap-2 text-white">
        <HeartPulse className="h-7 w-7" />
        <span className="font-display text-lg font-extrabold">Mon espace SST</span>
        {run && <span className="ml-auto truncate text-sm text-sst-100">{run.title}</span>}
      </div>

      {step === 'code' && (
        <form
          onSubmit={(e: FormEvent) => {
            e.preventDefault();
            join(code);
          }}
          className="mx-auto max-w-md rounded-3xl bg-white p-8 text-center shadow-2xl"
        >
          <KeyRound className="mx-auto mb-3 h-12 w-12 text-sst-600" />
          <h1 className="font-display text-2xl font-extrabold">Rejoindre un QCM</h1>
          <p className="mt-1 text-sm text-ink-muted">Saisis le code affiché par ton formateur.</p>
          <input
            className="input mt-6 text-center font-mono text-3xl font-bold uppercase tracking-[0.3em]"
            maxLength={8}
            autoFocus
            autoComplete="off"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
          />
          {error && <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
          <button className="btn-primary btn-lg mt-6 w-full" disabled={busy || code.length < 6}>
            {busy ? <Spinner className="h-5 w-5 text-white" /> : <ArrowRight className="h-5 w-5" />} Continuer
          </button>
        </form>
      )}

      {step === 'name' && run && (
        <div className="mx-auto max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <UserRound className="mx-auto mb-2 h-10 w-10 text-sst-600" />
          <h1 className="text-center font-display text-2xl font-extrabold">Qui es-tu ?</h1>
          <p className="mt-1 text-center text-sm text-ink-muted">Choisis ton nom dans la liste.</p>
          <div className="mt-6 grid gap-2 sm:grid-cols-2">
            {run.learners.map((l) => (
              <button
                key={l.id}
                onClick={() => setLearnerId(l.id)}
                className={`rounded-2xl border-2 p-4 text-left font-semibold transition ${learnerId === l.id ? 'border-sst-500 bg-sst-50' : 'border-slate-200 hover:border-sst-300'}`}
              >
                {l.label}
              </button>
            ))}
          </div>
          <button
            className="btn-primary btn-lg mt-6 w-full"
            disabled={!learnerId}
            onClick={() => {
              writeLocal(run.code, { learnerId });
              setStep('quiz');
            }}
          >
            Commencer le QCM ({run.questions.length} questions)
          </button>
        </div>
      )}

      {step === 'quiz' && run && (
        <div>
          {error && <p className="mx-auto mb-4 max-w-3xl rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{error}</p>}
          <QuizPlayer questions={run.questions} mode={run.type} onFinish={submit} />
        </div>
      )}

      {step === 'done' && (
        <div className="mx-auto max-w-xl">
          {score ? (
            <ScoreCard score={score.score} total={score.total}>
              <p className="mt-2 text-sm text-ink-muted">{learnerLabel}</p>
            </ScoreCard>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center shadow-2xl">
              <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-sst-600" />
              <h1 className="font-display text-2xl font-extrabold">Copie envoyée !</h1>
              <p className="mt-2 text-ink-soft">{learnerLabel ? `Merci ${learnerLabel}. ` : ''}Ton formateur a bien reçu tes réponses.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

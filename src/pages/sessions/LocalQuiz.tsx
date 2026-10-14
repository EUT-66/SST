import clsx from 'clsx';
import { ArrowLeft, CheckCircle2, Eye, ListChecks, Play, Tablet } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import QuizPlayer, { ScoreCard } from '../../components/QuizPlayer';
import { errorMessage, PageLoader, Spinner, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { pickBalanced, questionMatchesTrade } from '../../lib/quiz';
import { createRun, resultFor, saveQcmResult } from '../../lib/runOps';
import type { Learner, QcmResult } from '../../lib/types';
import { useSessionBundle } from './SessionDetail';

/** Passation d'un QCM sur l'appareil du formateur : chaque apprenti répond à son tour. */
export default function LocalQuiz() {
  const { sid } = useParams();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const { profile } = useAuth();
  const { questions, settings, tradeById } = useData();
  const { toast } = useFeedback();
  const { session, learners, evaluations, runs, loading } = useSessionBundle(sid);
  const [current, setCurrent] = useState<Learner | null>(null);
  const [result, setResult] = useState<{ learner: Learner; result: QcmResult } | null>(null);
  const [showScore, setShowScore] = useState(false);
  const [creating, setCreating] = useState(false);

  const runId = params.get('run');
  const preselected = params.get('learner');
  const run = runs.find((r) => r.id === runId) ?? null;

  useEffect(() => {
    if (preselected && run && !current && !result) {
      const l = learners.find((x) => x.id === preselected);
      if (l) setCurrent(l);
    }
  }, [preselected, run, learners, current, result]);

  const localEvalRuns = useMemo(() => runs.filter((r) => !r.code && r.type === 'evaluation'), [runs]);

  if (loading) return <PageLoader />;
  if (!session) return <PageLoader label="Session introuvable" />;

  const createEvaluationRun = async () => {
    if (!profile) return;
    setCreating(true);
    try {
      const eligible = questions.filter((q) => questionMatchesTrade(q, session.tradeId) && q.usage !== 'entrainement');
      const selected = pickBalanced(eligible, settings.evaluationQuestionCount, session.tradeId);
      if (!selected.length) throw new Error('Aucune question disponible.');
      const r = await createRun({
        session,
        ownerId: profile.uid,
        title: `QCM d’évaluation – ${tradeById[session.tradeId]?.code ?? 'SST'}`,
        type: 'evaluation',
        questions: selected,
        learners,
        remote: false,
      });
      setParams({ run: r.id, ...(preselected ? { learner: preselected } : {}) }, { replace: true });
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setCreating(false);
    }
  };

  const shell = (children: React.ReactNode) => (
    <div className="min-h-screen bg-gradient-to-br from-sst-50 via-white to-sst-100 px-4 py-6 sm:px-8">
      <div className="mx-auto mb-6 flex max-w-5xl items-center justify-between">
        <Link to={`/sessions/${session.id}?onglet=qcm`} className="inline-flex items-center gap-2 text-sm font-semibold text-sst-700 hover:underline">
          <ArrowLeft className="h-4 w-4" /> {session.title}
        </Link>
        {run && <span className={run.type === 'evaluation' ? 'badge-green' : 'badge-blue'}>{run.title}</span>}
      </div>
      {children}
    </div>
  );

  // 1) Choix ou création du QCM
  if (!run) {
    return shell(
      <div className="mx-auto max-w-xl">
        <div className="card p-8 text-center">
          <ListChecks className="mx-auto mb-3 h-12 w-12 text-sst-600" />
          <h1 className="font-display text-2xl font-extrabold">QCM d’évaluation sur cet appareil</h1>
          <p className="mt-2 text-sm text-ink-muted">Un QCM équilibré de {settings.evaluationQuestionCount} questions sera généré. Chaque apprenti y répond à son tour ; le résultat est reporté dans son évaluation.</p>
          <button className="btn-primary mt-6" disabled={creating} onClick={createEvaluationRun}>
            {creating ? <Spinner className="h-4 w-4 text-white" /> : <Play className="h-4 w-4" />} Générer le QCM
          </button>
          {localEvalRuns.length > 0 && (
            <div className="mt-6 border-t border-slate-100 pt-4 text-left">
              <p className="mb-2 text-sm font-semibold">Ou reprendre un QCM déjà généré :</p>
              {localEvalRuns.map((r) => (
                <button key={r.id} className="btn-ghost w-full justify-start" onClick={() => setParams({ run: r.id, ...(preselected ? { learner: preselected } : {}) })}>
                  {r.title} · {r.questions.length} questions
                </button>
              ))}
            </div>
          )}
        </div>
      </div>,
    );
  }

  // 3) Fin de passation
  if (result) {
    const r = result.result;
    return shell(
      <div className="mx-auto max-w-xl">
        {run.type === 'entrainement' || showScore ? (
          <ScoreCard score={r.score} total={r.total}>
            <p className="mt-2 text-sm text-ink-muted">{result.learner.firstName} {result.learner.lastName}</p>
          </ScoreCard>
        ) : (
          <div className="card p-8 text-center">
            <CheckCircle2 className="mx-auto mb-3 h-14 w-14 text-sst-600" />
            <h2 className="font-display text-2xl font-extrabold">Merci {result.learner.firstName} !</h2>
            <p className="mt-2 text-ink-soft">Tes réponses sont enregistrées. Rends la tablette à ton formateur.</p>
            <button className="btn-ghost mt-4" onClick={() => setShowScore(true)}>
              <Eye className="h-4 w-4" /> Afficher le résultat (formateur)
            </button>
          </div>
        )}
        <div className="mt-4 flex justify-center gap-2">
          <button
            className="btn-primary"
            onClick={() => {
              setResult(null);
              setShowScore(false);
              setCurrent(null);
              if (preselected) setParams({ run: run.id }, { replace: true });
            }}
          >
            Apprenti suivant
          </button>
          {preselected && (
            <button className="btn-secondary" onClick={() => navigate(`/sessions/${session.id}/evaluation/${preselected}`)}>
              Retour à l’évaluation
            </button>
          )}
        </div>
      </div>,
    );
  }

  // 2b) Passation
  if (current) {
    return shell(
      <div>
        <p className="mb-4 text-center text-sm font-semibold text-ink-muted">
          {current.firstName} {current.lastName}
        </p>
        <QuizPlayer
          questions={run.type === 'entrainement' ? run.questions : run.questions.map(({ correct: _c, explanation: _e, ...q }) => q)}
          mode={run.type}
          submitLabel="Terminer le QCM"
          onFinish={async (answers) => {
            const r = resultFor(run, answers, 'local');
            try {
              if (run.type === 'evaluation') await saveQcmResult(session.id, current.id, r);
              setResult({ learner: current, result: r });
            } catch (err) {
              toast(errorMessage(err), 'error');
            }
          }}
        />
      </div>,
    );
  }

  // 2a) Choix de l'apprenti
  const present = learners.filter((l) => !l.absent);
  return shell(
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 text-center">
        <Tablet className="mx-auto mb-2 h-10 w-10 text-sst-600" />
        <h1 className="font-display text-3xl font-extrabold">Qui passe le QCM ?</h1>
        <p className="mt-1 text-sm text-ink-muted">Sélectionnez l’apprenti puis confiez-lui l’appareil.</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {present.map((l) => {
          const done = evaluations[l.id]?.qcm?.runId === run.id;
          return (
            <button
              key={l.id}
              onClick={() => setCurrent(l)}
              className={clsx('card flex items-center gap-3 p-4 text-left transition hover:-translate-y-0.5 hover:shadow-lg', done && 'opacity-60')}
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sst-100 font-bold text-sst-800">
                {l.firstName.charAt(0)}
                {l.lastName.charAt(0)}
              </span>
              <span className="flex-1">
                <span className="block font-semibold">
                  {l.firstName} {l.lastName}
                </span>
                {done && <span className="text-xs font-semibold text-sst-700">Déjà passé</span>}
              </span>
            </button>
          );
        })}
      </div>
    </div>,
  );
}

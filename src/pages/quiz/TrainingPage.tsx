import clsx from 'clsx';
import { Play, RotateCcw } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import QuizPlayer, { ScoreCard } from '../../components/QuizPlayer';
import { Field, PageHeader } from '../../components/ui';
import { useData } from '../../hooks/useData';
import { COMPETENCE_LABELS, COMPETENCE_ORDER } from '../../lib/competences';
import { shuffle } from '../../lib/format';
import { pickBalanced, questionMatchesTrade, scoreAnswers, toRunQuestion } from '../../lib/quiz';
import type { CompetenceId, RunQuestion } from '../../lib/types';

/** Entraînement libre, ou projection en classe pour une correction collective. */
export default function TrainingPage() {
  const { questions, quizzes, trades } = useData();
  const [params] = useSearchParams();
  const [source, setSource] = useState(params.get('modele') ?? 'auto');
  const [tradeId, setTradeId] = useState('');
  const [comps, setComps] = useState<CompetenceId[]>([]);
  const [count, setCount] = useState(10);
  const [run, setRun] = useState<(RunQuestion & { correct: number[] })[] | null>(null);
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);

  const start = () => {
    let selected;
    if (source === 'auto') {
      const pool = questions.filter((q) => questionMatchesTrade(q, tradeId || null) && (!comps.length || comps.includes(q.competence)));
      selected = comps.length ? shuffle(pool).slice(0, count) : pickBalanced(pool, count, tradeId);
    } else {
      const tpl = quizzes.find((q) => q.id === source);
      const byId = new Map(questions.map((q) => [q.id, q]));
      selected = shuffle((tpl?.questionIds ?? []).map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => !!q));
    }
    setRun(selected.map((q) => toRunQuestion(q, true)));
    setResult(null);
  };

  if (result && run) {
    return (
      <div className="py-6">
        <ScoreCard score={result.score} total={result.total}>
          <div className="mt-6 flex justify-center gap-2">
            <button className="btn-secondary" onClick={() => setRun(null)}>
              Changer de questions
            </button>
            <button className="btn-primary" onClick={start}>
              <RotateCcw className="h-4 w-4" /> Recommencer
            </button>
          </div>
        </ScoreCard>
      </div>
    );
  }

  if (run) {
    return (
      <div className="py-2">
        <button className="btn-ghost btn-sm mb-4" onClick={() => setRun(null)}>
          ← Quitter l’entraînement
        </button>
        <QuizPlayer questions={run} mode="entrainement" onFinish={(answers) => setResult(scoreAnswers(run, answers))} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <PageHeader back={{ to: '/qcm', label: 'QCM' }} kicker="Entraînement" title="S’entraîner ou projeter un QCM" subtitle="Correction et explication après chaque question : idéal pour une correction collective au vidéoprojecteur." />
      <div className="card space-y-5 p-6">
        <Field label="Questions">
          <select className="input" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="auto">Sélection aléatoire</option>
            {quizzes.map((q) => (
              <option key={q.id} value={q.id}>
                Modèle : {q.title}
              </option>
            ))}
          </select>
        </Field>
        {source === 'auto' && (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Métier">
                <select className="input" value={tradeId} onChange={(e) => setTradeId(e.target.value)}>
                  <option value="">Questions communes uniquement</option>
                  {trades.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Nombre de questions">
                <input className="input" type="number" min={3} max={50} value={count} onChange={(e) => setCount(Number(e.target.value))} />
              </Field>
            </div>
            <div>
              <p className="label">Compétences travaillées (aucune = toutes)</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {COMPETENCE_ORDER.map((c) => {
                  const on = comps.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setComps(on ? comps.filter((x) => x !== c) : [...comps, c])}
                      className={clsx('rounded-xl border p-3 text-left text-sm', on ? 'border-sst-500 bg-sst-50 ring-2 ring-sst-200' : 'border-slate-200')}
                    >
                      <span className="font-bold">{c}</span> · {COMPETENCE_LABELS[c]}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
        <button className="btn-primary btn-lg" disabled={!questions.length} onClick={start}>
          <Play className="h-5 w-5" /> Commencer
        </button>
      </div>
    </div>
  );
}

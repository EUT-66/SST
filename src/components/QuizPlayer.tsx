import clsx from 'clsx';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Lightbulb, Send, XCircle } from 'lucide-react';
import { useState } from 'react';
import { isAnswerCorrect } from '../lib/quiz';
import type { QuizType, RunQuestion } from '../lib/types';

/**
 * Déroulé d'un QCM, question par question.
 * - entraînement : correction et explication après chaque réponse (si les bonnes réponses sont fournies) ;
 * - évaluation : aucune correction, retour en arrière possible avant l'envoi.
 */
export default function QuizPlayer({
  questions,
  mode,
  onFinish,
  submitLabel = 'Envoyer mes réponses',
}: {
  questions: RunQuestion[];
  mode: QuizType;
  onFinish: (answers: Record<string, number[]>) => void | Promise<void>;
  submitLabel?: string;
}) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number[]>>({});
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [review, setReview] = useState(false);
  const [sending, setSending] = useState(false);
  const training = mode === 'entrainement';
  const q = questions[index];
  const selected = answers[q?.id] ?? [];
  const isChecked = !!checked[q?.id];
  const canCorrect = training && !!q?.correct;

  const toggle = (i: number) => {
    if (isChecked) return;
    const next = q.multiple ? (selected.includes(i) ? selected.filter((x) => x !== i) : [...selected, i]) : [i];
    setAnswers({ ...answers, [q.id]: next });
  };

  const goNext = () => {
    if (index < questions.length - 1) setIndex(index + 1);
    else if (training) finish();
    else setReview(true);
  };

  const finish = async () => {
    setSending(true);
    try {
      await onFinish(answers);
    } finally {
      setSending(false);
    }
  };

  if (!q) return null;

  if (review) {
    const unanswered = questions.filter((x) => !answers[x.id]?.length).length;
    return (
      <div className="mx-auto max-w-xl text-center">
        <div className="card p-8">
          <Send className="mx-auto mb-4 h-12 w-12 text-sst-600" />
          <h2 className="font-display text-2xl font-extrabold">Prêt à envoyer ?</h2>
          <p className="mt-2 text-ink-soft">
            Tu as répondu à {questions.length - unanswered} question(s) sur {questions.length}.
            {unanswered > 0 && <span className="mt-1 block font-semibold text-amber-700">{unanswered} question(s) sans réponse.</span>}
          </p>
          <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <button className="btn-secondary" onClick={() => setReview(false)}>
              <ArrowLeft className="h-4 w-4" /> Revoir mes réponses
            </button>
            <button className="btn-primary" disabled={sending} onClick={finish}>
              <Send className="h-4 w-4" /> {submitLabel}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const correctNow = isChecked && q.correct ? isAnswerCorrect(q.correct, selected) : null;

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="mb-4 flex items-center gap-3">
        <span className="text-sm font-bold text-sst-700">
          {index + 1} / {questions.length}
        </span>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-sst-100">
          <div className="h-full rounded-full bg-sst-500 transition-all" style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      <div className="card p-6 sm:p-8">
        <h2 className="font-display text-xl font-bold leading-snug sm:text-2xl">{q.text}</h2>
        {q.multiple && <p className="mt-2 text-sm font-semibold text-sst-700">Plusieurs réponses possibles</p>}
        <div className="mt-6 space-y-3">
          {q.choices.map((c, i) => {
            const isSel = selected.includes(i);
            const isGood = isChecked && q.correct?.includes(i);
            const isBad = isChecked && isSel && !q.correct?.includes(i);
            return (
              <button
                key={i}
                type="button"
                onClick={() => toggle(i)}
                className={clsx(
                  'flex w-full items-center gap-4 rounded-2xl border-2 p-4 text-left text-base font-semibold transition',
                  !isChecked && (isSel ? 'border-sst-500 bg-sst-50' : 'border-slate-200 hover:border-sst-300'),
                  isGood && 'border-sst-500 bg-sst-50',
                  isBad && 'border-red-400 bg-red-50',
                  isChecked && !isGood && !isBad && 'border-slate-200 opacity-60',
                )}
              >
                <span
                  className={clsx(
                    'flex h-8 w-8 shrink-0 items-center justify-center border-2 text-sm font-bold',
                    q.multiple ? 'rounded-lg' : 'rounded-full',
                    isSel ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-300 text-slate-500',
                  )}
                >
                  {isSel ? <Check className="h-4 w-4" /> : String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{c}</span>
                {isGood && <CheckCircle2 className="h-6 w-6 shrink-0 text-sst-600" />}
                {isBad && <XCircle className="h-6 w-6 shrink-0 text-red-500" />}
              </button>
            );
          })}
        </div>

        {isChecked && (
          <div className={clsx('mt-5 rounded-2xl p-4', correctNow ? 'bg-sst-50 text-sst-900' : 'bg-amber-50 text-amber-900')}>
            <p className="font-bold">{correctNow ? 'Bonne réponse !' : 'Pas tout à fait…'}</p>
            {q.explanation && (
              <p className="mt-1 flex gap-2 text-sm">
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" /> {q.explanation}
              </p>
            )}
          </div>
        )}

        <div className="mt-6 flex justify-between gap-3">
          <button className="btn-ghost" disabled={index === 0 || training} onClick={() => setIndex(index - 1)}>
            <ArrowLeft className="h-4 w-4" /> Précédente
          </button>
          {canCorrect && !isChecked ? (
            <button className="btn-primary" disabled={!selected.length} onClick={() => setChecked({ ...checked, [q.id]: true })}>
              Valider
            </button>
          ) : (
            <button className="btn-primary" disabled={(!selected.length && training) || sending} onClick={goNext}>
              {index < questions.length - 1 ? (
                <>
                  Suivante <ArrowRight className="h-4 w-4" />
                </>
              ) : training ? (
                'Voir mon score'
              ) : (
                'Terminer'
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/** Écran de score (entraînement ou résultat montré par le formateur). */
export function ScoreCard({ score, total, children }: { score: number; total: number; children?: React.ReactNode }) {
  const ratio = total ? score / total : 0;
  return (
    <div className="card mx-auto max-w-xl p-8 text-center">
      <div className="relative mx-auto mb-4 h-36 w-36">
        <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
          <circle cx="18" cy="18" r="15.9" fill="none" stroke="#d9f3e2" strokeWidth="3.2" />
          <circle cx="18" cy="18" r="15.9" fill="none" stroke={ratio >= 0.7 ? '#1a7f4b' : '#f2a900'} strokeWidth="3.2" strokeDasharray={`${ratio * 100} 100`} strokeLinecap="round" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-3xl font-extrabold">{Math.round(ratio * 100)} %</span>
          <span className="text-xs text-ink-muted">
            {score}/{total}
          </span>
        </div>
      </div>
      <p className="font-display text-xl font-bold">{ratio >= 0.85 ? 'Excellent !' : ratio >= 0.7 ? 'Bien joué !' : 'Continue à t’entraîner !'}</p>
      {children}
    </div>
  );
}

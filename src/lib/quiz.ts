import { COMPETENCE_ORDER } from './competences';
import { shuffle } from './format';
import type { CompetenceId, CompetenceScore, Question, QcmResult, RunQuestion } from './types';

export function correctIndexes(q: Question): number[] {
  return q.choices.map((c, i) => (c.correct ? i : -1)).filter((i) => i >= 0);
}

export function toRunQuestion(q: Question, withCorrection: boolean, shuffleChoices = true): RunQuestion & { correct: number[] } {
  const order = shuffleChoices ? shuffle(q.choices.map((_, i) => i)) : q.choices.map((_, i) => i);
  const choices = order.map((i) => q.choices[i].text);
  const correct = order.map((orig, i) => (q.choices[orig].correct ? i : -1)).filter((i) => i >= 0);
  const run: RunQuestion & { correct: number[] } = {
    id: q.id,
    text: q.text,
    choices,
    multiple: correct.length > 1,
    competence: q.competence,
    correct,
  };
  if (withCorrection && q.explanation) run.explanation = q.explanation;
  return run;
}

/** Retire les bonnes réponses avant publication pour un QCM d'évaluation. */
export function stripCorrection(q: RunQuestion): RunQuestion {
  const { correct: _c, explanation: _e, ...rest } = q;
  return rest;
}

export function isAnswerCorrect(correct: number[], answer: number[] | undefined): boolean {
  if (!answer) return false;
  const a = [...answer].sort();
  const c = [...correct].sort();
  return a.length === c.length && a.every((v, i) => v === c[i]);
}

export function scoreAnswers(
  questions: (RunQuestion & { correct: number[] })[],
  answers: Record<string, number[]>,
): Pick<QcmResult, 'score' | 'total' | 'byCompetence'> {
  const byCompetence: Partial<Record<CompetenceId, CompetenceScore>> = {};
  let score = 0;
  for (const q of questions) {
    const ok = isAnswerCorrect(q.correct, answers[q.id]);
    if (ok) score++;
    const s = byCompetence[q.competence] ?? { correct: 0, total: 0 };
    s.total++;
    if (ok) s.correct++;
    byCompetence[q.competence] = s;
  }
  return { score, total: questions.length, byCompetence };
}

/**
 * Tire un QCM équilibré : répartit les questions entre les compétences,
 * en privilégiant les questions propres au métier de la session.
 */
export function pickBalanced(questions: Question[], count: number, tradeId?: string): Question[] {
  const byComp = new Map<CompetenceId, Question[]>();
  for (const c of COMPETENCE_ORDER) byComp.set(c, []);
  for (const q of shuffle(questions)) byComp.get(q.competence)?.push(q);
  for (const [c, list] of byComp) {
    // les questions du métier passent devant
    byComp.set(
      c,
      [...list].sort((a, b) => Number(b.tradeIds.includes(tradeId ?? '')) - Number(a.tradeIds.includes(tradeId ?? ''))),
    );
  }
  const picked: Question[] = [];
  let round = 0;
  while (picked.length < count) {
    let added = false;
    for (const c of COMPETENCE_ORDER) {
      const list = byComp.get(c)!;
      if (list.length > round && picked.length < count) {
        picked.push(list[round]);
        added = true;
      }
    }
    if (!added) break;
    round++;
  }
  return shuffle(picked);
}

export function questionMatchesTrade(q: { tradeIds: string[] }, tradeId?: string | null): boolean {
  return q.tradeIds.length === 0 || (!!tradeId && q.tradeIds.includes(tradeId));
}

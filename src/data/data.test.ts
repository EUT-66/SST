import { describe, expect, it } from 'vitest';
import { ALL_INDICATORS } from '../lib/competences';
import { BTP_CASES } from './casesBtp';
import { MIT_CASES } from './casesMit';
import { COURSE_AIDE_MEMOIRE } from './courseAideMemoire';
import { COURSE_MIT } from './courseMit';
import { DEFAULT_QUESTIONS, DEFAULT_QUIZZES } from './questions';
import { DEFAULT_TRADES } from './trades';

const indicatorIds = new Set(ALL_INDICATORS.map((i) => i.id));
const tradeIds = new Set(DEFAULT_TRADES.map((t) => t.id));

describe('contenus par défaut', () => {
  const cases = [...MIT_CASES, ...BTP_CASES];
  it('cas pratiques cohérents', () => {
    expect(MIT_CASES).toHaveLength(18);
    expect(new Set(cases.map((c) => c.id)).size).toBe(cases.length);
    for (const c of cases) {
      expect(c.actions.length).toBeGreaterThan(4);
      expect(c.prevention).toHaveLength(6);
      for (const a of c.actions) for (const i of a.indicators) expect(indicatorIds.has(i), `${c.id}: ${i}`).toBe(true);
      for (const t of c.tradeIds) expect(tradeIds.has(t), `${c.id}: ${t}`).toBe(true);
      // chaque cas doit couvrir au moins l'alerte et un geste de secours
      const covered = new Set(c.actions.flatMap((a) => a.indicators));
      // plaie simple : pas d'alerte attendue, C4 est évaluée directement par le formateur
      if (c.id !== 'mit-11') expect(covered.has('C4a'), c.id).toBe(true);
      expect(covered.has('C5a'), c.id).toBe(true);
      expect(covered.has('C5c'), c.id).toBe(true);
    }
  });
  it('questions et modèles de QCM cohérents', () => {
    const ids = new Set(DEFAULT_QUESTIONS.map((q) => q.id));
    expect(ids.size).toBe(DEFAULT_QUESTIONS.length);
    for (const q of DEFAULT_QUESTIONS) {
      expect(q.choices.some((c) => c.correct), q.id).toBe(true);
      expect(q.choices.some((c) => !c.correct), q.id).toBe(true);
      for (const t of q.tradeIds) expect(tradeIds.has(t)).toBe(true);
    }
    for (const quiz of DEFAULT_QUIZZES) for (const id of quiz.questionIds) expect(ids.has(id), id).toBe(true);
    expect(DEFAULT_QUIZZES[0].questionIds).toHaveLength(20);
  });
  it('cours cohérents', () => {
    expect(COURSE_MIT.slides).toHaveLength(56);
    for (const c of [COURSE_MIT, COURSE_AIDE_MEMOIRE]) {
      expect(new Set(c.slides.map((s) => s.id)).size).toBe(c.slides.length);
      expect(JSON.stringify(c)).not.toContain('undefined');
    }
  });
});

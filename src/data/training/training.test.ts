import { describe, expect, it } from 'vitest';
import { ALL_INDICATORS } from '../../lib/competences';
import { DEFAULT_TRADES } from '../trades';
import { TRAINING_CASES } from './index';

const indicatorIds = new Set(ALL_INDICATORS.map((i) => i.id));
const tradeIds = new Set(DEFAULT_TRADES.map((t) => t.id));

describe('cas d’entraînement', () => {
  it('sont réservés à l’entraînement, complets et bien rattachés', () => {
    expect(new Set(TRAINING_CASES.map((c) => c.id)).size).toBe(TRAINING_CASES.length);
    for (const c of TRAINING_CASES) {
      expect(c.id.startsWith('ent-'), c.id).toBe(true);
      expect(c.trainingOnly, c.id).toBe(true);
      expect(c.reviewed, c.id).toBe(false);
      expect(c.number, c.id).toBeUndefined();
      expect(c.actions.length, c.id).toBeGreaterThanOrEqual(5);
      expect(c.prevention, c.id).toHaveLength(6);
      for (const p of c.prevention) expect(p.answer.trim().length, `${c.id} ${p.key}`).toBeGreaterThan(3);
      for (const t of c.tradeIds) expect(tradeIds.has(t), `${c.id}: ${t}`).toBe(true);
      expect(c.category === 'vie_quotidienne' ? c.tradeIds.length === 0 : c.tradeIds.length > 0, c.id).toBe(true);
      const covered = new Set(c.actions.flatMap((a) => a.indicators));
      for (const a of c.actions) for (const i of a.indicators) expect(indicatorIds.has(i), `${c.id}: ${i}`).toBe(true);
      for (const need of ['C3a', 'C4a', 'C5a', 'C5c'] as const) expect(covered.has(need), `${c.id} sans ${need}`).toBe(true);
      expect([...covered].some((i) => i.startsWith('C2')), `${c.id} sans protection`).toBe(true);
      const text = JSON.stringify(c);
      expect(text, c.id).not.toMatch(/undefined|TODO|\bnull\b/);
      expect(/[A-Za-zÀ-ÿ]'[A-Za-zÀ-ÿ]/.test([c.title, c.geste, c.scenario, c.victime, c.temoin, c.materiel, ...c.actions.map((a) => a.text), ...c.prevention.map((p) => p.answer)].join(' ')), `${c.id} : apostrophe droite`).toBe(false);
    }
  });
});

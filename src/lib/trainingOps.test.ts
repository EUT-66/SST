import { describe, expect, it } from 'vitest';
import { emptyTraining, nextSeries, pickTrainingCase, trainingPool, withAllPassages, withCaseChange, withPassage } from './trainingOps';
import type { PracticalCase } from './types';

const kase = (id: string, category: PracticalCase['category'] = 'metier', tradeIds = ['mit']): PracticalCase => ({
  id, title: id, geste: '', category, tradeIds, scenario: '', victime: '', temoin: '', materiel: '', actions: [], prevention: [], reviewed: true,
});
const cases = [kase('a'), kase('b'), kase('c', 'vie_quotidienne', []), kase('autre-metier', 'metier', ['elec'])];
const session = { tradeId: 'mit', casePool: 'both' as const, drawnCaseIds: ['b'] };

describe('entraînement à la mise en pratique', () => {
  it('tire les cas du métier sans répétition, puis recommence un tour', () => {
    let state = { ...emptyTraining(session), avoidCertificationCases: false };
    const seen = new Set<string>();
    for (let i = 0; i < 3; i++) {
      const { kase: k, recycled } = pickTrainingCase(cases, session, state);
      expect(recycled).toBe(false);
      seen.add(k!.id);
      state = withPassage(state, `l${i}`, k!.id, recycled);
    }
    expect([...seen].sort()).toEqual(['a', 'b', 'c']); // jamais le cas d'un autre métier
    const fourth = pickTrainingCase(cases, session, state);
    expect(fourth.recycled).toBe(true);
    expect(withPassage(state, 'l3', fourth.kase!.id, true).usedCaseIds).toEqual([fourth.kase!.id]);
  });

  it('garde secrets les cas tirés pour la certification', () => {
    const state = emptyTraining(session);
    for (let i = 0; i < 20; i++) expect(pickTrainingCase(cases, session, state).kase!.id).not.toBe('b');
  });

  it('change le cas d’un apprenti et remet l’ancien en jeu ; nouvelle série', () => {
    let state = withPassage(emptyTraining(session), 'l1', 'a', false);
    state = withCaseChange(state, 'l1', 'c', false);
    expect(state.passages[0].caseId).toBe('c');
    expect(state.usedCaseIds).toEqual(['c']);
    expect(withPassage(state, 'l1', 'a', false)).toBe(state); // déjà passé dans la série
    const next = nextSeries(state, true);
    expect(next).toMatchObject({ series: 2, passages: [], usedCaseIds: ['c'] });
    expect(nextSeries(state, false).usedCaseIds).toEqual([]);
  });
});

describe('cas réservés à l’entraînement et ordre tiré d’un coup', () => {
  const training = [kase('e1'), kase('e2'), kase('e3', 'vie_quotidienne', [])].map((c) => ({ ...c, trainingOnly: true }));
  const all = [...cases, ...training];

  it('privilégie les cas d’entraînement, ou tous les cas sur demande', () => {
    const state = emptyTraining(session);
    expect(trainingPool(all, session, state).map((c) => c.id).sort()).toEqual(['e1', 'e2', 'e3']);
    expect(trainingPool(all, session, { ...state, source: 'tous', avoidCertificationCases: false }).length).toBe(6);
    // métier sans cas d'entraînement : on garde tous ses cas
    expect(trainingPool(all, { ...session, tradeId: 'elec' }, { ...state, casePool: 'metier' }).map((c) => c.id)).toEqual(['autre-metier']);
  });

  it('tire tout l’ordre d’un coup, chacun avec un cas différent', () => {
    const learners = ['l1', 'l2', 'l3', 'l4'];
    const state = withAllPassages(withPassage(emptyTraining(session), 'l2', 'e1', false), learners, all, session);
    expect(state.passages.map((p) => p.learnerId).sort()).toEqual(learners);
    expect(state.passages[0]).toMatchObject({ learnerId: 'l2', caseId: 'e1' }); // déjà passé : inchangé
    const firstRound = state.passages.slice(0, 3).map((p) => p.caseId);
    expect(new Set(firstRound).size).toBe(3); // pas de répétition avant d'avoir joué les 3 cas
    expect(state.passages.every((p) => p.caseId && p.caseId.startsWith('e'))).toBe(true);
  });
});

describe('certification', () => {
  it('ne tire jamais un cas réservé à l’entraînement', async () => {
    const { availableCases } = await import('./sessions');
    const pool = availableCases([kase('a'), { ...kase('e'), trainingOnly: true }], { tradeId: 'mit', casePool: 'both', drawnCaseIds: [] });
    expect(pool.map((c) => c.id)).toEqual(['a']);
  });
});

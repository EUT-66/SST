import { describe, expect, it } from 'vitest';
import { emptyTraining, nextSeries, pickTrainingCase, withCaseChange, withPassage } from './trainingOps';
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

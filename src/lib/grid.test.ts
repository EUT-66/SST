import { describe, expect, it } from 'vitest';
import { computeAllCompetences, computeCertified } from './competences';
import { proposeIndicators, summarize } from './grid';
import { archiveYear, availableCases, sessionPhase } from './sessions';
import type { Evaluation, PracticalCase } from './types';

const kase: PracticalCase = {
  id: 'k', title: 't', geste: 'g', category: 'metier', tradeIds: ['mit'], scenario: '', victime: '', temoin: '', materiel: '', reviewed: true,
  actions: [
    { text: 'Repère le danger', indicators: ['C2a'] },
    { text: 'Dégage la victime', indicators: ['C2e'] },
    { text: 'Examine', indicators: ['C3a', 'C3b'] },
    { text: 'Alerte', indicators: ['C4a'] },
    { text: 'PLS', indicators: ['C5a', 'C5b'] },
    { text: 'Surveille', indicators: ['C5c'] },
  ],
  prevention: [
    { key: 'danger', label: 'Danger', answer: '', indicators: ['C7a'] },
    { key: 'situation', label: 'Situation', answer: '', indicators: ['C7a'] },
    { key: 'evenement', label: 'Événement', answer: '', indicators: ['C7a'] },
    { key: 'dommage', label: 'Dommage', answer: '', indicators: ['C7a'] },
    { key: 'eviter', label: 'Éviter', answer: '', indicators: ['C8a', 'C8b'] },
    { key: 'remonter', label: 'Remonter', answer: '', indicators: ['C6a'] },
  ],
};

const allDone: Evaluation = {
  learnerId: 'l',
  actions: { 0: 'fait', 1: 'fait', 2: 'fait', 3: 'fait', 4: 'fait', 5: 'fait' },
  prevention: { danger: 'acquis', situation: 'acquis', evenement: 'non_acquis', dommage: 'acquis', eviter: 'acquis', remonter: 'acquis' },
  entretien: { C1a: 'acquis' },
  manual: {},
  qcm: { quizTitle: 'q', score: 9, total: 10, byCompetence: { C1: { correct: 2, total: 2 }, C6: { correct: 1, total: 1 }, C7: { correct: 2, total: 3 }, C8: { correct: 2, total: 2 } }, answers: {}, date: 0, mode: 'local' },
};

const settings = { qcmThreshold: 0.6, qcmMode: 'and' as const };

describe('règles officielles', () => {
  it('C2 exige l’incontournable et l’un des indicateurs de suppression', () => {
    expect(computeAllCompetences({ C2a: 'acquis', C2e: 'acquis' }).C2).toBe('acquise');
    expect(computeAllCompetences({ C2a: 'acquis', C2c: 'non_acquis', C2d: 'non_acquis', C2e: 'non_acquis' }).C2).toBe('non_acquise');
    expect(computeAllCompetences({ C2a: 'acquis' }).C2).toBeNull();
    expect(computeAllCompetences({ C2a: 'non_acquis', C2e: 'acquis' }).C2).toBe('non_acquise');
  });
  it('C5 exige les deux incontournables', () => {
    expect(computeAllCompetences({ C5a: 'acquis', C5b: 'non_acquis', C5c: 'acquis' }).C5).toBe('acquise');
    expect(computeAllCompetences({ C5a: 'acquis', C5c: 'non_acquis' }).C5).toBe('non_acquise');
  });
  it('8 compétences acquises donnent la certification', () => {
    const all = { C1: 'acquise', C2: 'acquise', C3: 'acquise', C4: 'acquise', C5: 'acquise', C6: 'acquise', C7: 'acquise', C8: 'acquise' } as const;
    expect(computeCertified(all)).toBe(true);
    expect(computeCertified({ ...all, C4: 'non_acquise' })).toBe(false);
    expect(computeCertified({ ...all, C4: null })).toBeNull();
  });
});

describe('propositions de la grille', () => {
  it('certifie un candidat qui a tout réussi', () => {
    const s = summarize(kase, allDone, settings);
    expect(s.competences).toMatchObject({ C1: 'acquise', C2: 'acquise', C3: 'acquise', C4: 'acquise', C5: 'acquise', C6: 'acquise', C7: 'acquise', C8: 'acquise' });
    expect(s.certified).toBe(true);
    expect(s.epreuve1).toBe(true);
  });
  it('une action non faite rend l’indicateur non acquis', () => {
    const s = summarize(kase, { ...allDone, actions: { ...allDone.actions, 3: 'non_fait' } }, settings);
    expect(s.indicators.C4a).toBe('non_acquis');
    expect(s.competences.C4).toBe('non_acquise');
    expect(s.certified).toBe(false);
  });
  it('le QCM insuffisant fait échouer en mode « et », pas en mode « secours »', () => {
    const ev = { ...allDone, qcm: { ...allDone.qcm!, byCompetence: { ...allDone.qcm!.byCompetence, C6: { correct: 0, total: 2 } } } };
    expect(summarize(kase, ev, settings).competences.C6).toBe('non_acquise');
    expect(summarize(kase, ev, { ...settings, qcmMode: 'fallback' }).competences.C6).toBe('acquise');
  });
  it('la décision du formateur l’emporte et les indicateurs non couverts sont signalés', () => {
    const p = proposeIndicators(kase, { ...allDone, manual: { C4a: 'non_acquis' } }, settings);
    expect(p.C4a.value).toBe('non_acquis');
    expect(p.C4a.manual).toBe(true);
    expect(p.C4b.uncovered).toBe(true);
    expect(p.C1a.uncovered).toBe(false);
  });
});

describe('sessions', () => {
  it('archive les sessions clôturées l’année suivante', () => {
    const closed = { status: 'closed' as const, closedAt: new Date('2025-12-15').getTime(), startDate: '2025-12-01', endDate: '2025-12-12' };
    expect(archiveYear(closed)).toBe(2025);
    expect(sessionPhase(closed, '2025-12-31')).toBe('cloturee');
    expect(sessionPhase(closed, '2026-01-01')).toBe('archivee');
    expect(sessionPhase({ status: 'active', startDate: '2026-10-20', endDate: '2026-10-22' }, '2026-10-14')).toBe('a_venir');
    expect(sessionPhase({ status: 'active', startDate: '2026-10-01', endDate: '2026-10-02' }, '2026-10-14')).toBe('a_cloturer');
  });
  it('ne remet pas en jeu les cas déjà tirés', () => {
    const vq = { ...kase, id: 'vq', category: 'vie_quotidienne' as const, tradeIds: [] };
    const other = { ...kase, id: 'o', tradeIds: ['macon'] };
    const s = { tradeId: 'mit', casePool: 'both' as const, drawnCaseIds: ['k'] };
    expect(availableCases([kase, vq, other], s).map((c) => c.id)).toEqual(['vq']);
    expect(availableCases([kase, vq, other], { ...s, drawnCaseIds: [], casePool: 'metier' }).map((c) => c.id)).toEqual(['k']);
  });
});

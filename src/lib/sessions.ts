import { todayIso } from './format';
import type { CasePool, FormationType, PracticalCase, Session } from './types';

export type SessionPhase = 'a_venir' | 'en_cours' | 'a_cloturer' | 'cloturee' | 'archivee';

export const PHASE_LABELS: Record<SessionPhase, string> = {
  a_venir: 'À venir',
  en_cours: 'En cours',
  a_cloturer: 'Terminée – à clôturer',
  cloturee: 'Clôturée',
  archivee: 'Archivée',
};

/** Année à laquelle la session clôturée est rattachée pour l'archivage. */
export function archiveYear(s: Pick<Session, 'closedAt' | 'endDate'>): number {
  if (s.closedAt) return new Date(s.closedAt).getFullYear();
  return Number((s.endDate || todayIso()).slice(0, 4));
}

/** Une formation clôturée est archivée automatiquement à partir du 1er janvier suivant. */
export function sessionPhase(s: Pick<Session, 'status' | 'closedAt' | 'startDate' | 'endDate'>, today = todayIso()): SessionPhase {
  if (s.status === 'closed') {
    return Number(today.slice(0, 4)) > archiveYear(s) ? 'archivee' : 'cloturee';
  }
  if (s.startDate && today < s.startDate) return 'a_venir';
  if (s.endDate && today > s.endDate) return 'a_cloturer';
  return 'en_cours';
}

export function caseMatchesPool(c: PracticalCase, tradeId: string, pool: CasePool): boolean {
  const forTrade = c.tradeIds.length === 0 || c.tradeIds.includes(tradeId);
  if (!forTrade) return false;
  if (pool === 'both') return true;
  return c.category === pool;
}

/** Cas encore disponibles au tirage pour une session (sans remise). */
export function availableCases(cases: PracticalCase[], session: Pick<Session, 'tradeId' | 'casePool' | 'drawnCaseIds'>): PracticalCase[] {
  const drawn = new Set(session.drawnCaseIds ?? []);
  return cases.filter((c) => caseMatchesPool(c, session.tradeId, session.casePool) && !drawn.has(c.id));
}

export const FORMATION_LABELS: Record<FormationType, string> = {
  initiale: 'Formation initiale',
  mac: 'Maintien et actualisation des compétences',
};

export const FORMATION_SHORT: Record<FormationType, string> = {
  initiale: 'Initiale',
  mac: 'MAC',
};

/** Les sessions créées avant l'ajout du MAC sont des formations initiales. */
export function formationOf(s: Pick<Session, 'formationType'>): FormationType {
  return s.formationType === 'mac' ? 'mac' : 'initiale';
}

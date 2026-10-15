// Calcul des propositions de la grille de certification à partir de l'évaluation
// (cas pratique + entretien + QCM).
import {
  ALL_INDICATORS,
  computeAllCompetences,
  computeCertified,
  EPREUVE2_INDICATORS,
} from './competences';
import type {
  AppSettings,
  CompetenceId,
  CompetenceValue,
  Evaluation,
  GridState,
  IndicatorId,
  IndicatorValue,
  Learner,
  PracticalCase,
  Session,
  UserProfile,
} from './types';

export type SourceKind = 'action' | 'prevention' | 'entretien' | 'qcm' | 'manual';

export interface SourceInfo {
  kind: SourceKind;
  label: string;
  value: boolean | null;
}

export interface IndicatorProposal {
  value: IndicatorValue;
  sources: SourceInfo[];
  /** Aucun élément de la fiche ni du QCM ne renseigne cet indicateur. */
  uncovered: boolean;
  manual: boolean;
}

/** Indicateurs du QCM : seules les compétences de l'épreuve 2 sont alimentées par le QCM. */
const QCM_INDICATOR: Partial<Record<IndicatorId, CompetenceId>> = {
  C1a: 'C1',
  C6a: 'C6',
  C7a: 'C7',
  C8a: 'C8',
};

function strictAll(values: (boolean | null)[]): boolean | null {
  if (values.length === 0) return null;
  if (values.some((v) => v === false)) return false;
  if (values.every((v) => v === true)) return true;
  return null;
}

function majority(values: (boolean | null)[]): boolean | null {
  if (values.length === 0 || values.some((v) => v === null)) return null;
  const ok = values.filter(Boolean).length;
  return ok / values.length > 0.5;
}

function combine(values: (boolean | null)[]): boolean | null {
  const known = values.filter((v): v is boolean => v !== null);
  if (known.length === 0) return null;
  return known.every(Boolean);
}

const toValue = (b: boolean | null): IndicatorValue => (b === null ? null : b ? 'acquis' : 'non_acquis');

export function proposeIndicators(
  caseData: PracticalCase | null | undefined,
  ev: Evaluation,
  settings: Pick<AppSettings, 'qcmThreshold' | 'qcmMode'>,
): Record<IndicatorId, IndicatorProposal> {
  const out = {} as Record<IndicatorId, IndicatorProposal>;

  for (const def of ALL_INDICATORS) {
    const id = def.id;
    const sources: SourceInfo[] = [];

    // Actions attendues de l'épreuve 1
    const actionValues: (boolean | null)[] = [];
    caseData?.actions.forEach((a, idx) => {
      if (!a.indicators.includes(id)) return;
      const st = ev.actions?.[String(idx)];
      const value = st === 'fait' ? true : st === 'non_fait' ? false : null;
      actionValues.push(value);
      sources.push({ kind: 'action', label: a.text, value });
    });

    // Réponses de prévention de l'épreuve 2
    const preventionValues: (boolean | null)[] = [];
    caseData?.prevention.forEach((p) => {
      if (!p.indicators.includes(id)) return;
      const st = ev.prevention?.[p.key];
      const value = st === 'acquis' ? true : st === 'non_acquis' ? false : null;
      preventionValues.push(value);
      sources.push({ kind: 'prevention', label: p.label, value });
    });

    // Questions d'entretien
    const entretienSt = ev.entretien?.[id];
    const entretienValue = entretienSt === 'acquis' ? true : entretienSt === 'non_acquis' ? false : null;
    if (entretienSt) sources.push({ kind: 'entretien', label: 'Question d’entretien', value: entretienValue });

    // QCM
    let qcmValue: boolean | null = null;
    const comp = QCM_INDICATOR[id];
    const score = comp ? ev.qcm?.byCompetence?.[comp] : undefined;
    if (comp && score && score.total > 0) {
      const ratio = score.correct / score.total;
      qcmValue = ratio >= settings.qcmThreshold;
      sources.push({
        kind: 'qcm',
        label: `QCM ${comp} : ${score.correct}/${score.total} (${Math.round(ratio * 100)} %)`,
        value: qcmValue,
      });
    }

    const direct = combine([
      strictAll(actionValues),
      preventionValues.length ? majority(preventionValues) : null,
      entretienValue,
    ]);

    let proposed: boolean | null;
    if (settings.qcmMode === 'fallback') proposed = direct ?? qcmValue;
    else proposed = combine([direct, qcmValue]);

    const manualSt = ev.manual?.[id];
    if (manualSt) sources.push({ kind: 'manual', label: 'Décision du formateur', value: manualSt === 'acquis' });

    const covered =
      actionValues.length > 0 ||
      preventionValues.length > 0 ||
      (EPREUVE2_INDICATORS.includes(id) && !!comp) ||
      !!entretienSt;

    out[id] = {
      value: manualSt ?? toValue(proposed),
      sources,
      uncovered: !covered,
      manual: !!manualSt,
    };
  }
  return out;
}

export function indicatorValues(
  proposals: Record<IndicatorId, IndicatorProposal>,
): Partial<Record<IndicatorId, IndicatorValue>> {
  return Object.fromEntries(Object.entries(proposals).map(([k, p]) => [k, p.value])) as Partial<
    Record<IndicatorId, IndicatorValue>
  >;
}

export interface EvaluationSummary {
  indicators: Partial<Record<IndicatorId, IndicatorValue>>;
  competences: Record<CompetenceId, CompetenceValue>;
  certified: boolean | null;
  epreuve1: boolean | null;
  epreuve2: boolean | null;
  actionsDone: number;
  actionsTotal: number;
}

export function summarize(
  caseData: PracticalCase | null | undefined,
  ev: Evaluation,
  settings: Pick<AppSettings, 'qcmThreshold' | 'qcmMode'>,
): EvaluationSummary {
  const proposals = proposeIndicators(caseData, ev, settings);
  const indicators = indicatorValues(proposals);
  const competences = computeAllCompetences(indicators);
  const epreuve = (ids: CompetenceId[]) => {
    const v = ids.map((c) => competences[c]);
    if (v.some((x) => x === 'non_acquise')) return false;
    if (v.every((x) => x === 'acquise')) return true;
    return null;
  };
  const actionsTotal = caseData?.actions.length ?? 0;
  const actionsDone = Object.values(ev.actions ?? {}).filter((s) => s === 'fait').length;
  return {
    indicators,
    competences,
    certified: computeCertified(competences),
    epreuve1: epreuve(['C2', 'C3', 'C4', 'C5']),
    epreuve2: epreuve(['C1', 'C6', 'C7', 'C8']),
    actionsDone,
    actionsTotal,
  };
}

export function buildGrid(params: {
  learner: Learner;
  session: Session;
  trainer: Pick<UserProfile, 'firstName' | 'lastName' | 'signature'> | null;
  summary: EvaluationSummary;
  certificationDate?: string;
}): GridState {
  const { learner, session, trainer, summary } = params;
  return {
    candidate: {
      lastName: learner.lastName ?? '',
      firstName: learner.firstName ?? '',
      birthDate: learner.birthDate ?? '',
    },
    session: { from: session.startDate ?? '', to: session.endDate ?? '' },
    indicators: { ...summary.indicators },
    competences: { ...summary.competences },
    certified: summary.certified,
    trainer: {
      lastName: trainer?.lastName ?? '',
      firstName: trainer?.firstName ?? '',
      signature: trainer?.signature ?? null,
    },
    certificationDate: params.certificationDate ?? session.endDate ?? '',
  };
}

const personKey = (p: { firstName?: string; lastName?: string }) =>
  `${p.lastName ?? ''} ${p.firstName ?? ''}`.normalize('NFD').replace(/\p{M}/gu, '').replace(/[\s'’-]+/g, ' ').trim().toLowerCase();

/**
 * Reprend la signature du profil sur une grille enregistrée qui n'en a pas encore. Une signature
 * retirée volontairement (chaîne vide) n'est pas remise, ni sur une grille au nom d'un autre formateur.
 */
export function withProfileSignature(grid: GridState, trainer: Pick<UserProfile, 'firstName' | 'lastName' | 'signature'> | null): GridState {
  if (grid.trainer.signature != null || !trainer?.signature) return grid;
  if (personKey(grid.trainer) !== personKey(trainer)) return grid;
  return { ...grid, trainer: { ...grid.trainer, signature: trainer.signature } };
}

/** Recalcule compétences et certification après modification des indicateurs de la grille. */
export function refreshGridDerived(grid: GridState): GridState {
  const competences = computeAllCompetences(grid.indicators);
  return { ...grid, competences, certified: computeCertified(competences) };
}

/** Grille d'un apprenti : la version enregistrée (modifiée par le formateur) ou la proposition calculée. */
export function gridForLearner(params: {
  learner: Learner;
  session: Session;
  evaluation: Evaluation | undefined;
  caseData: PracticalCase | null | undefined;
  settings: Pick<AppSettings, 'qcmThreshold' | 'qcmMode'>;
  trainer: Pick<UserProfile, 'firstName' | 'lastName' | 'signature'> | null;
}): GridState {
  const { learner, session, evaluation, caseData, settings, trainer } = params;
  if (evaluation?.grid) return withProfileSignature(evaluation.grid, trainer);
  const ev: Evaluation = evaluation ?? { learnerId: learner.id, actions: {}, prevention: {}, manual: {} };
  return buildGrid({ learner, session, trainer, summary: summarize(caseData, ev, settings) });
}

// Référentiel de la grille de certification des compétences du SST (INRS, juin 2020)
// et règles d'acquisition.
import type {
  CompetenceId,
  CompetenceValue,
  IndicatorId,
  IndicatorValue,
  PreventionKey,
  QuestionTheme,
} from './types';

export interface IndicatorDef {
  id: IndicatorId;
  text: string;
  /** Indicateur incontournable (surligné en jaune sur la grille). */
  key: boolean;
}

export interface CompetenceGroup {
  label: string;
  intro?: string;
  indicators: IndicatorDef[];
}

export interface CompetenceDef {
  id: CompetenceId;
  epreuve: 1 | 2;
  short: string;
  groups: CompetenceGroup[];
  /** Conditions d'acquisition, une par groupe (ou une seule pour la compétence). */
  conditions: string[];
}

const ind = (id: IndicatorId, text: string, key = false): IndicatorDef => ({ id, text, key });

export const COMPETENCES: CompetenceDef[] = [
  {
    id: 'C2',
    epreuve: 1,
    short: 'Protéger',
    groups: [
      {
        label: 'Identifier les dangers persistants et repérer les personnes qui pourraient y être exposées',
        indicators: [
          ind('C2a', 'Repère le(s) danger(s) persistant(s) dans la situation d’accident simulée', true),
          ind('C2b', 'Repère la(les) personne(s) qui est(sont) exposée(s) au(x) danger(s) persistant(s) identifié(s)'),
        ],
      },
      {
        label:
          'Supprimer ou isoler le danger persistant, ou soustraire la victime au danger persistant sans s’exposer soi-même',
        indicators: [
          ind('C2c', 'Assure ou fait assurer la suppression'),
          ind('C2d', 'Isole ou fait isoler le danger'),
          ind('C2e', 'Soustrait ou fait soustraire la victime au danger'),
        ],
      },
    ],
    conditions: ['Au moins l’indicateur incontournable acquis', 'L’un des indicateurs acquis'],
  },
  {
    id: 'C3',
    epreuve: 1,
    short: 'Examiner',
    groups: [
      {
        label:
          'Rechercher, suivant un ordre déterminé, la présence d’un (ou plusieurs) des signes indiquant que la vie de la victime est immédiatement menacée',
        indicators: [
          ind('C3a', 'Recherche les signes indiquant que la vie de la victime est menacée', true),
          ind('C3b', 'Effectue l’examen dans l’ordre déterminé'),
        ],
      },
    ],
    conditions: ['Au moins l’indicateur incontournable acquis'],
  },
  {
    id: 'C4',
    epreuve: 1,
    short: 'Faire alerter',
    groups: [
      {
        label: 'Garantir une alerte favorisant l’arrivée de secours adaptés au plus près de la victime',
        indicators: [
          ind('C4a', 'Transmet le message d’alerte permettant le déclenchement des secours adaptés', true),
          ind('C4b', 'Favorise l’arrivée des secours au plus près de la victime'),
        ],
      },
    ],
    conditions: ['Au moins l’indicateur incontournable acquis'],
  },
  {
    id: 'C5',
    epreuve: 1,
    short: 'Secourir',
    groups: [
      {
        label: 'Choisir à l’issue de l’examen l’action ou les actions à effectuer',
        indicators: [ind('C5a', 'Choisit l’action appropriée au résultat à atteindre', true)],
      },
      {
        label:
          'Réaliser l’action ou les actions choisie(s) en respectant la conduite à tenir indiquée dans le guide des données techniques',
        indicators: [ind('C5b', 'Utilise la (ou les) technique(s) préconisée(s)')],
      },
      {
        label:
          'Surveiller, jusqu’à la prise en charge de la victime par les secours spécialisés, l’amélioration ou l’aggravation de son état et adapter sa conduite si besoin',
        indicators: [
          ind('C5c', 'Surveille la victime et agit en conséquence jusqu’à la prise en charge de celle-ci par les secours', true),
        ],
      },
    ],
    conditions: ['Au moins les 2 indicateurs incontournables acquis'],
  },
  {
    id: 'C1',
    epreuve: 2,
    short: 'Champ d’intervention',
    groups: [
      {
        label: 'Délimiter son champ d’intervention en matière de secours',
        indicators: [ind('C1a', 'Explique les limites de son intervention')],
      },
    ],
    conditions: ['L’indicateur acquis'],
  },
  {
    id: 'C6',
    epreuve: 2,
    short: 'Rôle dans la prévention',
    groups: [
      {
        label: 'Situer son rôle de SST dans l’organisation de la prévention de l’entreprise',
        indicators: [ind('C6a', 'Indique comment il peut contribuer concrètement à la prévention dans son entreprise')],
      },
    ],
    conditions: ['L’indicateur acquis'],
  },
  {
    id: 'C7',
    epreuve: 2,
    short: 'Caractériser les risques',
    groups: [
      {
        label: 'Caractériser des risques professionnels dans une situation de travail',
        indicators: [ind('C7a', 'À partir d’une situation dangereuse, détermine des risques et les autres dommages potentiels')],
      },
    ],
    conditions: ['L’indicateur acquis'],
  },
  {
    id: 'C8',
    epreuve: 2,
    short: 'Maîtriser les risques',
    groups: [
      {
        label: 'Participer à la maîtrise des risques professionnels par des actions de prévention',
        intro: 'À partir de la situation dangereuse ayant engendré le dommage dans la situation précédemment simulée :',
        indicators: [
          ind('C8a', 'supprime ou à défaut réduit les risques', true),
          ind('C8b', 'propose, si possible, des pistes d’amélioration'),
        ],
      },
    ],
    conditions: ['Au moins l’indicateur incontournable acquis'],
  },
];

export const COMPETENCE_ORDER: CompetenceId[] = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'];

export const COMPETENCE_LABELS: Record<CompetenceId, string> = {
  C1: 'Délimiter son champ d’intervention en matière de secours',
  C2: 'Identifier les dangers persistants, supprimer ou isoler le danger, soustraire la victime',
  C3: 'Rechercher les signes indiquant que la vie de la victime est menacée',
  C4: 'Garantir une alerte favorisant l’arrivée de secours adaptés',
  C5: 'Choisir et réaliser les actions, surveiller la victime',
  C6: 'Situer son rôle de SST dans l’organisation de la prévention',
  C7: 'Caractériser des risques professionnels dans une situation de travail',
  C8: 'Participer à la maîtrise des risques par des actions de prévention',
};

export const ALL_INDICATORS: IndicatorDef[] = COMPETENCES.flatMap((c) => c.groups.flatMap((g) => g.indicators));

export const INDICATOR_BY_ID: Record<IndicatorId, IndicatorDef> = Object.fromEntries(
  ALL_INDICATORS.map((i) => [i.id, i]),
) as Record<IndicatorId, IndicatorDef>;

export const EPREUVE1_INDICATORS = COMPETENCES.filter((c) => c.epreuve === 1).flatMap((c) =>
  c.groups.flatMap((g) => g.indicators.map((i) => i.id)),
);
export const EPREUVE2_INDICATORS = COMPETENCES.filter((c) => c.epreuve === 2).flatMap((c) =>
  c.groups.flatMap((g) => g.indicators.map((i) => i.id)),
);

export function competenceOf(indicator: IndicatorId): CompetenceId {
  return indicator.slice(0, 2) as CompetenceId;
}

export const THEMES: Record<QuestionTheme, string> = {
  cadre: 'Cadre du SST',
  prevention: 'Prévention',
  proteger: 'Protéger',
  examiner: 'Examiner',
  alerter: 'Faire alerter',
  secourir: 'Secourir',
};

export const PREVENTION_LABELS: Record<PreventionKey, string> = {
  danger: 'Danger',
  situation: 'Situation dangereuse',
  evenement: 'Événement dangereux',
  dommage: 'Dommage',
  eviter: 'Pour éviter l’accident',
  remonter: 'Information à remonter à',
};

/** Correspondance par défaut des éléments de prévention de la fiche avec la grille. */
export const DEFAULT_PREVENTION_INDICATORS: Record<PreventionKey, IndicatorId[]> = {
  danger: ['C7a'],
  situation: ['C7a'],
  evenement: ['C7a'],
  dommage: ['C7a'],
  eviter: ['C8a', 'C8b'],
  remonter: ['C6a'],
};

// ---------------------------------------------------------------- Règles

type Indicators = Partial<Record<IndicatorId, IndicatorValue>>;

function allKeyAcquired(values: IndicatorValue[]): CompetenceValue {
  if (values.some((v) => v === 'non_acquis')) return 'non_acquise';
  if (values.every((v) => v === 'acquis')) return 'acquise';
  return null;
}

function anyAcquired(values: IndicatorValue[]): CompetenceValue {
  if (values.some((v) => v === 'acquis')) return 'acquise';
  if (values.every((v) => v === 'non_acquis')) return 'non_acquise';
  return null;
}

function both(a: CompetenceValue, b: CompetenceValue): CompetenceValue {
  if (a === 'non_acquise' || b === 'non_acquise') return 'non_acquise';
  if (a === 'acquise' && b === 'acquise') return 'acquise';
  return null;
}

/** Applique les conditions d'acquisition officielles d'une compétence. */
export function computeCompetence(id: CompetenceId, ind: Indicators): CompetenceValue {
  const v = (i: IndicatorId) => ind[i] ?? null;
  switch (id) {
    case 'C2':
      return both(allKeyAcquired([v('C2a')]), anyAcquired([v('C2c'), v('C2d'), v('C2e')]));
    case 'C3':
      return allKeyAcquired([v('C3a')]);
    case 'C4':
      return allKeyAcquired([v('C4a')]);
    case 'C5':
      return allKeyAcquired([v('C5a'), v('C5c')]);
    case 'C1':
      return allKeyAcquired([v('C1a')]);
    case 'C6':
      return allKeyAcquired([v('C6a')]);
    case 'C7':
      return allKeyAcquired([v('C7a')]);
    case 'C8':
      return allKeyAcquired([v('C8a')]);
  }
}

export function computeAllCompetences(ind: Indicators): Record<CompetenceId, CompetenceValue> {
  return Object.fromEntries(COMPETENCE_ORDER.map((c) => [c, computeCompetence(c, ind)])) as Record<
    CompetenceId,
    CompetenceValue
  >;
}

/** 8 compétences acquises donnent la certification. */
export function computeCertified(comp: Partial<Record<CompetenceId, CompetenceValue>>): boolean | null {
  const values = COMPETENCE_ORDER.map((c) => comp[c] ?? null);
  if (values.some((v) => v === 'non_acquise')) return false;
  if (values.every((v) => v === 'acquise')) return true;
  return null;
}

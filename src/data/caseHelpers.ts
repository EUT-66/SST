import { DEFAULT_PREVENTION_INDICATORS, PREVENTION_LABELS } from '../lib/competences';
import type { CaseAction, IndicatorId, PracticalCase, PreventionItem, PreventionKey } from '../lib/types';

export const act = (text: string, ...indicators: IndicatorId[]): CaseAction => ({ text, indicators });

export function prevention(p: Record<PreventionKey, string>): PreventionItem[] {
  return (Object.keys(PREVENTION_LABELS) as PreventionKey[]).map((key) => ({
    key,
    label: PREVENTION_LABELS[key],
    answer: p[key],
    indicators: [...DEFAULT_PREVENTION_INDICATORS[key]],
  }));
}

type CaseInput = Omit<PracticalCase, 'prevention' | 'reviewed'> & {
  prevention: Record<PreventionKey, string>;
  reviewed?: boolean;
};

export function makeCase(c: CaseInput): PracticalCase {
  return { ...c, reviewed: c.reviewed ?? true, prevention: prevention(c.prevention) };
}

// Supports de cours générés pour chaque métier à partir des fiches de `specs/`.
import type { Course } from '../../lib/types';
import { buildTradeCourse, type TradeCourseSpec } from './tradeCourse';

const modules = import.meta.glob<{ spec: TradeCourseSpec }>('./specs/*.ts', { eager: true });

/** Ordre d'affichage des supports (après l'aide-mémoire et le cours MIT). */
const ORDER = ['MIS', 'CAR', 'MAC', 'PAR', 'ELEC', 'FCA', 'MEN', 'MET'];

export const TRADE_SPECS: TradeCourseSpec[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('mitReference.ts'))
  .map(([, m]) => m.spec)
  .sort((a, b) => (ORDER.indexOf(a.code) + 1 || 99) - (ORDER.indexOf(b.code) + 1 || 99) || a.code.localeCompare(b.code));

export const TRADE_COURSES: Course[] = TRADE_SPECS.map((s, i) => buildTradeCourse(s, 2 + i));

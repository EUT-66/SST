// Cas d'entraînement à la mise en pratique : réservés à l'entraînement, jamais tirés pour la
// certification, pour que les apprentis découvrent d'autres situations que celles de l'examen.
import type { PracticalCase } from '../../lib/types';

const modules = import.meta.glob<{ cases: PracticalCase[] }>('./*.ts', { eager: true });

export const TRAINING_CASES: PracticalCase[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith('index.ts') && !path.endsWith('.test.ts'))
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([, m]) => m.cases);

// Cas d'entraînement à la mise en pratique : réservés à l'entraînement, jamais tirés pour la
// certification, pour que les apprentis découvrent d'autres situations que celles de l'examen.
import type { PracticalCase } from '../../lib/types';

// le fichier de test est exclu du motif : sinon il serait embarqué dans l'application avec vitest
const modules = import.meta.glob<{ cases: PracticalCase[] }>(['./*.ts', '!./index.ts', '!./*.test.ts'], { eager: true });

export const TRAINING_CASES: PracticalCase[] = Object.entries(modules)
  .sort(([a], [b]) => a.localeCompare(b))
  .flatMap(([, m]) => m.cases);

import { describe, expect, it } from 'vitest';
import { formatFirstName, gridFileName, safeFileName, schoolYear, sessionGridsFileName, uniqueNames } from './gridFiles';

describe('noms des fichiers de grille', () => {
  it('calcule l’année scolaire, qui change au 1er septembre', () => {
    expect(schoolYear('2026-10-12')).toBe('2026-2027');
    expect(schoolYear('2027-06-30')).toBe('2026-2027');
    expect(schoolYear('2027-08-31')).toBe('2026-2027');
    expect(schoolYear('2027-09-01')).toBe('2027-2028');
    expect(schoolYear('', '2027-01-15')).toBe('2026-2027');
  });

  it('nomme la grille « Grille Evaluation SST 2026-2027 NOM Prénom »', () => {
    expect(gridFileName({ lastName: 'Benali', firstName: 'yanis' }, '2026-2027')).toBe('Grille Evaluation SST 2026-2027 BENALI Yanis.pdf');
    expect(gridFileName({ lastName: 'de la Tour', firstName: 'JEAN-MARC' }, '2026-2027')).toBe('Grille Evaluation SST 2026-2027 DE LA TOUR Jean-Marc.pdf');
    expect(gridFileName({ lastName: 'N’Diaye', firstName: 'Awa' }, '2026-2027')).toBe('Grille Evaluation SST 2026-2027 N’DIAYE Awa.pdf');
  });

  it('garde un prénom déjà bien écrit et retire les caractères interdits', () => {
    expect(formatFirstName('Marie-Ève')).toBe('Marie-Ève');
    expect(formatFirstName('éLODIE')).toBe('éLODIE');
    expect(formatFirstName('ÉLODIE')).toBe('Élodie');
    expect(safeFileName('SST 1/2 : "MIT" ')).toBe('SST 1 2 MIT');
    expect(sessionGridsFileName('SST MIT 1A', '2026-2027', 'zip')).toBe('Grilles Evaluation SST 2026-2027 SST MIT 1A.zip');
  });

  it('distingue les homonymes dans une archive', () => {
    expect(uniqueNames(['A.pdf', 'B.pdf', 'a.pdf'])).toEqual(['A.pdf', 'B.pdf', 'a (2).pdf']);
  });
});

import { readFileSync, writeFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import type { GridState } from '../types';
import { renderGridsPdf } from './gridPdf';

const fonts = ['Regular', 'Bold', 'Italic'].map((f) => readFileSync(`public/fonts/Carlito-${f}.ttf`)) as [Buffer, Buffer, Buffer];

const grid: GridState = {
  candidate: { lastName: 'DUPONT', firstName: 'Jean-Marc', birthDate: '2007-03-05' },
  session: { from: '2026-10-12', to: '2026-10-16' },
  indicators: { C2a: 'acquis', C2b: 'acquis', C2e: 'acquis', C3a: 'acquis', C3b: 'non_acquis', C4a: 'acquis', C5a: 'acquis', C5b: 'acquis', C5c: 'acquis', C1a: 'acquis', C6a: 'acquis', C7a: 'acquis', C8a: 'acquis', C8b: 'non_acquis' },
  competences: { C1: 'acquise', C2: 'acquise', C3: 'acquise', C4: 'acquise', C5: 'acquise', C6: 'acquise', C7: 'acquise', C8: 'acquise' },
  certified: true,
  trainer: { lastName: 'Martin', firstName: 'Élodie', signature: null },
  certificationDate: '2026-10-16',
};

describe('grille PDF', () => {
  it('produit 2 pages par candidat', async () => {
    const bytes = await renderGridsPdf([grid, { ...grid, certified: false }], { fontFiles: fonts });
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBe(4);
    if (process.env.GRID_PDF_OUT) writeFileSync(process.env.GRID_PDF_OUT, bytes);
  });
});

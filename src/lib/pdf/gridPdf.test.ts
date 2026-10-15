import { readFileSync, writeFileSync } from 'node:fs';
import { PDFDocument } from 'pdf-lib';
import { describe, expect, it } from 'vitest';
import type { GridState } from '../types';
import { renderGridsPdf } from './gridPdf';

const fontFiles = ['Regular', 'Bold', 'Italic'].map((f) => readFileSync(`public/fonts/Carlito-${f}.ttf`)) as [Buffer, Buffer, Buffer];
const templates = { initiale: readFileSync('public/grilles/grille-certification-sst-initiale.pdf') };

// petite signature PNG (1 x 1 px)
const signature =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

const grid: GridState = {
  candidate: { lastName: 'DUPONT', firstName: 'Jean-Marc', birthDate: '2007-03-05' },
  session: { from: '2026-10-12', to: '2026-10-16' },
  indicators: { C2a: 'acquis', C2b: 'acquis', C2e: 'acquis', C3a: 'acquis', C3b: 'non_acquis', C4a: 'acquis', C5a: 'acquis', C5b: 'acquis', C5c: 'acquis', C1a: 'acquis', C6a: 'acquis', C7a: 'acquis', C8a: 'acquis', C8b: 'non_acquis' },
  competences: { C1: 'acquise', C2: 'acquise', C3: 'acquise', C4: 'acquise', C5: 'acquise', C6: 'acquise', C7: 'acquise', C8: 'acquise' },
  certified: true,
  trainer: { lastName: 'Martin', firstName: 'Élodie', signature },
  certificationDate: '2026-10-16',
};

describe('grille PDF', () => {
  it('produit 2 pages par candidat sur le fond officiel, absents et MAC compris', async () => {
    const bytes = await renderGridsPdf(
      [
        { grid },
        { grid: { ...grid, certified: false }, formation: 'mac' },
        { grid: { ...grid, candidate: { ...grid.candidate, lastName: 'ABSENT-TEST' } }, absent: true },
      ],
      { fontFiles, templates },
    );
    const pdf = await PDFDocument.load(bytes);
    expect(pdf.getPageCount()).toBe(6);
    expect(pdf.getPage(0).getSize()).toEqual({ width: 595.32, height: 841.92 });
    // le fond n'est intégré qu'une fois pour toutes les grilles
    expect(bytes.length).toBeLessThan(400_000);
    if (process.env.GRID_PDF_OUT) writeFileSync(process.env.GRID_PDF_OUT, bytes);
  });
});

describe('textes des champs de la grille', () => {
  it('garde les lettres accentuées des noms étrangers et tronque un nom démesuré', async () => {
    const { createDoc } = await import('./kit');
    const { fitFieldText } = await import('./gridPdf');
    const { fonts } = await createDoc('test', fontFiles);
    const charset = new Set(fonts.bold.getCharacterSet());
    for (const ch of 'Şükrü Łukasz Ștefan Kılıç Nguyễn Dvořák Ćosić') {
      if (ch !== ' ') expect(charset.has(ch.codePointAt(0)!), ch).toBe(true);
    }
    expect(fitFieldText('Şükrü', fonts.bold, 200)).toEqual({ text: 'Şükrü', size: 11 });
    // caractère absent de la police : lettre de base plutôt qu'un blanc
    expect(fitFieldText('AഅB', fonts.bold, 200).text).toBe('A?B');
    const long = fitFieldText('W'.repeat(120), fonts.bold, 213);
    expect(long.text.endsWith('…')).toBe(true);
    expect(fonts.bold.widthOfTextAtSize(long.text, long.size)).toBeLessThanOrEqual(213);
  });
});

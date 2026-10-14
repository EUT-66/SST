// Grille de certification des compétences du SST – formation initiale (INRS, juin 2020),
// reproduite à l'identique et pré-remplie.
import type { PDFDocument, PDFImage } from 'pdf-lib';
import { COMPETENCES, COMPETENCE_ORDER, type CompetenceDef } from '../competences';
import { frDate } from '../format';
import type { GridState } from '../types';
import { A4, C, createDoc, embedDataUrl, Painter, type Fonts, type FontFiles } from './kit';

export interface GridPdfOptions {
  logoLeft?: string | null;
  logoRight?: string | null;
  fontFiles?: FontFiles;
}

const X0 = 29;
const X1 = 569.5;
const COL = { code: X0, comp: 50, ind: 207, acq: 406, nacq: 448, cond: 492, end: X1 };
const SIZE = 9.6;
const LH = 11.8;

interface Assets {
  logoLeft: PDFImage | null;
  logoRight: PDFImage | null;
}

function header(p: Painter, assets: Assets) {
  if (assets.logoLeft) p.image(assets.logoLeft, X0, 22, 110, 52, 'left');
  if (assets.logoRight) p.image(assets.logoRight, X1 - 64, 18, 64, 64, 'right');
  p.text('Grille de certification des compétences du SST', 0, 50, { font: p.fonts.bold, size: 15.5, color: C.green, align: 'center', width: A4.w });
  p.text('Formation initiale', 0, 74, { size: 12, color: C.green, align: 'center', width: A4.w });
}

function footer(p: Painter, page: number) {
  p.text(`Page ${page}/2`, X1 - 80, 790, { size: 9.5, align: 'right', width: 60 });
  const bold = 'INRS – Département formation';
  const rest = ' – 65, bd Richard Lenoir – 75011 Paris';
  const wb = p.fonts.bold.widthOfTextAtSize(bold, 8.5);
  const wr = p.fonts.regular.widthOfTextAtSize(rest, 8.5);
  const x = (A4.w - wb - wr) / 2;
  p.text(bold, x, 812, { font: p.fonts.bold, size: 8.5, color: C.brown });
  p.text(rest, x + wb, 812, { size: 8.5, color: C.brown });
  p.text('Juin 2020', 0, 824, { font: p.fonts.italic, size: 8.5, color: C.brown, align: 'center', width: A4.w });
}

function footnote(p: Painter, top: number, text: string, highlighted?: string) {
  const w = p.text(text, X0 + 12, top, { font: p.fonts.italic, size: 9 });
  if (highlighted) p.text(highlighted, X0 + 12 + w, top, { font: p.fonts.italic, size: 9, highlight: true });
}

/** Tableau d'une épreuve ; renvoie l'ordonnée de fin. */
function epreuveTable(p: Painter, top: number, title: string, comps: CompetenceDef[], grid: GridState): number {
  const f = p.fonts;
  // Bandeau de l'épreuve
  const titleH = p.measure(title, X1 - X0 - 12, { font: f.bold, size: 9.4, lineHeight: 11.4 }) + 6;
  p.paragraph(title, X0 + 6, top + 3, X1 - X0 - 12, { font: f.bold, size: 9.4, lineHeight: 11.4, color: C.greenText, align: 'center' });
  let y = top + titleH;
  // En-têtes de colonnes
  const headH = 27;
  const headTexts: [number, number, string][] = [
    [COL.comp, COL.ind, 'Compétences'],
    [COL.ind, COL.acq, 'INDICATEURS DE REUSSITE'],
    [COL.acq, COL.nacq, 'Acquis'],
    [COL.nacq, COL.cond, 'Non\nacquis'],
    [COL.cond, COL.end, 'Conditions\nd’acquisition'],
  ];
  for (const [a, b, t] of headTexts) {
    const lines = t.split('\n');
    lines.forEach((l, i) =>
      p.text(l, a, y + (headH - lines.length * 11) / 2 + i * 11, { font: f.bold, size: 9.4, color: C.greenText, align: 'center', width: b - a }),
    );
  }
  p.line(X0, y, X1, y, 0.8);
  y += headH;
  p.line(X0, y, X1, y, 0.8);

  for (const comp of comps) {
    const compTop = y;
    const merged = comp.conditions.length !== comp.groups.length;
    const groupTops: number[] = [];
    for (const [gi, g] of comp.groups.entries()) {
      groupTops.push(y);
      const labelH = p.measure(g.label, COL.ind - COL.comp - 8, { size: SIZE, lineHeight: LH }) + 8;
      let indH = 4;
      if (g.intro) indH += p.measure(g.intro, COL.acq - COL.ind - 8, { size: SIZE, lineHeight: LH }) + 6;
      const rows = g.indicators.map((i) => {
        const prefix = comp.id === 'C8' ? 18 : 0;
        const h = Math.max(22, p.measure(i.text, COL.acq - COL.ind - 8 - prefix, { size: SIZE, lineHeight: LH }) + 9);
        indH += h;
        return h;
      });
      indH += 2;
      const condH = merged ? 0 : p.measure(comp.conditions[gi] ?? '', COL.end - COL.cond - 8, { size: SIZE, lineHeight: LH }) + 8;
      const h = Math.max(labelH, indH, condH, 30);

      // Libellé de la compétence (centré verticalement)
      const lh = labelH - 8;
      p.paragraph(g.label, COL.comp + 4, y + (h - lh) / 2, COL.ind - COL.comp - 8, { size: SIZE, lineHeight: LH });

      // Indicateurs et cases
      let iy = y + (h - indH) / 2 + 4;
      if (g.intro) {
        iy += p.paragraph(g.intro, COL.ind + 4, iy, COL.acq - COL.ind - 8, { size: SIZE, lineHeight: LH }) + 6;
      }
      g.indicators.forEach((ind, k) => {
        const rh = rows[k];
        const prefix = comp.id === 'C8' ? 18 : 0;
        const textH = p.measure(ind.text, COL.acq - COL.ind - 8 - prefix, { size: SIZE, lineHeight: LH });
        const ty = iy + (rh - textH) / 2;
        if (prefix) p.text('-', COL.ind + 6, ty, { size: SIZE, highlight: ind.key });
        p.paragraph(ind.text, COL.ind + 4 + prefix, ty, COL.acq - COL.ind - 8 - prefix, { size: SIZE, lineHeight: LH, highlight: ind.key });
        const v = grid.indicators[ind.id] ?? null;
        const box = 11.5;
        p.checkbox(COL.acq + (COL.nacq - COL.acq - box) / 2, iy + (rh - box) / 2, box, v === 'acquis');
        p.checkbox(COL.nacq + (COL.cond - COL.nacq - box) / 2, iy + (rh - box) / 2, box, v === 'non_acquis');
        iy += rh;
      });

      // Conditions propres au groupe
      if (!merged) {
        const ch = condH - 8;
        p.paragraph(comp.conditions[gi], COL.cond + 4, y + (h - ch) / 2, COL.end - COL.cond - 8, { size: SIZE, lineHeight: LH });
      }
      y += h;
      if (gi < comp.groups.length - 1) p.line(COL.comp, y, merged ? COL.cond : X1, y, 0.8);
    }
    // Conditions fusionnées (ex. C5)
    if (merged) {
      const ch = p.measure(comp.conditions[0], COL.end - COL.cond - 8, { size: SIZE, lineHeight: LH });
      p.paragraph(comp.conditions[0], COL.cond + 4, compTop + (y - compTop - ch) / 2, COL.end - COL.cond - 8, { size: SIZE, lineHeight: LH });
    }
    // Code de la compétence
    p.text(comp.id, COL.code, compTop + (y - compTop - SIZE) / 2, { font: f.bold, size: SIZE, align: 'center', width: COL.comp - COL.code });
    p.line(X0, y, X1, y, 0.8);
  }
  // Colonnes et cadre
  const headTop = top + titleH;
  for (const x of [COL.comp, COL.ind, COL.acq, COL.nacq, COL.cond]) p.line(x, headTop, x, y, 0.8);
  p.rect(X0, top, X1 - X0, y - top, { border: 1.6 });
  return y;
}

function labelValue(p: Painter, label: string, value: string, x: number, top: number, opts: { green?: boolean } = {}) {
  const w = p.text(label, x, top, { font: opts.green ? p.fonts.bold : p.fonts.regular, size: 10.5, color: opts.green ? C.greenText : C.ink });
  if (value) p.text(value, x + w + 6, top - 0.5, { font: p.fonts.bold, size: 11, color: C.filled });
}

function pageOne(doc: PDFDocument, fonts: Fonts, grid: GridState, assets: Assets) {
  const p = new Painter(doc.addPage([A4.w, A4.h]), fonts);
  header(p, assets);
  // Cadre candidat / session
  const top = 104;
  const h = 82;
  const mid = 299;
  p.rect(X0, top, X1 - X0, h, { border: 1.6 });
  p.line(mid, top, mid, top + h, 0.8);
  p.text('Candidat :', X0 + 4, top + 5, { font: fonts.bold, size: 10.5, color: C.greenText, underline: true });
  labelValue(p, 'Nom :', grid.candidate.lastName, X0 + 4, top + 32);
  labelValue(p, 'Prénom :', grid.candidate.firstName, X0 + 4, top + 47);
  labelValue(p, 'Date de naissance :', frDate(grid.candidate.birthDate), X0 + 4, top + 62);
  p.text('Session :', mid + 5, top + 5, { font: fonts.bold, size: 10.5, color: C.greenText, underline: true });
  labelValue(p, 'Du :', frDate(grid.session.from), mid + 5, top + 32);
  labelValue(p, 'Au :', frDate(grid.session.to), mid + 5, top + 47);

  const end = epreuveTable(
    p,
    top + h + 14,
    'EPREUVE 1 : Lors d’une mise en situation d’accident du travail simulée (action / analyse), le candidat devra montrer sa capacité à mettre en œuvre l’intégralité des compétences lui permettant d’intervenir efficacement',
    COMPETENCES.filter((c) => c.epreuve === 1),
    grid,
  );
  footnote(p, end + 4, 'Les critères de réussite incontournables sont surlignés en jaune : ', 'exemple');
  footer(p, 1);
}

async function pageTwo(doc: PDFDocument, fonts: Fonts, grid: GridState, assets: Assets) {
  const p = new Painter(doc.addPage([A4.w, A4.h]), fonts);
  header(p, assets);
  const end = epreuveTable(
    p,
    104,
    'EPREUVE 2 : Lors d’un entretien avec le formateur, le candidat devra répondre à un questionnement simple portant sur sa connaissance du cadre réglementaire de l’activité SST et ses compétences en matière de prévention',
    COMPETENCES.filter((c) => c.epreuve === 2),
    grid,
  );
  footnote(p, end + 4, 'Les critères de réussite incontournables sont surlignés en jaune : ', 'exemple');

  // Cadre formateur / résultat
  const top = Math.max(end + 40, 470);
  const mid = 262;
  const rowH = 17;
  const compH = 8 + rowH * 8 + 4;
  const h = compH + 58;
  p.rect(X0, top, X1 - X0, h, { border: 1.6 });
  p.line(mid, top, mid, top + h, 0.8);
  p.line(X0, top + compH, X1, top + compH, 0.8);

  p.text('Formateur / évaluateur :', X0 + 4, top + 6, { font: fonts.bold, size: 10.5, color: C.greenText, underline: true });
  labelValue(p, 'NOM :', grid.trainer.lastName.toLocaleUpperCase('fr-FR'), X0 + 4, top + 34, { green: true });
  labelValue(p, 'Prénom :', grid.trainer.firstName, X0 + 4, top + 61, { green: true });
  p.text('Signature :', X0 + 4, top + 88, { font: fonts.bold, size: 10.5, color: C.greenText });
  const sig = await embedDataUrl(doc, grid.trainer.signature);
  if (sig) p.image(sig, X0 + 62, top + 84, mid - X0 - 72, compH - 92, 'left');

  COMPETENCE_ORDER.forEach((c, i) => {
    const ry = top + 8 + i * rowH;
    const v = grid.competences[c] ?? null;
    p.text(`Compétence ${c.slice(1)} :`, mid + 8, ry, { font: fonts.bold, size: 10, color: C.greenText });
    p.checkbox(367, ry + 0.5, 9.5, v === 'acquise');
    p.text('Acquise', 383, ry, { font: fonts.bold, size: 10, color: C.greenText });
    p.checkbox(445, ry + 0.5, 9.5, v === 'non_acquise');
    p.text('Non acquise', 461, ry, { font: fonts.bold, size: 10, color: C.greenText });
  });

  const by = top + compH;
  p.text('Date de certification :', X0 + 4, by + 6, { font: fonts.bold, size: 10.5, color: C.greenText, underline: true });
  if (grid.certificationDate) p.text(frDate(grid.certificationDate), X0 + 4, by + 30, { font: fonts.bold, size: 11, color: C.filled });
  p.text('Résultat :', mid + 8, by + 6, { font: fonts.bold, size: 10.5, color: C.greenText, underline: true });
  p.text('Candidat certifié', mid + 8, by + 34, { font: fonts.bold, size: 10, color: C.greenText });
  p.checkbox(367, by + 34.5, 9.5, grid.certified === true);
  p.text('OUI*', 383, by + 34, { font: fonts.bold, size: 10, color: C.greenText });
  p.checkbox(445, by + 34.5, 9.5, grid.certified === false);
  p.text('NON', 461, by + 34, { font: fonts.bold, size: 10, color: C.greenText });

  footnote(p, top + h + 4, '* : 8 compétences acquises donnent la certification');
  footer(p, 2);
}

/** Génère un PDF contenant une grille (2 pages) par candidat. */
export async function renderGridsPdf(grids: GridState[], options: GridPdfOptions = {}): Promise<Uint8Array> {
  const title = grids.length === 1 ? `Grille de certification SST – ${grids[0].candidate.lastName} ${grids[0].candidate.firstName}` : 'Grilles de certification SST';
  const { doc, fonts } = await createDoc(title, options.fontFiles);
  const assets: Assets = { logoLeft: await embedDataUrl(doc, options.logoLeft), logoRight: await embedDataUrl(doc, options.logoRight) };
  for (const g of grids) {
    pageOne(doc, fonts, g, assets);
    await pageTwo(doc, fonts, g, assets);
  }
  return doc.save();
}

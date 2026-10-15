// Grille de certification des compétences du SST (INRS) : le PDF officiel sert de fond de page
// (logos, tableaux et textes à l'identique) et les informations sont écrites aux emplacements
// exacts des champs du formulaire d'origine, avec le même rendu que dans Acrobat.
import { degrees, rgb, type PDFDocument, type PDFEmbeddedPage, type PDFFont, type PDFImage, type PDFPage } from 'pdf-lib';
import { COMPETENCE_ORDER } from '../competences';
import { frDate } from '../format';
import type { CompetenceId, FormationType, GridState, IndicatorId } from '../types';
import { A4, createDoc, embedDataUrl, printable, type FontFiles, type Fonts } from './kit';

export interface GridPdfItem {
  grid: GridState;
  /** Formation initiale par défaut. */
  formation?: FormationType;
  /** Apprenti absent : grille sans cases cochées, barrée de la mention « ABSENT ». */
  absent?: boolean;
}

export interface GridPdfOptions {
  fontFiles?: FontFiles;
  /** Fonds de grille déjà chargés (tests) ; sinon lus dans /grilles. */
  templates?: Partial<Record<FormationType, ArrayBuffer | Uint8Array>>;
}

/**
 * Fonds de grille (PDF de l'INRS préparés par scripts/preparer-grille.py).
 * Sans grille MAC officielle, la grille de formation initiale est utilisée avec le sous-titre MAC.
 */
const TEMPLATE_FILES: Record<FormationType, string | null> = {
  initiale: '/grilles/grille-certification-sst-initiale.pdf',
  mac: null,
};

const BLACK = rgb(0, 0, 0);
const WHITE = rgb(1, 1, 1);
const SUBTITLE_GREEN = rgb(0.149, 0.588, 0.376);
const ABSENT_BLUE = rgb(0.04, 0.33, 0.86);

// Coordonnées PDF (origine en bas à gauche), relevées sur les champs du formulaire officiel.
type Point = [number, number];

/** Cases « Acquis / Non acquis » des indicateurs (champs « Check Box 1 » à « Check Box 34 »). */
const INDICATOR_BOXES: Record<IndicatorId, { page: 0 | 1; acquis: Point; nonAcquis: Point }> = {
  C2a: { page: 0, acquis: [418.53, 535.95], nonAcquis: [460.94, 536.16] },
  C2b: { page: 0, acquis: [418.52, 493.4], nonAcquis: [460.83, 493.46] },
  C2c: { page: 0, acquis: [418.58, 459.01], nonAcquis: [460.89, 459.07] },
  C2d: { page: 0, acquis: [418.47, 432.81], nonAcquis: [460.78, 432.42] },
  C2e: { page: 0, acquis: [418.36, 405.27], nonAcquis: [461.12, 405.32] },
  C3a: { page: 0, acquis: [418.76, 372.17], nonAcquis: [461.07, 372.67] },
  C3b: { page: 0, acquis: [418.66, 337.05], nonAcquis: [460.97, 337.1] },
  C4a: { page: 0, acquis: [418.55, 304.16], nonAcquis: [460.86, 304.21] },
  C4b: { page: 0, acquis: [418.64, 275.97], nonAcquis: [461.0, 275.53] },
  C5a: { page: 0, acquis: [418.47, 245.87], nonAcquis: [460.78, 245.48] },
  C5b: { page: 0, acquis: [418.36, 203.17], nonAcquis: [461.12, 203.22] },
  C5c: { page: 0, acquis: [418.7, 139.5], nonAcquis: [461.01, 139.56] },
  C1a: { page: 1, acquis: [418.52, 637.3], nonAcquis: [460.83, 636.91] },
  C6a: { page: 1, acquis: [418.42, 595.49], nonAcquis: [460.73, 595.54] },
  C7a: { page: 1, acquis: [418.76, 551.42], nonAcquis: [461.07, 551.47] },
  C8a: { page: 1, acquis: [418.42, 465.87], nonAcquis: [461.17, 465.92] },
  C8b: { page: 1, acquis: [418.31, 423.61], nonAcquis: [460.62, 423.22] },
};
const BOX = 14.17;

/** Cases « Acquise / Non acquise » des compétences et du résultat (page 2). */
const COMPETENCE_Y: Record<CompetenceId, number> = {
  C1: 351.84,
  C2: 334.92,
  C3: 318.0,
  C4: 301.08,
  C5: 284.16,
  C6: 267.24,
  C7: 250.32,
  C8: 233.52,
};
const RESULT_Y = 186.96;
const ACQUISE_X = 359.76;
const NON_ACQUISE_X = 437.76;

/** Champs texte : début du champ, ligne de base des libellés voisins, fin du champ. */
interface TextField {
  page: 0 | 1;
  x: number;
  baseline: number;
  right: number;
}
const FIELDS = {
  lastName: { page: 0, x: 77.76, baseline: 676.08, right: 295.04 },
  firstName: { page: 0, x: 77.53, baseline: 660.6, right: 294.82 },
  birthDate: { page: 0, x: 123.02, baseline: 645.25, right: 294.38 },
  from: { page: 0, x: 322.8, baseline: 676.08, right: 504.41 },
  to: { page: 0, x: 323.25, baseline: 660.6, right: 504.86 },
  trainerLastName: { page: 1, x: 62.26, baseline: 325.2, right: 259.93 },
  trainerFirstName: { page: 1, x: 72.74, baseline: 297.11, right: 260.15 },
  certificationDate: { page: 1, x: 33.28, baseline: 203.0, right: 218.45 },
} satisfies Record<string, TextField>;

/** Emplacement de la signature, à droite du libellé « Signature : » (page 2). */
const SIGNATURE_AREA = { x: 88, y: 232, width: 168, height: 56 };

// ------------------------------------------------------------------ Fonds de grille

const templateCache = new Map<string, Promise<ArrayBuffer>>();

function fetchTemplate(path: string): Promise<ArrayBuffer> {
  let p = templateCache.get(path);
  if (!p) {
    p = fetch(path).then((r) => {
      if (!r.ok) throw new Error('Grille officielle introuvable : rechargez la page puis réessayez.');
      return r.arrayBuffer();
    });
    p.catch(() => templateCache.delete(path));
    templateCache.set(path, p);
  }
  return p;
}

interface Background {
  pages: [PDFEmbeddedPage, PDFEmbeddedPage];
  /** Sous-titre « Formation initiale » à remplacer par celui du MAC. */
  macSubtitle: boolean;
}

async function loadBackgrounds(doc: PDFDocument, formations: Set<FormationType>, options: GridPdfOptions) {
  const embedded = new Map<FormationType, [PDFEmbeddedPage, PDFEmbeddedPage]>();
  const embed = async (source: FormationType) => {
    let pages = embedded.get(source);
    if (!pages) {
      const bytes = options.templates?.[source] ?? (await fetchTemplate(TEMPLATE_FILES[source]!));
      const [p1, p2] = await doc.embedPdf(bytes, [0, 1]);
      pages = [p1, p2];
      embedded.set(source, pages);
    }
    return pages;
  };
  const out = new Map<FormationType, Background>();
  for (const f of formations) {
    const own = TEMPLATE_FILES[f] !== null || options.templates?.[f] !== undefined;
    out.set(f, { pages: await embed(own ? f : 'initiale'), macSubtitle: f === 'mac' && !own });
  }
  return out;
}

// ------------------------------------------------------------------ Dessin

/** Case d'indicateur, comme l'apparence du champ d'origine (cadre blanc, croix fine). */
function indicatorBox(page: PDFPage, [x, y]: Point, checked: boolean) {
  page.drawRectangle({ x: x + 0.5, y: y + 0.5, width: BOX - 1, height: BOX - 1, color: WHITE, borderColor: BLACK, borderWidth: 1 });
  if (!checked) return;
  page.drawLine({ start: { x: x + 2, y: y + BOX - 2 }, end: { x: x + BOX - 2, y: y + 2 }, thickness: 1, color: BLACK });
  page.drawLine({ start: { x: x + BOX - 2, y: y + BOX - 2 }, end: { x: x + 2, y: y + 2 }, thickness: 1, color: BLACK });
}

/** Case de compétence ou de résultat cochée (apparence « On » du champ d'origine). */
function competenceMark(page: PDFPage, x: number, y: number) {
  page.drawRectangle({ x: x + 2.16, y: y + 1.68, width: 6.72, height: 3.96, color: BLACK });
}

/** Texte d'un champ, en Calibri gras 11 comme le formulaire ; réduit, puis tronqué, s'il est trop long. */
export function fitFieldText(value: string, font: PDFFont, maxWidth: number): { text: string; size: number } {
  let text = printable(font, value.replace(/\s+/g, ' ').trim());
  let size = 11;
  while (size > 7 && font.widthOfTextAtSize(text, size) > maxWidth) size -= 0.5;
  if (font.widthOfTextAtSize(text, size) > maxWidth) {
    while (text.length > 1 && font.widthOfTextAtSize(`${text}…`, size) > maxWidth) text = text.slice(0, -1).trimEnd();
    text = `${text}…`;
  }
  return { text, size };
}

function fieldText(page: PDFPage, field: TextField, value: string, font: PDFFont) {
  if (!value.trim()) return;
  const { text, size } = fitFieldText(value, font, field.right - field.x - 4);
  page.drawText(text, { x: field.x + 2, y: field.baseline, size, font, color: BLACK });
}

function macSubtitle(page: PDFPage, fonts: Fonts) {
  // « Formation initiale » et son ombre portée
  page.drawRectangle({ x: 240, y: 737.5, width: 132, height: 28, color: WHITE });
  const text = 'Maintien et actualisation des compétences';
  const size = 14.04;
  const x = 301.35 - fonts.regular.widthOfTextAtSize(text, size) / 2;
  page.drawText(text, { x: x + 1, y: 751.64, size, font: fonts.regular, color: BLACK, opacity: 0.2 });
  page.drawText(text, { x, y: 752.64, size, font: fonts.regular, color: SUBTITLE_GREEN });
}

/** Mention « ABSENT » en diagonale, centrée sur la page. */
function absentStamp(page: PDFPage, font: PDFFont) {
  const text = 'ABSENT';
  const angle = Math.atan2(A4.h, A4.w);
  const size = (Math.hypot(A4.w, A4.h) * 0.62) / font.widthOfTextAtSize(text, 1);
  const w = font.widthOfTextAtSize(text, size);
  const capHeight = size * 0.644;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  page.drawText(text, {
    x: A4.w / 2 - (w / 2) * cos + (capHeight / 2) * sin,
    y: A4.h / 2 - (w / 2) * sin - (capHeight / 2) * cos,
    size,
    font,
    color: ABSENT_BLUE,
    opacity: 0.85,
    rotate: degrees((angle * 180) / Math.PI),
  });
}

async function drawGrid(doc: PDFDocument, fonts: Fonts, bg: Background, item: GridPdfItem, signature: PDFImage | null) {
  const { grid, absent } = item;
  const pages = bg.pages.map((p) => {
    const page = doc.addPage([A4.w, A4.h]);
    page.drawPage(p, { x: 0, y: 0, width: A4.w, height: A4.h });
    if (bg.macSubtitle) macSubtitle(page, fonts);
    return page;
  });
  const text = (f: TextField, v: string) => fieldText(pages[f.page], f, v, fonts.bold);

  text(FIELDS.lastName, grid.candidate.lastName);
  text(FIELDS.firstName, grid.candidate.firstName);
  text(FIELDS.birthDate, frDate(grid.candidate.birthDate));
  text(FIELDS.from, frDate(grid.session.from));
  text(FIELDS.to, frDate(grid.session.to));
  text(FIELDS.trainerLastName, grid.trainer.lastName.toLocaleUpperCase('fr-FR'));
  text(FIELDS.trainerFirstName, grid.trainer.firstName);
  if (!absent) text(FIELDS.certificationDate, frDate(grid.certificationDate));

  for (const [id, box] of Object.entries(INDICATOR_BOXES) as [IndicatorId, (typeof INDICATOR_BOXES)[IndicatorId]][]) {
    const v = absent ? null : (grid.indicators[id] ?? null);
    indicatorBox(pages[box.page], box.acquis, v === 'acquis');
    indicatorBox(pages[box.page], box.nonAcquis, v === 'non_acquis');
  }
  if (!absent) {
    for (const c of COMPETENCE_ORDER) {
      const v = grid.competences[c] ?? null;
      if (v === 'acquise') competenceMark(pages[1], ACQUISE_X, COMPETENCE_Y[c]);
      if (v === 'non_acquise') competenceMark(pages[1], NON_ACQUISE_X, COMPETENCE_Y[c]);
    }
    if (grid.certified === true) competenceMark(pages[1], ACQUISE_X, RESULT_Y);
    if (grid.certified === false) competenceMark(pages[1], NON_ACQUISE_X, RESULT_Y);
  }

  if (signature) {
    const a = SIGNATURE_AREA;
    const scale = Math.min(a.width / signature.width, a.height / signature.height, 1);
    const w = signature.width * scale;
    const h = signature.height * scale;
    pages[1].drawImage(signature, { x: a.x, y: a.y + (a.height - h) / 2, width: w, height: h });
  }

  if (absent) pages.forEach((p) => absentStamp(p, fonts.bold));
}

/** Génère un PDF contenant une grille (2 pages) par candidat. */
export async function renderGridsPdf(items: GridPdfItem[], options: GridPdfOptions = {}): Promise<Uint8Array> {
  const first = items[0]?.grid.candidate;
  const title = items.length === 1 && first ? `Grille de certification SST – ${first.lastName} ${first.firstName}` : 'Grilles de certification SST';
  const { doc, fonts } = await createDoc(title, options.fontFiles);
  const backgrounds = await loadBackgrounds(doc, new Set(items.map((i) => i.formation ?? 'initiale')), options);
  // une signature n'est intégrée qu'une fois, même répétée sur toutes les grilles d'une session
  const signatures = new Map<string, Promise<PDFImage | null>>();
  for (const item of items) {
    const url = item.grid.trainer.signature;
    if (url && !signatures.has(url)) signatures.set(url, embedDataUrl(doc, url));
    const signature = url ? await signatures.get(url)! : null;
    await drawGrid(doc, fonts, backgrounds.get(item.formation ?? 'initiale')!, item, signature);
  }
  return doc.save();
}

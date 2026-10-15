// Petite boîte à outils de mise en page au-dessus de pdf-lib (coordonnées depuis le haut de la page).
import fontkit from '@pdf-lib/fontkit';
import { PDFDocument, rgb, type PDFFont, type PDFImage, type PDFPage, type RGB } from 'pdf-lib';

export interface Fonts {
  regular: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
}

// Les ligatures (« ti », « fi »…) de Carlito s'affichent mal dans certains lecteurs PDF.
const NO_LIGATURES = { liga: false, clig: false, dlig: false, calt: false, rlig: false };

// Polices Carlito (métriques de Calibri, licence OFL) réduites aux caractères latins.
let fontCache: Promise<[ArrayBuffer, ArrayBuffer, ArrayBuffer]> | null = null;

function loadFontFiles() {
  if (!fontCache) {
    const get = (f: string) =>
      fetch(`/fonts/${f}`).then((r) => {
        if (!r.ok) throw new Error(`Police ${f} introuvable`);
        return r.arrayBuffer();
      });
    fontCache = Promise.all([get('Carlito-Regular.ttf'), get('Carlito-Bold.ttf'), get('Carlito-Italic.ttf')]);
    fontCache.catch(() => (fontCache = null));
  }
  return fontCache;
}

export type FontFiles = [ArrayBuffer | Uint8Array, ArrayBuffer | Uint8Array, ArrayBuffer | Uint8Array];

export async function createDoc(title: string, fontFiles?: FontFiles): Promise<{ doc: PDFDocument; fonts: Fonts }> {
  const doc = await PDFDocument.create();
  doc.registerFontkit(fontkit);
  doc.setTitle(title);
  doc.setCreator('Mon espace SST');
  doc.setProducer('Mon espace SST');
  const [r, b, i] = fontFiles ?? (await loadFontFiles());
  const fonts = {
    regular: await doc.embedFont(r, { subset: false, features: NO_LIGATURES }),
    bold: await doc.embedFont(b, { subset: false, features: NO_LIGATURES }),
    italic: await doc.embedFont(i, { subset: false, features: NO_LIGATURES }),
  };
  return { doc, fonts };
}

export const A4 = { w: 595.32, h: 841.92 };

export const C = {
  black: rgb(0, 0, 0),
  ink: rgb(0.1, 0.1, 0.12),
  green: rgb(0.13, 0.62, 0.31),
  greenText: rgb(0.0, 0.6, 0.3),
  yellow: rgb(1, 1, 0),
  brown: rgb(0.75, 0.38, 0.16),
  filled: rgb(0.05, 0.16, 0.45),
  grey: rgb(0.45, 0.45, 0.45),
  white: rgb(1, 1, 1),
};

// Lettres sans décomposition Unicode : remplacées par leur lettre de base si la police ne les a pas.
const BASE_LETTERS: Record<string, string> = { ł: 'l', Ł: 'L', ı: 'i', đ: 'd', Đ: 'D', ø: 'o', Ø: 'O', ħ: 'h', Ħ: 'H', ŧ: 't', Ŧ: 'T', ß: 'ss', æ: 'ae', Æ: 'AE', œ: 'oe', Œ: 'OE' };
const charsets = new WeakMap<PDFFont, Set<number>>();

/**
 * Texte que la police sait afficher : une lettre absente de la police (alphabet rare) est
 * remplacée par sa lettre de base plutôt que de disparaître du document.
 */
export function printable(font: PDFFont, text: string): string {
  let set = charsets.get(font);
  if (!set) {
    set = new Set(font.getCharacterSet());
    charsets.set(font, set);
  }
  const has = (c: string) => [...c].every((ch) => set!.has(ch.codePointAt(0)!));
  let out = '';
  for (const ch of text.normalize('NFC')) {
    if (has(ch) || ch === '\n') out += ch;
    else {
      const base = ch.normalize('NFD').replace(/\p{M}/gu, '');
      if (base && has(base)) out += base;
      else if (BASE_LETTERS[ch] && has(BASE_LETTERS[ch])) out += BASE_LETTERS[ch];
      else if (/\s/.test(ch)) out += ' ';
      else out += '?';
    }
  }
  return out;
}

/** Découpe un texte en lignes tenant dans `maxWidth`. */
export function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const out: string[] = [];
  for (const paragraph of printable(font, text).split('\n')) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = '';
    for (const w of words) {
      const candidate = line ? `${line} ${w}` : w;
      if (font.widthOfTextAtSize(candidate, size) <= maxWidth || !line) line = candidate;
      else {
        out.push(line);
        line = w;
      }
    }
    out.push(line);
  }
  return out;
}

export class Painter {
  constructor(public page: PDFPage, public fonts: Fonts) {}

  y(top: number) {
    return this.page.getHeight() - top;
  }

  text(
    s: string,
    x: number,
    top: number,
    opts: { font?: PDFFont; size?: number; color?: RGB; align?: 'left' | 'center' | 'right'; width?: number; underline?: boolean; highlight?: boolean } = {},
  ) {
    const font = opts.font ?? this.fonts.regular;
    const size = opts.size ?? 10;
    s = printable(font, s);
    const w = font.widthOfTextAtSize(s, size);
    let dx = x;
    if (opts.align === 'center' && opts.width) dx = x + (opts.width - w) / 2;
    if (opts.align === 'right' && opts.width) dx = x + opts.width - w;
    const baseline = this.y(top + size * 0.82);
    if (opts.highlight) this.page.drawRectangle({ x: dx - 0.5, y: baseline - size * 0.22, width: w + 1, height: size * 1.12, color: C.yellow });
    this.page.drawText(s, { x: dx, y: baseline, size, font, color: opts.color ?? C.ink });
    if (opts.underline) this.page.drawLine({ start: { x: dx, y: baseline - 1.4 }, end: { x: dx + w, y: baseline - 1.4 }, thickness: 0.7, color: opts.color ?? C.ink });
    return w;
  }

  /** Texte multiligne ; renvoie la hauteur occupée. */
  paragraph(
    s: string,
    x: number,
    top: number,
    width: number,
    opts: { font?: PDFFont; size?: number; color?: RGB; align?: 'left' | 'center'; lineHeight?: number; highlight?: boolean } = {},
  ): number {
    const font = opts.font ?? this.fonts.regular;
    const size = opts.size ?? 10;
    const lh = opts.lineHeight ?? size * 1.22;
    const lines = wrap(s, font, size, width);
    lines.forEach((l, i) => this.text(l, x, top + i * lh, { font, size, color: opts.color, align: opts.align, width, highlight: opts.highlight }));
    return lines.length * lh;
  }

  measure(s: string, width: number, opts: { font?: PDFFont; size?: number; lineHeight?: number } = {}): number {
    const font = opts.font ?? this.fonts.regular;
    const size = opts.size ?? 10;
    return wrap(s, font, size, width).length * (opts.lineHeight ?? size * 1.22);
  }

  rect(x: number, top: number, w: number, h: number, opts: { border?: number; color?: RGB; fill?: RGB } = {}) {
    this.page.drawRectangle({
      x,
      y: this.y(top + h),
      width: w,
      height: h,
      borderWidth: opts.border ?? 0.8,
      borderColor: opts.border === 0 ? undefined : (opts.color ?? C.black),
      color: opts.fill,
    });
  }

  line(x1: number, top1: number, x2: number, top2: number, thickness = 0.8, color = C.black) {
    this.page.drawLine({ start: { x: x1, y: this.y(top1) }, end: { x: x2, y: this.y(top2) }, thickness, color });
  }

  /** Case à cocher ; cochée = croix. */
  checkbox(x: number, top: number, size: number, checked: boolean, color = C.black) {
    this.rect(x, top, size, size, { border: 0.8, color });
    if (checked) {
      const p = size * 0.2;
      this.line(x + p, top + p, x + size - p, top + size - p, 1.6, C.filled);
      this.line(x + size - p, top + p, x + p, top + size - p, 1.6, C.filled);
    }
  }

  image(img: PDFImage, x: number, top: number, maxW: number, maxH: number, align: 'left' | 'center' | 'right' = 'left') {
    const scale = Math.min(maxW / img.width, maxH / img.height, 1.5);
    const w = img.width * scale;
    const h = img.height * scale;
    const dx = align === 'center' ? x + (maxW - w) / 2 : align === 'right' ? x + maxW - w : x;
    this.page.drawImage(img, { x: dx, y: this.y(top + (maxH + h) / 2), width: w, height: h });
  }
}

export async function embedDataUrl(doc: PDFDocument, dataUrl?: string | null): Promise<PDFImage | null> {
  if (!dataUrl) return null;
  try {
    const bytes = Uint8Array.from(atob(dataUrl.split(',')[1] ?? ''), (c) => c.charCodeAt(0));
    return dataUrl.startsWith('data:image/png') ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
  } catch {
    return null;
  }
}

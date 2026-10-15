// Préparation d'une signature importée (photo ou scan) : fond retiré, recadrage, taille réduite.

/** Taille maximale de la signature enregistrée (pixels). */
export const SIGNATURE_MAX = { width: 600, height: 240 };

const luminance = (r: number, g: number, b: number) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

/**
 * Rend transparent le papier autour de l'encre. Le niveau du papier est estimé sur l'image
 * (les pixels les plus clairs), ce qui supporte une photo un peu grise ou mal éclairée.
 * Une image déjà détourée (PNG transparent) est laissée telle quelle.
 */
export function removeBackground(data: Uint8ClampedArray): void {
  const histogram = new Uint32Array(256);
  let opaque = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 16) continue;
    histogram[Math.round(luminance(data[i], data[i + 1], data[i + 2]))]++;
    opaque++;
  }
  // image déjà détourée (PNG transparent) : rien à retirer
  if (!opaque || opaque < (data.length / 4) * 0.8) return;
  // le papier : 80e centile de la luminance (l'encre occupe peu de place)
  let paper = 255;
  for (let l = 0, seen = 0; l < 256; l++) {
    seen += histogram[l];
    if (seen >= opaque * 0.8) {
      paper = l;
      break;
    }
  }
  const clear = paper - 28; // au-dessus : papier
  const ink = Math.max(0, paper - 110); // en dessous : encre pleine
  for (let i = 0; i < data.length; i += 4) {
    const l = luminance(data[i], data[i + 1], data[i + 2]);
    const a = l >= clear ? 0 : l <= ink ? 1 : (clear - l) / (clear - ink);
    data[i + 3] = Math.round(data[i + 3] * a);
  }
}

/** Cadre des pixels visibles, ou null si l'image est vide. */
export function visibleBounds(data: Uint8ClampedArray, width: number, height: number, minAlpha = 24) {
  let minX = width;
  let minY = height;
  let maxX = -1;
  let maxY = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] >= minAlpha) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return maxX < 0 ? null : { x: minX, y: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

/** Recadre autour du tracé et réduit à la taille d'une signature ; renvoie un PNG en data URL. */
export function exportSignature(source: HTMLCanvasElement, maxW = SIGNATURE_MAX.width, maxH = SIGNATURE_MAX.height): string | null {
  const ctx = source.getContext('2d', { willReadFrequently: true })!;
  const { width, height } = source;
  const box = visibleBounds(ctx.getImageData(0, 0, width, height).data, width, height);
  if (!box) return null;
  const pad = Math.round(Math.max(box.width, box.height) * 0.03) + 2;
  const sx = Math.max(0, box.x - pad);
  const sy = Math.max(0, box.y - pad);
  const sw = Math.min(width - sx, box.width + pad * 2);
  const sh = Math.min(height - sy, box.height + pad * 2);
  let scale = Math.min(1, maxW / sw, maxH / sh);
  for (;;) {
    const out = document.createElement('canvas');
    out.width = Math.max(1, Math.round(sw * scale));
    out.height = Math.max(1, Math.round(sh * scale));
    const octx = out.getContext('2d')!;
    octx.imageSmoothingQuality = 'high';
    octx.drawImage(source, sx, sy, sw, sh, 0, 0, out.width, out.height);
    const url = out.toDataURL('image/png');
    // une signature reste légère (stockée avec chaque grille)
    if (url.length <= 250_000 || scale < 0.2) return url;
    scale *= 0.75;
  }
}

async function decode(file: File): Promise<CanvasImageSource & { width: number; height: number }> {
  try {
    return await createImageBitmap(file);
  } catch {
    const url = URL.createObjectURL(file);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

/** Lit une image de signature (JPG, PNG, WebP…) et la prépare pour la grille. */
export async function signatureFromFile(file: File, options: { removeBackground: boolean }): Promise<string> {
  if (file.size > 20 * 1024 * 1024) throw new Error('Image trop lourde (20 Mo maximum).');
  let img: Awaited<ReturnType<typeof decode>>;
  try {
    img = await decode(file);
  } catch {
    throw new Error('Format d’image non reconnu : utilisez une photo JPG ou une image PNG (sur iPhone, une capture d’écran de la photo convient).');
  }
  // travail sur une copie réduite : suffisant pour une signature et rapide
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.round(img.width * scale));
  canvas.height = Math.max(1, Math.round(img.height * scale));
  const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  if ('close' in img && typeof img.close === 'function') img.close();
  if (options.removeBackground) {
    const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
    removeBackground(pixels.data);
    ctx.putImageData(pixels, 0, 0);
  }
  const url = exportSignature(canvas);
  if (!url) throw new Error('Aucune signature détectée sur l’image : essayez une photo plus contrastée, ou décochez « Retirer le fond blanc ».');
  return url;
}

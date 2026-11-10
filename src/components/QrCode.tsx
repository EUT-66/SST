import qrcode from 'qrcode-generator';
import { useMemo } from 'react';

/** Zone blanche autour du QR code, nécessaire à la lecture (4 modules). */
const QUIET = 4;

/** Matrice du QR code (true = module noir), correction d'erreur moyenne. */
export function qrMatrix(text: string): boolean[][] {
  const qr = qrcode(0, 'M');
  qr.addData(text);
  qr.make();
  const n = qr.getModuleCount();
  return Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => qr.isDark(r, c)));
}

/** QR code dessiné en SVG : net à toutes les tailles, y compris au vidéoprojecteur. */
export default function QrCode({ value, label, className }: { value: string; label: string; className?: string }) {
  const { path, size } = useMemo(() => {
    const m = qrMatrix(value);
    let d = '';
    m.forEach((row, r) => row.forEach((dark, c) => dark && (d += `M${c + QUIET} ${r + QUIET}h1v1h-1z`)));
    return { path: d, size: m.length + QUIET * 2 };
  }, [value]);
  return (
    <svg viewBox={`0 0 ${size} ${size}`} className={className} role="img" aria-label={label} shapeRendering="crispEdges">
      <rect width={size} height={size} fill="#fff" />
      <path d={path} fill="#000" />
    </svg>
  );
}

/** Image PNG du QR code, pour l'imprimer ou l'insérer dans un diaporama. */
export async function qrPng(text: string, px = 1200): Promise<Uint8Array> {
  const m = qrMatrix(text);
  const size = m.length + QUIET * 2;
  const scale = Math.max(1, Math.floor(px / size));
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size * scale;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#000';
  m.forEach((row, r) => row.forEach((dark, c) => dark && ctx.fillRect((c + QUIET) * scale, (r + QUIET) * scale, scale, scale)));
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('Image du QR code impossible à créer.');
  return new Uint8Array(await blob.arrayBuffer());
}

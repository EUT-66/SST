import jsQR from 'jsqr';
import { describe, expect, it } from 'vitest';
import { qrMatrix } from './QrCode';

/** Rend la matrice en pixels (avec la zone blanche) et la relit avec un décodeur de QR code. */
function decode(matrix: boolean[][], scale = 8, quiet = 4) {
  const n = matrix.length + quiet * 2;
  const w = n * scale;
  const data = new Uint8ClampedArray(w * w * 4).fill(255);
  matrix.forEach((row, r) =>
    row.forEach((dark, c) => {
      if (!dark) return;
      for (let y = 0; y < scale; y++)
        for (let x = 0; x < scale; x++) {
          const i = (((r + quiet) * scale + y) * w + (c + quiet) * scale + x) * 4;
          data[i] = data[i + 1] = data[i + 2] = 0;
        }
    }),
  );
  return jsQR(data, w, w)?.data;
}

describe('QR code du QCM', () => {
  it('se lit et ouvre directement la page du QCM', () => {
    const url = 'https://mon-espace-sst.web.app/apprenti/K7M2QX';
    expect(decode(qrMatrix(url))).toBe(url);
  });
});

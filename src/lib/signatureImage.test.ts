import { describe, expect, it } from 'vitest';
import { removeBackground, visibleBounds } from './signatureImage';

/** Image w x h remplie de papier gris clair, avec un trait d'encre bleu foncé. */
function photo(w: number, h: number, paper = 225) {
  const data = new Uint8ClampedArray(w * h * 4);
  for (let i = 0; i < w * h; i++) data.set([paper, paper, paper - 5, 255], i * 4);
  for (let x = 10; x < 30; x++) data.set([20, 30, 90, 255], (5 * w + x) * 4);
  return data;
}

describe('signature importée', () => {
  it('retire le papier et garde l’encre, même sur une photo grise', () => {
    const data = photo(40, 10);
    removeBackground(data);
    expect(data[3]).toBe(0); // papier transparent
    expect(data[(5 * 40 + 15) * 4 + 3]).toBe(255); // encre opaque
    expect(visibleBounds(data, 40, 10)).toEqual({ x: 10, y: 5, width: 20, height: 1 });
  });

  it('laisse intacte une image déjà détourée', () => {
    const data = new Uint8ClampedArray(10 * 10 * 4); // transparente
    data.set([200, 200, 200, 255], 0); // un seul pixel clair, opaque
    removeBackground(data);
    expect(data[3]).toBe(255);
  });

  it('signale une image vide', () => {
    expect(visibleBounds(new Uint8ClampedArray(16), 2, 2)).toBeNull();
  });
});

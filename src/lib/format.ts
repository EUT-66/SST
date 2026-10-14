// Petits utilitaires de formatage et d'aléatoire.

/** AAAA-MM-JJ -> JJ/MM/AAAA */
export function frDate(iso?: string | null): string {
  if (!iso) return '';
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}

export function frDateTime(ms?: number | null): string {
  if (!ms) return '';
  return new Date(ms).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' });
}

export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function fullName(p: { firstName?: string; lastName?: string } | null | undefined): string {
  if (!p) return '';
  return [p.firstName, p.lastName].filter(Boolean).join(' ');
}

export function learnerName(l: { firstName?: string; lastName?: string }): string {
  return [l.lastName, l.firstName].filter(Boolean).join(' ');
}

/** Entier aléatoire cryptographique dans [0, n). */
export function randomInt(n: number): number {
  if (n <= 0) return 0;
  const buf = new Uint32Array(1);
  const limit = Math.floor(0x100000000 / n) * n;
  let x: number;
  do {
    crypto.getRandomValues(buf);
    x = buf[0];
  } while (x >= limit);
  return x % n;
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function newId(prefix = ''): string {
  const bytes = new Uint8Array(10);
  crypto.getRandomValues(bytes);
  return prefix + Array.from(bytes, (b) => b.toString(36).padStart(2, '0')).join('').slice(0, 16);
}

/** Code de connexion sans caractères ambigus (0/O, 1/I…). */
export function accessCode(length = 6): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length }, () => alphabet[randomInt(alphabet.length)]).join('');
}

export function pluralize(n: number, singular: string, plural = singular + 's'): string {
  return `${n} ${n > 1 ? plural : singular}`;
}

export function downloadBlob(data: string | Uint8Array, filename: string, type: string) {
  const blob = new Blob([typeof data === 'string' ? data : new Uint8Array(data)], { type });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function slug(s: string): string {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();
}

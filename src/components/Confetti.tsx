import { useMemo } from 'react';

/** Confettis du tirage au sort. */
export default function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: `${(i * 37) % 100}%`,
        delay: `${(i % 10) * 0.08}s`,
        color: ['#279d5f', '#f2a900', '#82d3a5', '#ffffff', '#16663e'][i % 5],
        size: 6 + (i % 4) * 2,
      })),
    [],
  );
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 h-full overflow-hidden">
      {pieces.map((p, i) => (
        <span key={i} className="confetti absolute top-10 rounded-sm" style={{ left: p.left, animationDelay: p.delay, background: p.color, width: p.size, height: p.size * 1.6 }} />
      ))}
    </div>
  );
}

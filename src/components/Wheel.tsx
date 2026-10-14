import { useEffect, useRef, useState } from 'react';
import { randomInt } from '../lib/format';

export interface WheelItem {
  id: string;
  label: string;
}

const COLORS = ['#1a7f4b', '#4cb97d', '#16663e', '#279d5f', '#82d3a5', '#155134'];
const LIGHT = new Set(['#82d3a5', '#4cb97d']);

function segmentPath(cx: number, cy: number, r: number, a0: number, a1: number) {
  const rad = (a: number) => ((a - 90) * Math.PI) / 180;
  const x0 = cx + r * Math.cos(rad(a0));
  const y0 = cy + r * Math.sin(rad(a0));
  const x1 = cx + r * Math.cos(rad(a1));
  const y1 = cy + r * Math.sin(rad(a1));
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`;
}

/**
 * Roue de tirage au sort. Le gagnant est choisi avec un aléa cryptographique,
 * puis la roue est animée pour s'arrêter dessus.
 */
export default function Wheel({
  items,
  onResult,
  disabled,
  spinLabel = 'Lancer la roue',
}: {
  items: WheelItem[];
  onResult: (item: WheelItem) => void;
  disabled?: boolean;
  spinLabel?: string;
}) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const pending = useRef<WheelItem | null>(null);
  const resultRef = useRef(onResult);
  resultRef.current = onResult;
  const n = items.length;
  const angle = n ? 360 / n : 360;

  useEffect(() => {
    if (!spinning) return;
    const t = setTimeout(() => {
      setSpinning(false);
      if (pending.current) resultRef.current(pending.current);
      pending.current = null;
    }, 5400);
    return () => clearTimeout(t);
  }, [spinning]);

  const spin = () => {
    if (!n || spinning) return;
    const index = randomInt(n);
    pending.current = items[index];
    const center = (index + 0.5) * angle;
    const jitter = (randomInt(1000) / 1000 - 0.5) * angle * 0.6;
    const current = ((rotation % 360) + 360) % 360;
    const delta = (360 - center - jitter - current + 720) % 360;
    setRotation(rotation + 360 * 7 + delta);
    setSpinning(true);
  };

  const size = 520;
  const c = size / 2;
  const r = c - 12;
  const fontSize = Math.max(11, Math.min(22, 260 / Math.max(n, 1) + 8));

  return (
    <div className="flex w-full flex-col items-center">
      <div className="relative w-full max-w-[560px]">
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full drop-shadow-xl">
          <circle cx={c} cy={c} r={c - 2} fill="#0b3a23" />
          <g className="wheel-rotor" style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '50% 50%' }}>
            {n === 0 && <circle cx={c} cy={c} r={r} fill="#d9f3e2" />}
            {n === 1 && <circle cx={c} cy={c} r={r} fill={COLORS[0]} />}
            {n > 1 &&
              items.map((it, i) => (
                <path key={it.id} d={segmentPath(c, c, r, i * angle, (i + 1) * angle)} fill={COLORS[i % COLORS.length]} stroke="#ffffff" strokeWidth={2} />
              ))}
            {items.map((it, i) => {
              const mid = (i + 0.5) * angle;
              const color = n > 1 && LIGHT.has(COLORS[i % COLORS.length]) ? '#0b3a23' : '#ffffff';
              const label = it.label.length > 18 ? it.label.slice(0, 17) + '…' : it.label;
              // côté gauche de la roue : on retourne le texte pour qu'il reste lisible
              const flip = mid > 180;
              return (
                <g key={it.id} transform={`rotate(${flip ? mid + 90 : mid - 90} ${c} ${c})`}>
                  <text
                    x={flip ? c - r + 18 : c + r - 18}
                    y={c}
                    fill={color}
                    fontSize={fontSize}
                    fontWeight={700}
                    textAnchor={flip ? 'start' : 'end'}
                    dominantBaseline="middle"
                    fontFamily="Nunito, sans-serif"
                  >
                    {label}
                  </text>
                </g>
              );
            })}
          </g>
          <circle cx={c} cy={c} r={46} fill="#ffffff" stroke="#16663e" strokeWidth={6} />
          <path d={`M ${c - 9} ${c - 26} h 18 v 17 h 17 v 18 h -17 v 17 h -18 v -17 h -17 v -18 h 17 z`} fill="#1a7f4b" />
        </svg>
        {/* Pointeur */}
        <svg viewBox="0 0 40 48" className="absolute left-1/2 top-0 w-10 -translate-x-1/2 -translate-y-1 drop-shadow-lg">
          <path d="M20 46 L4 6 Q20 -4 36 6 Z" fill="#f2a900" stroke="#ffffff" strokeWidth="3" />
        </svg>
      </div>
      <button className="btn-primary btn-lg mt-6 min-w-[220px] text-lg" disabled={disabled || spinning || n === 0} onClick={spin}>
        {spinning ? 'La roue tourne…' : spinLabel}
      </button>
    </div>
  );
}

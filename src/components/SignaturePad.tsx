import { Eraser } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

/** Zone de signature manuscrite (souris, doigt ou stylet). Renvoie un PNG en data URL. */
export default function SignaturePad({ onChange, height = 180 }: { onChange: (dataUrl: string | null) => void; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    const ctx = canvas.getContext('2d')!;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#13213a';
  }, []);

  const point = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  const start = (e: React.PointerEvent) => {
    e.preventDefault();
    canvasRef.current!.setPointerCapture(e.pointerId);
    drawing.current = true;
    last.current = point(e);
  };
  const move = (e: React.PointerEvent) => {
    if (!drawing.current || !last.current) return;
    const ctx = canvasRef.current!.getContext('2d')!;
    const p = point(e);
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    if (empty) setEmpty(false);
  };
  const end = () => {
    if (!drawing.current) return;
    drawing.current = false;
    last.current = null;
    if (!empty) onChange(exportTrimmed(canvasRef.current!));
  };
  const clear = () => {
    const canvas = canvasRef.current!;
    canvas.getContext('2d')!.clearRect(0, 0, canvas.width, canvas.height);
    setEmpty(true);
    onChange(null);
  };

  return (
    <div>
      <div className="relative rounded-2xl border-2 border-dashed border-sst-200 bg-white">
        <canvas
          ref={canvasRef}
          style={{ height, touchAction: 'none' }}
          className="block w-full cursor-crosshair rounded-2xl"
          onPointerDown={start}
          onPointerMove={move}
          onPointerUp={end}
          onPointerLeave={end}
        />
        {empty && (
          <p className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-slate-400">
            Signez ici avec la souris, le doigt ou un stylet
          </p>
        )}
        <div className="absolute bottom-3 left-6 right-6 border-b border-slate-200" />
      </div>
      <button type="button" className="btn-ghost btn-sm mt-2" onClick={clear}>
        <Eraser className="h-4 w-4" /> Effacer
      </button>
    </div>
  );
}

/** Recadre la signature autour du tracé pour un rendu propre dans le PDF. */
function exportTrimmed(canvas: HTMLCanvasElement): string {
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;
  const data = ctx.getImageData(0, 0, width, height).data;
  let minX = width, minY = height, maxX = 0, maxY = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] > 0) {
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
      }
    }
  }
  if (maxX <= minX || maxY <= minY) return canvas.toDataURL('image/png');
  const pad = 8;
  const w = maxX - minX + pad * 2;
  const h = maxY - minY + pad * 2;
  const out = document.createElement('canvas');
  const scale = Math.min(1, 600 / w);
  out.width = Math.round(w * scale);
  out.height = Math.round(h * scale);
  out.getContext('2d')!.drawImage(canvas, minX - pad, minY - pad, w, h, 0, 0, out.width, out.height);
  return out.toDataURL('image/png');
}

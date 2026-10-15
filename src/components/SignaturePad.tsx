import clsx from 'clsx';
import { Eraser, ImageUp, PenLine } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { exportSignature, signatureFromFile } from '../lib/signatureImage';
import { Spinner } from './ui';

type Mode = 'draw' | 'import';

/**
 * Signature du formateur : tracée à la souris, au doigt ou au stylet, ou importée depuis
 * une image (photo ou scan). Renvoie un PNG détouré en data URL.
 */
export default function SignaturePad({ onChange, height = 180 }: { onChange: (dataUrl: string | null) => void; height?: number }) {
  const [mode, setMode] = useState<Mode>('draw');

  const switchTo = (m: Mode) => {
    if (m === mode) return;
    setMode(m);
    onChange(null);
  };

  return (
    <div>
      <div role="tablist" aria-label="Façon de signer" className="mb-3 inline-flex rounded-xl bg-slate-100 p-1">
        {(
          [
            ['draw', 'Dessiner', <PenLine key="d" className="h-4 w-4" />],
            ['import', 'Importer une image', <ImageUp key="i" className="h-4 w-4" />],
          ] as const
        ).map(([m, label, icon]) => (
          <button
            key={m}
            type="button"
            role="tab"
            aria-selected={mode === m}
            onClick={() => switchTo(m)}
            className={clsx(
              'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold transition',
              mode === m ? 'bg-white text-sst-800 shadow-sm' : 'text-ink-muted hover:text-ink',
            )}
          >
            {icon} {label}
          </button>
        ))}
      </div>
      {mode === 'draw' ? <DrawPad onChange={onChange} height={height} /> : <ImportPad onChange={onChange} height={height} />}
    </div>
  );
}

function DrawPad({ onChange, height }: { onChange: (dataUrl: string | null) => void; height: number }) {
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
    const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
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
    if (!empty) onChange(exportSignature(canvasRef.current!));
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

function ImportPad({ onChange, height }: { onChange: (dataUrl: string | null) => void; height: number }) {
  const [file, setFile] = useState<File | null>(null);
  const [cleanBackground, setCleanBackground] = useState(true);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    setBusy(true);
    setError(null);
    signatureFromFile(file, { removeBackground: cleanBackground })
      .then((url) => {
        if (cancelled) return;
        setPreview(url);
        onChange(url);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setPreview(null);
        setError(err.message);
        onChange(null);
      })
      .finally(() => !cancelled && setBusy(false));
    return () => {
      cancelled = true;
    };
    // onChange (setter d'état de l'appelant) ne relance pas le traitement de l'image
  }, [file, cleanBackground]);

  const pick = (f: File | undefined | null) => {
    if (!f) return;
    if (!f.type.startsWith('image/') && f.type !== '') {
      setError('Choisissez une image (photo JPG, PNG…).');
      return;
    }
    setFile(f);
  };

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          pick(e.dataTransfer.files?.[0]);
        }}
        style={{ minHeight: height }}
        className={clsx(
          'flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed bg-white p-4 text-center transition',
          dragging ? 'border-sst-500 bg-sst-50' : 'border-sst-200',
        )}
      >
        {busy ? (
          <Spinner className="h-7 w-7" />
        ) : preview ? (
          <img src={preview} alt="Aperçu de la signature importée" className="max-h-32 max-w-full object-contain" />
        ) : (
          <>
            <ImageUp className="h-8 w-8 text-sst-400" />
            <p className="text-sm text-ink-muted">Glissez ici une photo ou un scan de votre signature</p>
          </>
        )}
        <button type="button" className="btn-secondary btn-sm" onClick={() => inputRef.current?.click()}>
          <ImageUp className="h-4 w-4" /> {preview ? 'Choisir une autre image' : 'Choisir une image'}
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          aria-label="Image de la signature"
          onChange={(e) => {
            pick(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
      </div>
      {error && <p className="mt-2 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
      <label className="mt-3 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={cleanBackground} onChange={(e) => setCleanBackground(e.target.checked)} />
        Retirer le fond blanc (conseillé pour une photo ou un scan)
      </label>
      <p className="mt-1 text-xs text-ink-muted">Conseil : signez au feutre noir sur une feuille blanche, puis prenez une photo bien éclairée, sans ombre. L’image est recadrée automatiquement.</p>
    </div>
  );
}

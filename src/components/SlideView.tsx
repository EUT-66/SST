import clsx from 'clsx';
import { AlertTriangle, HelpCircle, Info, Wrench } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { Callout, Slide } from '../lib/types';

const W = 1280;
const H = 720;

/** Affiche une diapositive au format 16:9, mise à l'échelle de son conteneur. */
export default function SlideView({ slide, footer, fill = false }: { slide: Slide; footer?: { left?: string; right?: string }; fill?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / W, (el.clientHeight || Infinity) / H));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={clsx('relative w-full', fill && 'h-full')} style={fill ? undefined : { aspectRatio: '16 / 9' }}>
      <div
        className="absolute left-1/2 top-1/2 overflow-hidden rounded-[18px] shadow-xl"
        style={{ width: W, height: H, transform: `translate(-50%, -50%) scale(${scale})`, transformOrigin: 'center' }}
      >
        <SlideCanvas slide={slide} footer={footer} />
      </div>
    </div>
  );
}

function SlideCanvas({ slide, footer }: { slide: Slide; footer?: { left?: string; right?: string } }) {
  const dark = slide.layout === 'cover' || slide.layout === 'section';
  return (
    <div
      className={clsx(
        'relative flex h-full w-full flex-col font-sans',
        slide.layout === 'cover' && 'bg-gradient-to-br from-sst-800 via-sst-900 to-[#0b2318] text-white',
        slide.layout === 'section' && 'bg-gradient-to-br from-sst-600 to-sst-800 text-white',
        !dark && 'bg-white text-ink',
      )}
    >
      {slide.layout === 'cover' && <Cover slide={slide} />}
      {slide.layout === 'section' && <Section slide={slide} />}
      {!dark && <Standard slide={slide} />}
      {footer && !dark && (
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-14 pb-5 text-[15px] text-slate-400">
          <span>{footer.left}</span>
          <span>{footer.right}</span>
        </div>
      )}
      {dark && (
        <svg className="pointer-events-none absolute -bottom-24 -right-24 h-[460px] w-[460px] text-white/[0.06]" viewBox="0 0 64 64" fill="currentColor">
          <path d="M26 6h12v20h20v12H38v20H26V38H6V26h20z" />
        </svg>
      )}
    </div>
  );
}

function Cover({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-24">
      {slide.kicker && <p className="mb-6 text-[22px] font-extrabold uppercase tracking-[0.2em] text-vigilance">{slide.kicker}</p>}
      <h1 className="max-w-[900px] font-display text-[72px] font-extrabold leading-[1.05] !text-white">{slide.title}</h1>
      {slide.subtitle && <p className="mt-8 max-w-[900px] text-[30px] text-sst-100">{slide.subtitle}</p>}
      {!!slide.items?.length && (
        <div className="mt-16 flex gap-24">
          {slide.items.map((it, i) => (
            <div key={i}>
              <p className="font-display text-[56px] font-extrabold text-vigilance">{it.value}</p>
              <p className="text-[20px] text-sst-100">{it.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Section({ slide }: { slide: Slide }) {
  return (
    <div className="flex h-full flex-col justify-center px-24">
      {slide.kicker && <p className="mb-4 text-[26px] font-extrabold uppercase tracking-[0.25em] text-sst-200">{slide.kicker}</p>}
      <h1 className="font-display text-[84px] font-extrabold leading-none !text-white">{slide.title}</h1>
      {slide.subtitle && <p className="mt-8 text-[32px] text-sst-100">{slide.subtitle}</p>}
    </div>
  );
}

function Standard({ slide }: { slide: Slide }) {
  const callouts = slide.callouts ?? [];
  const side = callouts.length > 0 && (slide.layout === 'steps' || slide.layout === 'content');
  return (
    <div className="flex h-full flex-col px-14 pb-14 pt-11">
      {slide.kicker && <p className="mb-2 text-[18px] font-extrabold uppercase tracking-[0.18em] text-sst-600">{slide.kicker}</p>}
      <h2 className="font-display text-[46px] font-extrabold leading-tight text-ink">{slide.title}</h2>
      <div className={clsx('mt-6 flex min-h-0 flex-1 gap-8', !side && 'flex-col')}>
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          {slide.result && (
            <div className="rounded-2xl bg-sst-700 px-6 py-4 text-white">
              <p className="text-[14px] font-extrabold uppercase tracking-[0.2em] text-sst-200">Résultat à atteindre</p>
              <p className="text-[28px] font-bold">{slide.result}</p>
            </div>
          )}
          {slide.body && <Body text={slide.body} size={slide.layout === 'content' ? 24 : 21} />}
          {slide.layout === 'cards' && <Cards slide={slide} />}
          {slide.layout === 'steps' && <Steps slide={slide} />}
          {slide.layout === 'stats' && <Stats slide={slide} />}
        </div>
        {callouts.length > 0 && (
          <div className={clsx('flex gap-4', side ? 'w-[400px] shrink-0 flex-col' : 'flex-row')}>
            {callouts.map((c, i) => (
              <CalloutBox key={i} c={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Body({ text, size }: { text: string; size: number }) {
  const blocks: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = (key: number) => {
    if (bullets.length) {
      blocks.push(
        <ul key={`u${key}`} className="space-y-1.5">
          {bullets.map((b, i) => (
            <li key={i} className="flex gap-3">
              <span className="mt-[0.55em] h-2.5 w-2.5 shrink-0 rounded-full bg-sst-500" />
              <span>{b}</span>
            </li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };
  text.split('\n').forEach((line, i) => {
    if (line.startsWith('- ')) bullets.push(line.slice(2));
    else {
      flush(i);
      if (line.trim()) blocks.push(<p key={i}>{line}</p>);
    }
  });
  flush(-1);
  return (
    <div className="space-y-3 leading-snug text-ink-soft" style={{ fontSize: size }}>
      {blocks}
    </div>
  );
}

function Cards({ slide }: { slide: Slide }) {
  const items = slide.items ?? [];
  const cols = items.length >= 7 ? 4 : items.length === 4 ? 2 : Math.min(items.length, 3);
  const small = items.length > 4;
  return (
    <div className="grid min-h-0 flex-1 gap-4" style={{ gridTemplateColumns: `repeat(${Math.max(cols, 1)}, minmax(0, 1fr))`, alignContent: 'start' }}>
      {items.map((it, i) => (
        <div key={i} className="rounded-2xl border-t-[6px] border-sst-500 bg-sst-50 p-5">
          {it.value && <p className="font-display text-[40px] font-extrabold leading-none text-sst-700">{it.value}</p>}
          {it.title && <p className={clsx('font-display font-extrabold text-ink', small ? 'text-[20px]' : 'text-[24px]', it.value && 'mt-2')}>{it.title}</p>}
          {it.text && <p className={clsx('mt-2 leading-snug text-ink-soft', small ? 'text-[16px]' : 'text-[19px]')}>{it.text}</p>}
        </div>
      ))}
    </div>
  );
}

function Steps({ slide }: { slide: Slide }) {
  const items = slide.items ?? [];
  const dense = items.length > 5;
  return (
    <ol className={clsx('flex flex-col', dense ? 'gap-2' : 'gap-4')}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-4">
          <span className={clsx('flex shrink-0 items-center justify-center rounded-full bg-alerte font-display font-extrabold text-white', dense ? 'h-9 w-9 text-[18px]' : 'h-11 w-11 text-[22px]')}>
            {i + 1}
          </span>
          <div className={dense ? 'pt-1' : 'pt-1.5'}>
            {it.title && <p className={clsx('font-bold text-ink', dense ? 'text-[20px]' : 'text-[23px]')}>{it.title}</p>}
            {it.text && <p className={clsx('text-ink-soft', dense ? 'text-[17px]' : 'text-[19px]')}>{it.text}</p>}
          </div>
        </li>
      ))}
    </ol>
  );
}

function Stats({ slide }: { slide: Slide }) {
  return (
    <div className="flex flex-wrap gap-6">
      {(slide.items ?? []).map((it, i) => (
        <div key={i} className="min-w-[220px] flex-1 rounded-2xl bg-sst-50 p-6">
          <p className="font-display text-[58px] font-extrabold leading-none text-sst-700">{it.value}</p>
          <p className="mt-3 text-[20px] text-ink-soft">{it.title}</p>
        </div>
      ))}
    </div>
  );
}

const CALLOUT_STYLE: Record<Callout['kind'], { box: string; head: string; icon: ReactNode; label: string }> = {
  metier: { box: 'bg-[#fbeee9]', head: 'text-alerte', icon: <Wrench className="h-6 w-6" />, label: 'Côté métier' },
  attention: { box: 'bg-[#fff4d6]', head: 'text-[#b06d00]', icon: <AlertTriangle className="h-6 w-6" />, label: 'Attention' },
  info: { box: 'bg-sst-50', head: 'text-sst-700', icon: <Info className="h-6 w-6" />, label: 'À retenir' },
  question: { box: 'bg-[#e8f3f6]', head: 'text-[#1f7a8c]', icon: <HelpCircle className="h-6 w-6" />, label: 'Question' },
};

function CalloutBox({ c }: { c: Callout }) {
  const s = CALLOUT_STYLE[c.kind];
  return (
    <div className={clsx('flex-1 rounded-2xl p-5', s.box)}>
      <p className={clsx('mb-2 flex items-center gap-2 text-[16px] font-extrabold uppercase tracking-[0.14em]', s.head)}>
        {s.icon} {c.title ?? s.label}
      </p>
      <p className="whitespace-pre-line text-[19px] font-semibold leading-snug text-ink">{c.text}</p>
    </div>
  );
}

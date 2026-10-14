import clsx from 'clsx';
import { ArrowLeft, ClipboardCheck, Dices, Eye, EyeOff, Maximize, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CasePicker from '../../components/CasePicker';
import { errorMessage, Modal, PageLoader, useFeedback } from '../../components/ui';
import Wheel, { type WheelItem } from '../../components/Wheel';
import { useData } from '../../hooks/useData';
import { assignCase, pickRandomCase, recordLearnerDraw, resetDraw } from '../../lib/drawOps';
import { availableCases } from '../../lib/sessions';
import type { Learner } from '../../lib/types';
import { useSessionBundle } from './SessionDetail';

export default function DrawPage() {
  const { sid } = useParams();
  const { session, learners, loading } = useSessionBundle(sid);
  const { cases, caseById } = useData();
  const { toast } = useFeedback();
  const [winner, setWinner] = useState<Learner | null>(null);
  const [autoCase, setAutoCase] = useState(true);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [picking, setPicking] = useState<Learner | null>(null);
  const [resetOpen, setResetOpen] = useState(false);

  const remaining = useMemo(() => learners.filter((l) => !l.absent && !l.drawOrder), [learners]);
  const drawnList = useMemo(() => learners.filter((l) => l.drawOrder).sort((a, b) => (a.drawOrder ?? 0) - (b.drawOrder ?? 0)), [learners]);
  const items: WheelItem[] = remaining.map((l) => ({ id: l.id, label: `${l.firstName} ${l.lastName.charAt(0)}.` }));
  const casesLeft = session ? availableCases(cases, session).length : 0;

  const onResult = useCallback(
    async (item: WheelItem) => {
      if (!session) return;
      const learner = learners.find((l) => l.id === item.id);
      if (!learner) return;
      try {
        await recordLearnerDraw(session, learner);
        setWinner(learner);
        if (autoCase && !learner.caseId) {
          const c = pickRandomCase(cases, session);
          if (c) await assignCase(session, learner, c.id, false);
          else toast('Plus aucun cas disponible : attribuez-en un manuellement.', 'info');
        }
      } catch (err) {
        toast(errorMessage(err), 'error');
      }
    },
    [session, learners, autoCase, cases, toast],
  );

  if (loading) return <PageLoader />;
  if (!session) return <PageLoader label="Session introuvable" />;

  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => undefined);
  const winnerNow = winner ? learners.find((l) => l.id === winner.id) ?? winner : null;

  const doReset = async (keepCases: boolean) => {
    setResetOpen(false);
    try {
      await resetDraw(session, learners, keepCases);
      toast('Tirage réinitialisé');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sst-50 via-white to-sst-100">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-sst-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-8">
        <Link to={`/sessions/${session.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sst-700 hover:underline">
          <ArrowLeft className="h-4 w-4" /> {session.title}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <label className="flex items-center gap-2 rounded-xl border border-sst-100 bg-white px-3 py-2 text-sm font-semibold">
            <input type="checkbox" className="h-4 w-4 accent-sst-600" checked={autoCase} onChange={(e) => setAutoCase(e.target.checked)} />
            Attribuer aussitôt un cas (masqué)
          </label>
          <button className="btn-ghost btn-sm" onClick={fullscreen}>
            <Maximize className="h-4 w-4" /> Plein écran
          </button>
          <button className="btn-ghost btn-sm" onClick={() => setResetOpen(true)} disabled={drawnList.length === 0 && !session.drawnCaseIds?.length}>
            <RotateCcw className="h-4 w-4" /> Réinitialiser
          </button>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col items-center">
          <p className="kicker">Tirage au sort de l’ordre de passage</p>
          <h1 className="mb-6 mt-1 text-center font-display text-3xl font-extrabold sm:text-4xl">Qui passe maintenant ?</h1>
          {items.length > 0 ? (
            <Wheel items={items} onResult={onResult} disabled={!!winner} />
          ) : (
            <div className="card flex flex-col items-center p-10 text-center">
              <Sparkles className="mb-3 h-10 w-10 text-sst-500" />
              <p className="text-lg font-bold">Tous les apprentis présents ont été tirés au sort.</p>
              <p className="mt-1 text-sm text-ink-muted">Bonne évaluation !</p>
            </div>
          )}
          <p className="mt-4 text-sm text-ink-muted">
            {remaining.length} apprenti(s) restant(s) · {casesLeft} cas pratique(s) encore disponible(s)
          </p>
        </section>

        <aside className="card h-fit p-5">
          <h2 className="section-title mb-1">Ordre de passage</h2>
          <p className="mb-4 text-xs text-ink-muted">Les cas restent masqués : cliquez sur l’œil pour les consulter discrètement.</p>
          {drawnList.length === 0 ? (
            <p className="text-sm text-ink-muted">Aucun apprenti tiré pour l’instant.</p>
          ) : (
            <ol className="space-y-2">
              {drawnList.map((l) => {
                const kase = l.caseId ? caseById[l.caseId] : null;
                return (
                  <li key={l.id} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sst-600 text-sm font-bold text-white">{l.drawOrder}</span>
                      <span className="min-w-0 flex-1 truncate font-semibold">
                        {l.firstName} {l.lastName}
                      </span>
                      <Link to={`/sessions/${session.id}/evaluation/${l.id}`} className="btn-ghost btn-sm" title="Évaluer">
                        <ClipboardCheck className="h-4 w-4" />
                      </Link>
                    </div>
                    <div className="mt-2 flex items-center gap-2 pl-11 text-xs">
                      {kase ? (
                        <>
                          <button className="text-sst-700" onClick={() => setReveal({ ...reveal, [l.id]: !reveal[l.id] })} aria-label="Afficher le cas">
                            {reveal[l.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <span className={clsx('flex-1 truncate', !reveal[l.id] && 'select-none blur-[5px]')}>
                            {kase.number ? `n° ${kase.number} – ` : ''}
                            {kase.title}
                          </span>
                        </>
                      ) : (
                        <span className="flex-1 text-ink-muted">Aucun cas attribué</span>
                      )}
                      <button className="font-semibold text-sst-700 hover:underline" onClick={() => setPicking(l)}>
                        {kase ? 'Changer' : 'Attribuer'}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </aside>
      </div>

      {winnerNow && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-sst-950/50 p-4 backdrop-blur-sm">
          <Confetti />
          <div className="animate-pop relative w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="kicker">Passage n° {winnerNow.drawOrder ?? '…'}</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-sst-800">
              {winnerNow.firstName} {winnerNow.lastName}
            </h2>
            <div className="mt-6 rounded-2xl bg-sst-50 p-4">
              {winnerNow.caseId ? (
                <p className="flex items-center justify-center gap-2 font-semibold text-sst-800">
                  <Shuffle className="h-5 w-5" /> Cas pratique tiré au sort et attribué
                </p>
              ) : (
                <p className="text-sm text-ink-muted">Aucun cas attribué pour l’instant.</p>
              )}
              <p className="mt-1 text-xs text-ink-muted">Le sujet reste confidentiel jusqu’au passage.</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button className="btn-secondary" onClick={() => setPicking(winnerNow)}>
                <Dices className="h-4 w-4" /> {winnerNow.caseId ? 'Changer le cas' : 'Attribuer un cas'}
              </button>
              <Link to={`/sessions/${session.id}/evaluation/${winnerNow.id}`} className="btn-secondary">
                <ClipboardCheck className="h-4 w-4" /> Évaluer maintenant
              </Link>
              <button className="btn-primary" onClick={() => setWinner(null)}>
                Continuer le tirage
              </button>
            </div>
          </div>
        </div>
      )}

      {picking && <CasePicker session={session} learner={learners.find((l) => l.id === picking.id) ?? picking} onClose={() => setPicking(null)} />}

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Réinitialiser le tirage"
        size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => doReset(true)}>
              Ordre seulement
            </button>
            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => doReset(false)}>
              Ordre et cas
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-soft">
          « Ordre seulement » remet tous les apprentis dans la roue en gardant leurs cas. « Ordre et cas » retire aussi les cas attribués et les remet tous en jeu (les évaluations déjà saisies ne sont pas supprimées).
        </p>
      </Modal>
    </div>
  );
}

function Confetti() {
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

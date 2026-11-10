import clsx from 'clsx';
import { ArrowLeft, Dices, Dumbbell, ExternalLink, Eye, EyeOff, ListOrdered, Maximize, RotateCcw, Shuffle, Sparkles } from 'lucide-react';
import { useCallback, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import CaseSheet from '../../components/CaseSheet';
import Confetti from '../../components/Confetti';
import { errorMessage, Modal, PageLoader, useFeedback } from '../../components/ui';
import Wheel, { type WheelItem } from '../../components/Wheel';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { useDocument } from '../../hooks/useFirestore';
import {
  changeTrainingCase,
  drawAllTraining,
  emptyTraining,
  pickTrainingCase,
  recordTrainingPassage,
  setTrainingOptions,
  startNextSeries,
  trainingPath,
  trainingPool,
} from '../../lib/trainingOps';
import type { CasePool, PracticalCase, TrainingDraw } from '../../lib/types';
import { useSessionBundle } from './SessionDetail';

/**
 * Entraînement à la mise en pratique : roue et cas tirés au hasard comme pour la certification,
 * sans rien enregistrer dans l'ordre de passage officiel, les évaluations ni les grilles.
 */
export default function TrainingDrawPage() {
  const { sid } = useParams();
  const { session, learners, loading } = useSessionBundle(sid);
  const training = useDocument<TrainingDraw>(sid ? trainingPath(sid) : null);
  const { profile } = useAuth();
  const { cases, caseById } = useData();
  const { toast } = useFeedback();
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [reveal, setReveal] = useState<Record<string, boolean>>({});
  const [showCase, setShowCase] = useState<PracticalCase | null>(null);
  const [resetOpen, setResetOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [drawingAll, setDrawingAll] = useState(false);

  const state = useMemo(() => (session ? { ...emptyTraining(session), ...(training.data ?? {}) } : null), [session, training.data]);
  const drawnIds = useMemo(() => new Set(state?.passages.map((p) => p.learnerId)), [state]);
  const remaining = useMemo(() => learners.filter((l) => !l.absent && !drawnIds.has(l.id)), [learners, drawnIds]);
  const items: WheelItem[] = remaining.map((l) => ({ id: l.id, label: `${l.firstName} ${l.lastName.charAt(0)}.` }));
  const learnerById = useMemo(() => Object.fromEntries(learners.map((l) => [l.id, l])), [learners]);
  const canEdit = !!session && session.status !== 'closed' && (session.trainerId === profile?.uid || profile?.role === 'admin');

  const onResult = useCallback(
    async (item: WheelItem) => {
      if (!session || !state) return;
      try {
        const { kase, recycled } = pickTrainingCase(cases, session, state);
        await recordTrainingPassage(session, item.id, kase?.id ?? null, recycled);
        setWinnerId(item.id);
        if (!kase) toast('Aucun cas pratique disponible pour ce métier.', 'info');
        else if (recycled) toast('Tous les cas ont été joués : un nouveau tour de cas commence.', 'info');
      } catch (err) {
        toast(errorMessage(err), 'error');
      }
    },
    [session, state, cases, toast],
  );

  if (loading || training.loading) return <PageLoader />;
  if (!session || !state) return <PageLoader label="Session introuvable" />;

  const pool = trainingPool(cases, session, state);
  const freshLeft = pool.filter((c) => !state.usedCaseIds.includes(c.id)).length;
  const winner = winnerId ? learnerById[winnerId] : null;
  const winnerPassage = winnerId ? state.passages.find((p) => p.learnerId === winnerId) : null;
  const winnerCase = winnerPassage?.caseId ? caseById[winnerPassage.caseId] : null;

  const otherCase = async (learnerId: string) => {
    const current = state.passages.find((p) => p.learnerId === learnerId)?.caseId ?? null;
    const { kase, recycled } = pickTrainingCase(cases, session, state, [current]);
    if (!kase) return toast('Aucun autre cas disponible.', 'info');
    try {
      await changeTrainingCase(session, learnerId, kase.id, recycled);
      setReveal((r) => ({ ...r, [learnerId]: false }));
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const setOptions = async (options: Partial<Pick<TrainingDraw, 'casePool' | 'source' | 'avoidCertificationCases'>>) => {
    try {
      await setTrainingOptions(session, { casePool: state.casePool, source: state.source, avoidCertificationCases: state.avoidCertificationCases, ...options });
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const reset = async (keepPlayedCases: boolean) => {
    setResetOpen(false);
    try {
      await startNextSeries(session, keepPlayedCases);
      setReveal({});
      toast('Nouvelle série d’entraînement');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const drawAll = async () => {
    setDrawingAll(true);
    try {
      await drawAllTraining(session, remaining.map((l) => l.id), cases);
      setOrderOpen(true);
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setDrawingAll(false);
    }
  };

  const fullscreen = () => document.documentElement.requestFullscreen?.().catch(() => undefined);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-sst-50">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-100 bg-white/80 px-4 py-3 backdrop-blur sm:px-8">
        <Link to={`/sessions/${session.id}`} className="inline-flex items-center gap-2 text-sm font-semibold text-sst-700 hover:underline">
          <ArrowLeft className="h-4 w-4" /> {session.title}
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          <select
            className="input w-auto py-2"
            aria-label="Origine des cas"
            disabled={!canEdit}
            value={state.source}
            onChange={(e) => setOptions({ source: e.target.value as TrainingDraw['source'] })}
          >
            <option value="entrainement">Cas d’entraînement (jamais à l’examen)</option>
            <option value="tous">Tous les cas, examen compris</option>
          </select>
          <select
            className="input w-auto py-2"
            aria-label="Cas proposés à l’entraînement"
            disabled={!canEdit}
            value={state.casePool}
            onChange={(e) => setOptions({ casePool: e.target.value as CasePool })}
          >
            <option value="both">Cas métier et vie quotidienne</option>
            <option value="metier">Cas métier uniquement</option>
            <option value="vie_quotidienne">Cas de la vie quotidienne uniquement</option>
          </select>
          <label className="flex items-center gap-2 rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm font-semibold">
            <input
              type="checkbox"
              className="h-4 w-4 accent-sst-600"
              disabled={!canEdit}
              checked={state.avoidCertificationCases}
              onChange={(e) => setOptions({ avoidCertificationCases: e.target.checked })}
            />
            Garder secrets les cas tirés pour la certification
          </label>
          <button className="btn-ghost btn-sm" onClick={fullscreen}>
            <Maximize className="h-4 w-4" /> Plein écran
          </button>
          {canEdit && (
            <button className="btn-ghost btn-sm" onClick={() => setResetOpen(true)} disabled={state.passages.length === 0 && state.usedCaseIds.length === 0}>
              <RotateCcw className="h-4 w-4" /> Nouvelle série
            </button>
          )}
        </div>
      </header>

      <div className="border-b border-amber-200 bg-amber-100/70 px-4 py-2 text-center text-sm font-semibold text-amber-900 sm:px-8">
        <Dumbbell className="mr-1.5 inline h-4 w-4 align-[-3px]" />
        Entraînement : ne compte pas pour la certification. Rien n’est enregistré dans l’ordre de passage officiel, les évaluations ni les grilles.
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-8 sm:px-8 lg:grid-cols-[1fr_380px]">
        <section className="flex flex-col items-center">
          <p className="kicker !text-amber-700">Entraînement à la mise en pratique · série {state.series}</p>
          <h1 className="mb-6 mt-1 text-center font-display text-3xl font-extrabold sm:text-4xl">Qui s’entraîne maintenant ?</h1>
          {!canEdit ? (
            <p className="card p-8 text-center text-sm text-ink-muted">Session clôturée ou d’un autre formateur : l’entraînement n’est pas disponible.</p>
          ) : items.length > 0 ? (
            <>
              <Wheel items={items} onResult={onResult} disabled={!!winnerId || drawingAll} />
              {items.length > 1 && (
                <button className="btn-secondary mt-4" disabled={!!winnerId || drawingAll} onClick={drawAll}>
                  <Shuffle className="h-4 w-4" /> Tirer tout l’ordre d’un coup
                </button>
              )}
            </>
          ) : (
            <div className="card flex flex-col items-center p-10 text-center">
              <Sparkles className="mb-3 h-10 w-10 text-amber-500" />
              <p className="text-lg font-bold">Tous les apprentis présents sont passés dans cette série.</p>
              <button className="btn-primary mt-4" onClick={() => setResetOpen(true)}>
                <RotateCcw className="h-4 w-4" /> Nouvelle série
              </button>
            </div>
          )}
          <p className="mt-4 text-sm text-ink-muted">
            {remaining.length} apprenti(s) restant(s) · {freshLeft} cas pas encore joué(s) sur {pool.length}
          </p>
        </section>

        <aside className="card h-fit p-5">
          <div className="mb-1 flex items-center justify-between gap-2">
            <h2 className="section-title">Passages de la série {state.series}</h2>
            {state.passages.length > 0 && (
              <button className="btn-ghost btn-sm" onClick={() => setOrderOpen(true)}>
                <ListOrdered className="h-4 w-4" /> Afficher en grand
              </button>
            )}
          </div>
          <p className="mb-4 text-xs text-ink-muted">Cliquez sur l’œil pour voir le cas, ou sur son titre pour la mise en situation.</p>
          {state.passages.length === 0 ? (
            <p className="text-sm text-ink-muted">Aucun passage pour l’instant.</p>
          ) : (
            <ol className="space-y-2">
              {state.passages.map((p, i) => {
                const l = learnerById[p.learnerId];
                const kase = p.caseId ? caseById[p.caseId] : null;
                return (
                  <li key={p.learnerId} className="rounded-xl border border-slate-100 p-3">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-500 text-sm font-bold text-white">{i + 1}</span>
                      <span className="min-w-0 flex-1 truncate font-semibold">{l ? `${l.firstName} ${l.lastName}` : 'Apprenti retiré'}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-2 pl-11 text-xs">
                      {kase ? (
                        <>
                          <button className="text-sst-700" onClick={() => setReveal({ ...reveal, [p.learnerId]: !reveal[p.learnerId] })} aria-label={reveal[p.learnerId] ? 'Masquer le cas' : 'Afficher le cas'}>
                            {reveal[p.learnerId] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                          <button className={clsx('flex-1 truncate text-left hover:underline', !reveal[p.learnerId] && 'select-none blur-[5px]')} onClick={() => setShowCase(kase)}>
                            {kase.number ? `n° ${kase.number} – ` : ''}
                            {kase.title}
                          </button>
                        </>
                      ) : (
                        <span className="flex-1 text-ink-muted">Aucun cas</span>
                      )}
                      {canEdit && (
                        <button className="font-semibold text-sst-700 hover:underline" onClick={() => otherCase(p.learnerId)}>
                          Autre cas
                        </button>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </aside>
      </div>

      {winner && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-sst-950/50 p-4 backdrop-blur-sm">
          <Confetti />
          <div className="animate-pop relative w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl">
            <p className="kicker !text-amber-700">Entraînement · passage n° {state.passages.findIndex((p) => p.learnerId === winner.id) + 1}</p>
            <h2 className="mt-2 font-display text-4xl font-extrabold text-sst-800">
              {winner.firstName} {winner.lastName}
            </h2>
            <div className="mt-6 rounded-2xl bg-amber-50 p-4">
              {winnerCase ? (
                <p className="font-semibold text-amber-900">
                  <Dices className="mr-1.5 inline h-5 w-5 align-[-4px]" /> Un cas pratique a été tiré au sort
                </p>
              ) : (
                <p className="text-sm text-ink-muted">Aucun cas disponible.</p>
              )}
              <p className="mt-1 text-xs text-ink-muted">Ouvrez la mise en situation pour la lire à l’apprenti.</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {winnerCase && (
                <button className="btn-secondary" onClick={() => setShowCase(winnerCase)}>
                  <Eye className="h-4 w-4" /> Mise en situation
                </button>
              )}
              <button className="btn-secondary" onClick={() => otherCase(winner.id)}>
                <Dices className="h-4 w-4" /> Autre cas
              </button>
              <button className="btn-primary" onClick={() => setWinnerId(null)}>
                Continuer
              </button>
            </div>
          </div>
        </div>
      )}

      {showCase && <CaseModal kase={showCase} onClose={() => setShowCase(null)} />}

      <Modal
        open={orderOpen}
        onClose={() => setOrderOpen(false)}
        size="lg"
        title={`Ordre de passage – entraînement, série ${state.series}`}
        footer={
          <button className="btn-primary" onClick={() => setOrderOpen(false)}>
            C’est parti !
          </button>
        }
      >
        <ol className="grid gap-2 sm:grid-cols-2">
          {state.passages.map((p, i) => {
            const l = learnerById[p.learnerId];
            return (
              <li key={p.learnerId} className="flex items-center gap-3 rounded-xl bg-amber-50 px-3 py-2">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500 font-bold text-white">{i + 1}</span>
                <span className="text-lg font-bold">{l ? `${l.firstName} ${l.lastName}` : 'Apprenti retiré'}</span>
              </li>
            );
          })}
        </ol>
        <p className="mt-4 text-xs text-ink-muted">Chacun a reçu un cas tiré au hasard, sans répétition. Les cas restent masqués : ouvrez-les au moment du passage.</p>
      </Modal>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Nouvelle série d’entraînement"
        size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => reset(false)}>
              Remettre tous les cas
            </button>
            <button className="btn-primary" onClick={() => reset(true)}>
              Écarter les cas déjà joués
            </button>
          </>
        }
      >
        <p className="text-sm text-ink-soft">
          Tous les apprentis présents reviennent dans la roue. Vous pouvez écarter les cas déjà joués à l’entraînement, pour que chacun découvre de nouvelles situations, ou les remettre tous en jeu.
        </p>
      </Modal>
    </div>
  );
}

/** Mise en situation et actions attendues, pour mener puis débriefer l'exercice (rien n'est enregistré). */
function CaseModal({ kase, onClose }: { kase: PracticalCase; onClose: () => void }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <Modal
      open
      onClose={onClose}
      size="lg"
      title={`${kase.number ? `Cas n° ${kase.number} – ` : ''}${kase.title}`}
      footer={
        <>
          <Link to={`/cas/${kase.id}`} target="_blank" className="btn-ghost">
            <ExternalLink className="h-4 w-4" /> Fiche complète
          </Link>
          <button className="btn-primary" onClick={onClose}>
            Fermer
          </button>
        </>
      }
    >
      <p className="mb-3 text-sm font-semibold text-ink-soft">Geste travaillé : {kase.geste}</p>
      <CaseSheet kase={kase} compact />
      {kase.actions.length > 0 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-ink-muted">Actions attendues (pour le débriefing, rien n’est enregistré)</p>
          <ul className="space-y-1.5">
            {kase.actions.map((a, i) => (
              <li key={i}>
                <label className="flex items-start gap-2 text-sm">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 accent-sst-600" checked={!!done[i]} onChange={(e) => setDone({ ...done, [i]: e.target.checked })} />
                  <span className={clsx(done[i] && 'text-ink-muted line-through')}>{a.text}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Modal>
  );
}

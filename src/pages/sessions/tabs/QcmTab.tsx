import clsx from 'clsx';
import { orderBy } from 'firebase/firestore';
import { CheckCircle2, Copy, Lock, MonitorSmartphone, Play, Smartphone, Trash2, Unlock, Wifi } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyState, errorMessage, Field, Modal, useFeedback } from '../../../components/ui';
import { useAuth } from '../../../hooks/useAuth';
import { useData } from '../../../hooks/useData';
import { useCollection } from '../../../hooks/useFirestore';
import { frDateTime } from '../../../lib/format';
import { pickBalanced, questionMatchesTrade } from '../../../lib/quiz';
import { applySubmissions, createRun, deleteRun, deleteSubmission, resultFor, setRunOpen } from '../../../lib/runOps';
import type { PrivateRun, QuizType, Submission } from '../../../lib/types';
import type { SessionBundle } from '../SessionDetail';

export default function QcmTab(props: SessionBundle) {
  const { session, runs, readOnly } = props;
  const [launching, setLaunching] = useState(false);

  return (
    <div className="space-y-6">
      {!readOnly && (
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="section-title">Faire passer un QCM</h2>
            <p className="text-sm text-ink-muted">
              Entraînement avec correction immédiate, ou évaluation dont le résultat alimente la grille de certification (compétences C1, C6, C7, C8).
            </p>
          </div>
          <button className="btn-primary" onClick={() => setLaunching(true)}>
            <Play className="h-4 w-4" /> Lancer un QCM
          </button>
        </div>
      )}

      {runs.length === 0 ? (
        <EmptyState icon={<Wifi />} title="Aucun QCM lancé dans cette session">
          Les apprentis peuvent répondre sur leur téléphone avec un code, ou sur votre tablette.
        </EmptyState>
      ) : (
        runs.map((run) => <RunCard key={run.id} run={run} {...props} />)
      )}

      {launching && <LaunchModal {...props} onClose={() => setLaunching(false)} sessionId={session.id} />}
    </div>
  );
}

function LaunchModal({ session, learners, onClose }: SessionBundle & { onClose: () => void; sessionId: string }) {
  const { profile } = useAuth();
  const { quizzes, questions, settings, tradeById } = useData();
  const { toast } = useFeedback();
  const navigate = useNavigate();
  const [type, setType] = useState<QuizType>('evaluation');
  const [source, setSource] = useState<string>('auto');
  const [count, setCount] = useState(settings.evaluationQuestionCount);
  const [remote, setRemote] = useState(true);
  const [busy, setBusy] = useState(false);

  const eligible = useMemo(
    () => questions.filter((q) => questionMatchesTrade(q, session.tradeId) && (q.usage === 'both' || q.usage === type)),
    [questions, session.tradeId, type],
  );
  const templates = quizzes.filter((q) => q.type === type && (q.tradeIds.length === 0 || q.tradeIds.includes(session.tradeId)));

  const launch = async () => {
    if (!profile) return;
    setBusy(true);
    try {
      let title: string;
      let selected;
      if (source === 'auto') {
        selected = pickBalanced(eligible, count, session.tradeId);
        title = `${type === 'evaluation' ? 'QCM d’évaluation' : 'QCM d’entraînement'} – ${tradeById[session.tradeId]?.code ?? 'SST'}`;
      } else {
        const tpl = quizzes.find((q) => q.id === source)!;
        const byId = new Map(questions.map((q) => [q.id, q]));
        selected = tpl.questionIds.map((id) => byId.get(id)).filter((q): q is NonNullable<typeof q> => !!q);
        title = tpl.title;
      }
      if (!selected.length) throw new Error('Aucune question disponible : installez ou créez des questions.');
      const run = await createRun({ session, ownerId: profile.uid, title, type, questions: selected, learners, remote });
      onClose();
      if (!remote) navigate(`/sessions/${session.id}/passation?run=${run.id}`);
      else toast(`QCM ouvert : code ${run.code}`);
    } catch (err) {
      toast(errorMessage(err), 'error');
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title="Lancer un QCM"
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={busy} onClick={launch}>
            <Play className="h-4 w-4" /> Lancer
          </button>
        </>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-2">
          {(['evaluation', 'entrainement'] as QuizType[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setType(t);
                setSource('auto');
              }}
              className={clsx('rounded-xl border p-3 text-left', type === t ? 'border-sst-500 bg-sst-50 ring-2 ring-sst-200' : 'border-slate-200')}
            >
              <p className="font-bold">{t === 'evaluation' ? 'Évaluation' : 'Entraînement'}</p>
              <p className="text-xs text-ink-muted">{t === 'evaluation' ? 'Résultat reporté dans l’évaluation, correction cachée' : 'Correction et explication après chaque question'}</p>
            </button>
          ))}
        </div>
        <Field label="Questions">
          <select className="input" value={source} onChange={(e) => setSource(e.target.value)}>
            <option value="auto">Tirage équilibré sur les 8 compétences ({eligible.length} questions disponibles)</option>
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                Modèle : {t.title} ({t.questionIds.length} q.)
              </option>
            ))}
          </select>
        </Field>
        {source === 'auto' && (
          <Field label="Nombre de questions">
            <input className="input w-28" type="number" min={4} max={eligible.length} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </Field>
        )}
        <div className="grid gap-2 sm:grid-cols-2">
          <button type="button" onClick={() => setRemote(true)} className={clsx('flex gap-3 rounded-xl border p-3 text-left', remote ? 'border-sst-500 bg-sst-50 ring-2 ring-sst-200' : 'border-slate-200')}>
            <Smartphone className="h-6 w-6 shrink-0 text-sst-600" />
            <span>
              <span className="block font-bold">Sur les téléphones</span>
              <span className="block text-xs text-ink-muted">Les apprentis saisissent un code sur la page « apprenti ». Résultats en direct.</span>
            </span>
          </button>
          <button type="button" onClick={() => setRemote(false)} className={clsx('flex gap-3 rounded-xl border p-3 text-left', !remote ? 'border-sst-500 bg-sst-50 ring-2 ring-sst-200' : 'border-slate-200')}>
            <MonitorSmartphone className="h-6 w-6 shrink-0 text-sst-600" />
            <span>
              <span className="block font-bold">Sur cet appareil</span>
              <span className="block text-xs text-ink-muted">Vous choisissez l’apprenti et lui confiez la tablette, chacun son tour.</span>
            </span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

function RunCard({ run, session, learners, readOnly }: SessionBundle & { run: PrivateRun }) {
  const { toast, confirm } = useFeedback();
  const navigate = useNavigate();
  const constraints = useMemo(() => [orderBy('submittedAt', 'asc')], []);
  const subs = useCollection<Submission>(run.code ? `publicRuns/${run.code}/submissions` : null, constraints, run.code);
  const applied = new Set(run.appliedLearnerIds ?? []);
  const nameById = Object.fromEntries(learners.map((l) => [l.id, `${l.lastName} ${l.firstName}`]));
  const joinUrl = `${window.location.origin}/apprenti/${run.code}`;

  // Les résultats d'évaluation reçus sont reportés automatiquement dans les évaluations.
  const pendingCount = subs.data.filter((s) => !applied.has(s.learnerId)).length;
  useEffect(() => {
    if (readOnly || run.type !== 'evaluation' || pendingCount === 0) return;
    applySubmissions(session.id, run, subs.data).catch((err) => toast(errorMessage(err), 'error'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingCount, run.type, readOnly]);

  const toggle = async () => {
    try {
      await setRunOpen(session.id, run, !run.open);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };
  const remove = async () => {
    if (!(await confirm({ title: 'Supprimer ce QCM ?', message: 'Les réponses déposées seront supprimées. Les résultats déjà reportés dans les évaluations sont conservés.', danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      for (const s of subs.data) await deleteSubmission(session.id, run, s).catch(() => undefined);
      await deleteRun(session.id, run);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };
  const allowRetake = async (s: Submission) => {
    if (!(await confirm({ title: 'Autoriser une nouvelle tentative ?', message: `La copie de ${nameById[s.learnerId] ?? s.label} sera supprimée ; le prochain envoi remplacera son résultat.` }))) return;
    await deleteSubmission(session.id, run, s).catch((err) => toast(errorMessage(err), 'error'));
  };

  const scores = subs.data.map((s) => ({ s, r: resultFor(run, s.answers ?? {}, 'distance') }));
  const average = scores.length ? scores.reduce((n, x) => n + x.r.score / x.r.total, 0) / scores.length : 0;

  return (
    <div className="card overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={run.type === 'evaluation' ? 'badge-green' : 'badge-blue'}>{run.type === 'evaluation' ? 'Évaluation' : 'Entraînement'}</span>
            {run.code ? (
              <span className={run.open ? 'badge-amber' : 'badge-gray'}>{run.open ? 'Ouvert' : 'Fermé'}</span>
            ) : (
              <span className="badge-gray">Sur appareil</span>
            )}
          </div>
          <h3 className="mt-1 font-bold">{run.title}</h3>
          <p className="text-xs text-ink-muted">
            {run.questions.length} questions · lancé le {frDateTime(run.createdAt)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {run.code && (
            <div className="rounded-2xl bg-sst-700 px-4 py-2 text-center text-white">
              <p className="text-[10px] font-bold uppercase tracking-widest text-sst-200">Code</p>
              <p className="font-mono text-2xl font-extrabold tracking-[0.2em]">{run.code}</p>
            </div>
          )}
          {!readOnly && (
            <>
              {run.code && (
                <button className="btn-secondary btn-sm" onClick={() => navigator.clipboard?.writeText(joinUrl).then(() => toast('Lien copié'))}>
                  <Copy className="h-4 w-4" /> Lien
                </button>
              )}
              {run.code ? (
                <button className="btn-secondary btn-sm" onClick={toggle}>
                  {run.open ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />} {run.open ? 'Fermer' : 'Rouvrir'}
                </button>
              ) : (
                <button className="btn-secondary btn-sm" onClick={() => navigate(`/sessions/${session.id}/passation?run=${run.id}`)}>
                  <Play className="h-4 w-4" /> Reprendre la passation
                </button>
              )}
              <button className="btn-ghost btn-sm text-red-600" onClick={remove} aria-label="Supprimer">
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
      {run.code && (
        <div className="p-5">
          {run.open && (
            <p className="mb-3 text-sm text-ink-soft">
              Les apprentis ouvrent <strong>{window.location.host}/apprenti</strong> et saisissent le code <strong>{run.code}</strong>.
            </p>
          )}
          {subs.data.length === 0 ? (
            <p className="text-sm text-ink-muted">En attente des premières copies…</p>
          ) : (
            <>
              <p className="mb-2 text-sm font-semibold">
                {subs.data.length} copie(s) reçue(s) · moyenne {Math.round(average * 100)} %
              </p>
              <div className="overflow-x-auto">
                <table className="table-base">
                  <thead>
                    <tr>
                      <th>Apprenti</th>
                      <th>Envoyé</th>
                      <th>Score</th>
                      {run.type === 'evaluation' && <th>Évaluation</th>}
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {scores.map(({ s, r }) => (
                      <tr key={s.id}>
                        <td className="font-semibold">{nameById[s.learnerId] ?? s.label}</td>
                        <td className="text-xs">{frDateTime(s.submittedAt)}</td>
                        <td>
                          <span className={r.score / r.total >= 0.7 ? 'badge-green' : 'badge-amber'}>
                            {r.score}/{r.total}
                          </span>
                        </td>
                        {run.type === 'evaluation' && (
                          <td>{applied.has(s.learnerId) ? <span className="inline-flex items-center gap-1 text-xs font-semibold text-sst-700"><CheckCircle2 className="h-4 w-4" /> reporté</span> : <span className="text-xs text-ink-muted">en cours…</span>}</td>
                        )}
                        <td className="text-right">
                          {!readOnly && (
                            <button className="btn-ghost btn-sm" onClick={() => allowRetake(s)}>
                              Nouvelle tentative
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

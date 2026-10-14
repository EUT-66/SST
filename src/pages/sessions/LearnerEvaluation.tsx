import clsx from 'clsx';
import { doc, setDoc } from 'firebase/firestore';
import { AlertTriangle, Award, CheckCircle2, ChevronLeft, ChevronRight, CloudCheck, Dices, Eye, EyeOff, ListChecks, Loader2, MessageSquare, MonitorSmartphone } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CasePicker from '../../components/CasePicker';
import CaseSheet from '../../components/CaseSheet';
import { EmptyState, errorMessage, PageHeader, PageLoader, StatusPill, TriToggle, useFeedback } from '../../components/ui';
import { useData } from '../../hooks/useData';
import { useDocument } from '../../hooks/useFirestore';
import { COMPETENCES, COMPETENCE_LABELS, COMPETENCE_ORDER, INDICATOR_BY_ID } from '../../lib/competences';
import { db } from '../../lib/firebase';
import { frDate, frDateTime } from '../../lib/format';
import { proposeIndicators, summarize, type SourceKind } from '../../lib/grid';
import type { ActionStatus, Evaluation, IndicatorId, ItemStatus, PreventionKey } from '../../lib/types';
import { useSessionBundle } from './SessionDetail';

type Editable = Pick<Evaluation, 'actions' | 'prevention' | 'entretien' | 'manual' | 'observations'>;

const EMPTY: Editable = { actions: {}, prevention: {}, entretien: {}, manual: {}, observations: '' };

const SOURCE_LABEL: Record<SourceKind, string> = {
  action: 'Action',
  prevention: 'Prévention',
  entretien: 'Entretien',
  qcm: 'QCM',
  manual: 'Formateur',
};

export default function LearnerEvaluation() {
  const { sid, lid } = useParams();
  const navigate = useNavigate();
  const { session, learners, loading } = useSessionBundle(sid);
  const evalDoc = useDocument<Evaluation>(sid && lid ? `sessions/${sid}/evaluations/${lid}` : null);
  const { caseById, settings, tradeById } = useData();
  const { toast } = useFeedback();
  const [state, setState] = useState<Editable | null>(null);
  const [saving, setSaving] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [showCase, setShowCase] = useState(false);
  const [picking, setPicking] = useState(false);
  const dirty = useRef(false);

  const learner = learners.find((l) => l.id === lid);
  const kase = learner?.caseId ? caseById[learner.caseId] : null;
  const readOnly = session?.status === 'closed';

  // Initialisation depuis Firestore (une seule fois par apprenti)
  useEffect(() => {
    setState(null);
    dirty.current = false;
    setShowCase(false);
  }, [lid]);
  useEffect(() => {
    if (state || evalDoc.loading) return;
    const d = evalDoc.data;
    setState(d ? { actions: d.actions ?? {}, prevention: d.prevention ?? {}, entretien: d.entretien ?? {}, manual: d.manual ?? {}, observations: d.observations ?? '' } : EMPTY);
  }, [evalDoc.loading, evalDoc.data, state]);
  // Changement de cas : les réponses de l'ancien cas ne s'appliquent plus (elles sont aussi effacées côté serveur).
  const caseRef = useRef<{ id: string; caseId: string | null } | null>(null);
  useEffect(() => {
    if (!learner) return;
    const current = { id: learner.id, caseId: learner.caseId ?? null };
    const prev = caseRef.current;
    if (prev && prev.id === current.id && prev.caseId !== current.caseId) {
      setState((s) => (s ? { ...s, actions: {}, prevention: {} } : s));
    }
    caseRef.current = current;
  }, [learner]);

  // Enregistrement automatique
  useEffect(() => {
    if (!state || !dirty.current || !sid || !lid || readOnly) return;
    setSaving('saving');
    const t = setTimeout(async () => {
      try {
        await setDoc(
          doc(db, 'sessions', sid, 'evaluations', lid),
          { learnerId: lid, caseId: learner?.caseId ?? null, ...state, updatedAt: Date.now() },
          { mergeFields: ['learnerId', 'caseId', 'actions', 'prevention', 'entretien', 'manual', 'observations', 'updatedAt'] },
        );
        setSaving('saved');
      } catch (err) {
        setSaving('idle');
        toast(errorMessage(err), 'error');
      }
    }, 700);
    return () => clearTimeout(t);
  }, [state, sid, lid, learner?.caseId, readOnly, toast]);

  const ev: Evaluation = useMemo(
    () => ({ learnerId: lid ?? '', caseId: learner?.caseId, ...(state ?? EMPTY), qcm: evalDoc.data?.qcm ?? null }),
    [state, evalDoc.data?.qcm, lid, learner?.caseId],
  );
  const proposals = useMemo(() => proposeIndicators(kase, ev, settings), [kase, ev, settings]);
  const summary = useMemo(() => summarize(kase, ev, settings), [kase, ev, settings]);

  if (loading || evalDoc.loading || !state) return <PageLoader />;
  if (!session || !learner) return <EmptyState title="Apprenti introuvable" />;

  const update = (patch: Partial<Editable>) => {
    if (readOnly) return;
    dirty.current = true;
    setState((s) => ({ ...(s ?? EMPTY), ...patch }));
  };
  const setMap = <K extends 'actions' | 'prevention' | 'entretien' | 'manual'>(key: K, k: string, v: string | null) => {
    const next = { ...(state[key] ?? {}) } as Record<string, string>;
    if (v === null) delete next[k];
    else next[k] = v;
    update({ [key]: next } as Partial<Editable>);
  };

  // Navigation entre apprentis dans l'ordre de passage
  const order = [...learners].sort((a, b) => (a.drawOrder ?? 999) - (b.drawOrder ?? 999) || a.lastName.localeCompare(b.lastName, 'fr'));
  const idx = order.findIndex((l) => l.id === learner.id);
  const prev = order[idx - 1];
  const next = order[idx + 1];

  const uncovered = (Object.keys(proposals) as IndicatorId[]).filter((id) => proposals[id].uncovered && !proposals[id].manual);

  return (
    <div>
      <PageHeader
        back={{ to: `/sessions/${session.id}?onglet=resultats`, label: session.title }}
        kicker={`${tradeById[session.tradeId]?.label ?? ''}${learner.drawOrder ? ` · Passage n° ${learner.drawOrder}` : ''}`}
        title={`${learner.firstName} ${learner.lastName}`}
        subtitle={learner.birthDate ? `Né(e) le ${frDate(learner.birthDate)}` : 'Date de naissance à compléter'}
        actions={
          <>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-muted">
              {readOnly ? 'Lecture seule' : saving === 'saving' ? <><Loader2 className="h-4 w-4 animate-spin" /> Enregistrement…</> : saving === 'saved' ? <><CloudCheck className="h-4 w-4 text-sst-600" /> Enregistré</> : null}
            </span>
            <button className="btn-ghost btn-sm" disabled={!prev} onClick={() => prev && navigate(`/sessions/${session.id}/evaluation/${prev.id}`)} aria-label="Apprenti précédent">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="btn-ghost btn-sm" disabled={!next} onClick={() => next && navigate(`/sessions/${session.id}/evaluation/${next.id}`)} aria-label="Apprenti suivant">
              <ChevronRight className="h-4 w-4" />
            </button>
            <Link to={`/sessions/${session.id}/grille/${learner.id}`} className="btn-primary">
              <Award className="h-4 w-4" /> Grille de certification
            </Link>
          </>
        }
      />

      {evalDoc.data?.gridEdited && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-sky-200 bg-sky-50 p-4 text-sm text-sky-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p>
            La grille de certification a déjà été vérifiée et enregistrée. Les modifications faites ici ne la mettent plus à jour : ouvrez la grille et cliquez sur « Recalculer depuis l’évaluation » si besoin.
          </p>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          {/* Cas pratique */}
          <Section
            icon={<Dices className="h-5 w-5" />}
            title="Mise en situation"
            right={
              !readOnly && (
                <button className="btn-secondary btn-sm" onClick={() => setPicking(true)}>
                  <Dices className="h-4 w-4" /> {kase ? 'Changer le cas' : 'Tirer / choisir un cas'}
                </button>
              )
            }
          >
            {kase ? (
              <>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <div className={clsx(!showCase && 'select-none blur-md')}>
                    <p className="font-bold">
                      Cas n° {kase.number ?? '–'} – {kase.title}
                    </p>
                    <p className="text-sm text-ink-muted">Geste évalué : {kase.geste}</p>
                  </div>
                  <button className="btn-secondary btn-sm" onClick={() => setShowCase(!showCase)}>
                    {showCase ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />} {showCase ? 'Masquer' : 'Afficher le cas'}
                  </button>
                </div>
                {showCase ? <CaseSheet kase={kase} /> : <p className="text-sm text-ink-muted">Le sujet est masqué pour que l’apprenti ne le découvre qu’au moment de son passage.</p>}
              </>
            ) : (
              <p className="text-sm text-ink-muted">Aucun cas pratique attribué. Tirez-en un au sort ou choisissez-le.</p>
            )}
          </Section>

          {/* Épreuve 1 */}
          {kase && (
            <Section icon={<CheckCircle2 className="h-5 w-5" />} title="Épreuve 1 – Actions attendues du SST" subtitle={`${summary.actionsDone}/${summary.actionsTotal} actions faites`}>
              <ul className="divide-y divide-slate-100">
                {kase.actions.map((a, i) => (
                  <li key={i} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm">
                        <span className="mr-1 font-bold text-sst-700">{i + 1}.</span> {a.text}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {a.indicators.map((id) => (
                          <span key={id} title={INDICATOR_BY_ID[id].text} className={clsx('rounded px-1.5 py-0.5 text-[10px] font-bold', INDICATOR_BY_ID[id].key ? 'bg-yellow-200 text-yellow-900' : 'bg-slate-100 text-slate-600')}>
                            {id}
                          </span>
                        ))}
                      </div>
                    </div>
                    <TriToggle<ActionStatus> value={state.actions[String(i)]} onChange={(v) => setMap('actions', String(i), v)} yes="fait" no="non_fait" yesLabel="Fait" noLabel="Non fait" disabled={readOnly} />
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Épreuve 2 */}
          <Section icon={<MessageSquare className="h-5 w-5" />} title="Épreuve 2 – Entretien" subtitle="Prévention à partir de la situation simulée, et questions sur le cadre de l’activité SST">
            {kase && (
              <ul className="divide-y divide-slate-100">
                {kase.prevention.map((p) => (
                  <li key={p.key} className="flex flex-col gap-2 py-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <p className="text-sm font-bold">
                        {p.label} <span className="ml-1 text-[10px] font-bold text-slate-500">{p.indicators.join(' · ')}</span>
                      </p>
                      <p className="text-sm text-ink-muted">{p.answer}</p>
                    </div>
                    <TriToggle<ItemStatus> value={state.prevention[p.key as PreventionKey]} onChange={(v) => setMap('prevention', p.key, v)} yes="acquis" no="non_acquis" yesLabel="Acquis" noLabel="Non acquis" disabled={readOnly} />
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-2 space-y-3 rounded-2xl bg-sst-50/60 p-4">
              <p className="text-xs font-bold uppercase tracking-widest text-sst-700">Questions d’entretien</p>
              {(
                [
                  ['C1a', 'Quelles sont les limites de ton intervention en tant que SST ?'],
                  ['C6a', 'Comment peux-tu contribuer concrètement à la prévention dans ton entreprise ?'],
                  ['C7a', 'À partir d’une autre situation dangereuse de ton métier : quels risques et quels autres dommages possibles ?'],
                ] as [IndicatorId, string][]
              ).map(([id, q]) => (
                <div key={id} className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm">
                    <span className="mr-1 text-[10px] font-bold text-slate-500">{id}</span> {q}
                  </p>
                  <TriToggle<ItemStatus> size="sm" value={state.entretien?.[id]} onChange={(v) => setMap('entretien', id, v)} yes="acquis" no="non_acquis" yesLabel="Acquis" noLabel="Non acquis" disabled={readOnly} />
                </div>
              ))}
            </div>
          </Section>

          {/* QCM */}
          <Section
            icon={<ListChecks className="h-5 w-5" />}
            title="QCM d’évaluation"
            right={
              !readOnly && (
                <Link to={`/sessions/${session.id}/passation?learner=${learner.id}`} className="btn-secondary btn-sm">
                  <MonitorSmartphone className="h-4 w-4" /> {ev.qcm ? 'Refaire passer' : 'Faire passer sur cet appareil'}
                </Link>
              )
            }
          >
            {ev.qcm ? (
              <div>
                <p className="text-sm">
                  <strong className="text-lg">
                    {ev.qcm.score}/{ev.qcm.total}
                  </strong>{' '}
                  ({Math.round((ev.qcm.score / ev.qcm.total) * 100)} %) · {ev.qcm.quizTitle} · {frDateTime(ev.qcm.date)}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {COMPETENCE_ORDER.filter((c) => ev.qcm!.byCompetence[c]).map((c) => {
                    const s = ev.qcm!.byCompetence[c]!;
                    const ok = s.correct / s.total >= settings.qcmThreshold;
                    return (
                      <span key={c} className={ok ? 'badge-green' : 'badge-amber'} title={COMPETENCE_LABELS[c]}>
                        {c} : {s.correct}/{s.total}
                      </span>
                    );
                  })}
                </div>
              </div>
            ) : (
              <p className="text-sm text-ink-muted">Pas encore de résultat. Lancez un QCM d’évaluation depuis l’onglet QCM de la session (sur téléphone) ou faites-le passer ici.</p>
            )}
          </Section>

          {/* Indicateurs */}
          <Section icon={<Award className="h-5 w-5" />} title="Proposition pour la grille" subtitle="Calculée à partir des éléments ci-dessus. Vous pouvez trancher indicateur par indicateur.">
            {uncovered.length > 0 && (
              <p className="mb-3 rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">
                {uncovered.length} indicateur(s) ne sont pas couverts par la fiche ou le QCM : évaluez-les directement ({uncovered.join(', ')}).
              </p>
            )}
            <div className="space-y-4">
              {COMPETENCES.map((comp) => (
                <div key={comp.id} className="rounded-2xl border border-slate-100">
                  <div className="flex items-center justify-between rounded-t-2xl bg-slate-50 px-4 py-2">
                    <p className="text-sm font-bold">
                      {comp.id} · {comp.short}
                    </p>
                    <StatusPill value={summary.competences[comp.id] === 'acquise' ? true : summary.competences[comp.id] === 'non_acquise' ? false : null} />
                  </div>
                  <ul className="divide-y divide-slate-100">
                    {comp.groups.flatMap((g) => g.indicators).map((ind) => {
                      const prop = proposals[ind.id];
                      return (
                        <li key={ind.id} className="flex flex-col gap-2 px-4 py-2.5 lg:flex-row lg:items-center lg:justify-between">
                          <div className="min-w-0">
                            <p className="text-sm">
                              <span className={clsx('mr-1 rounded px-1 text-[10px] font-bold', ind.key ? 'bg-yellow-200 text-yellow-900' : 'bg-slate-100 text-slate-600')}>{ind.id}</span>
                              {ind.text}
                            </p>
                            <p className="mt-0.5 text-[11px] text-ink-muted">
                              {prop.sources.length === 0
                                ? 'Aucune donnée : à évaluer'
                                : prop.sources.map((s) => `${SOURCE_LABEL[s.kind]} ${s.value === true ? '✓' : s.value === false ? '✗' : '…'}`).join(' · ')}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!prop.manual && (
                              <StatusPill value={prop.value === 'acquis' ? true : prop.value === 'non_acquis' ? false : null} yes="Proposé : acquis" no="Proposé : non acquis" empty="À évaluer" />
                            )}
                            <TriToggle<ItemStatus>
                              size="sm"
                              value={state.manual[ind.id]}
                              onChange={(v) => setMap('manual', ind.id, v)}
                              yes="acquis"
                              no="non_acquis"
                              yesLabel="Acquis"
                              noLabel="Non acquis"
                              disabled={readOnly}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </Section>

          <Section icon={<MessageSquare className="h-5 w-5" />} title="Observations">
            <textarea className="input min-h-[110px]" disabled={readOnly} value={state.observations ?? ''} onChange={(e) => update({ observations: e.target.value })} placeholder="Points forts, points à retravailler…" />
          </Section>
        </div>

        {/* Bilan */}
        <aside className="h-fit space-y-4 xl:sticky xl:top-6">
          <div className="card p-5">
            <h2 className="section-title mb-3">Bilan</h2>
            <dl className="space-y-2 text-sm">
              <BilanRow label="Épreuve 1" value={summary.epreuve1} yes="Validée" no="À retravailler" />
              <BilanRow label="Épreuve 2" value={summary.epreuve2} yes="Validée" no="À retravailler" />
              <div className="flex items-center justify-between">
                <dt className="font-semibold">QCM</dt>
                <dd>{ev.qcm ? <span className="badge-gray">{ev.qcm.score}/{ev.qcm.total}</span> : <span className="badge-amber">Non passé</span>}</dd>
              </div>
            </dl>
            <div className="mt-4 grid grid-cols-4 gap-1.5">
              {COMPETENCE_ORDER.map((c) => (
                <span
                  key={c}
                  title={COMPETENCE_LABELS[c]}
                  className={clsx(
                    'rounded-lg py-1.5 text-center text-xs font-bold',
                    summary.competences[c] === 'acquise' && 'bg-sst-600 text-white',
                    summary.competences[c] === 'non_acquise' && 'bg-red-500 text-white',
                    !summary.competences[c] && 'bg-slate-100 text-slate-500',
                  )}
                >
                  {c}
                </span>
              ))}
            </div>
            <div
              className={clsx(
                'mt-4 rounded-2xl p-4 text-center font-display text-lg font-extrabold',
                summary.certified === true && 'bg-sst-600 text-white',
                summary.certified === false && 'bg-red-50 text-red-700',
                summary.certified === null && 'bg-slate-50 text-ink-muted',
              )}
            >
              {summary.certified === true ? 'Certification proposée' : summary.certified === false ? 'Non certifié à ce stade' : 'Évaluation en cours'}
            </div>
            <Link to={`/sessions/${session.id}/grille/${learner.id}`} className="btn-primary mt-4 w-full">
              <Award className="h-4 w-4" /> Ouvrir la grille officielle
            </Link>
          </div>
        </aside>
      </div>

      {picking && <CasePicker session={session} learner={learner} onClose={() => setPicking(false)} />}
    </div>
  );
}

function Section({ icon, title, subtitle, right, children }: { icon: ReactNode; title: string; subtitle?: string; right?: ReactNode; children: ReactNode }) {
  return (
    <section className="card p-5 sm:p-6">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sst-50 text-sst-600">{icon}</div>
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="text-xs text-ink-muted">{subtitle}</p>}
          </div>
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

function BilanRow({ label, value, yes, no }: { label: string; value: boolean | null; yes: string; no: string }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="font-semibold">{label}</dt>
      <dd>
        <StatusPill value={value} yes={yes} no={no} />
      </dd>
    </div>
  );
}

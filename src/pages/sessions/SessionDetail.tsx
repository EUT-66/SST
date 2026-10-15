import { doc, updateDoc } from 'firebase/firestore';
import { Award, Dices, ListChecks, Lock, Settings, Unlock, Users } from 'lucide-react';
import { useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { EmptyState, errorMessage, PageHeader, PageLoader, Tabs, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { useCollection, useDocument } from '../../hooks/useFirestore';
import { db } from '../../lib/firebase';
import { frDate, frDateTime } from '../../lib/format';
import { FORMATION_LABELS, formationOf, PHASE_LABELS, sessionPhase } from '../../lib/sessions';
import type { Evaluation, Learner, PrivateRun, Session } from '../../lib/types';
import LearnersTab from './tabs/LearnersTab';
import QcmTab from './tabs/QcmTab';
import ResultsTab from './tabs/ResultsTab';
import SessionSettingsTab from './tabs/SessionSettingsTab';

export interface SessionBundle {
  session: Session;
  learners: Learner[];
  evaluations: Record<string, Evaluation>;
  runs: PrivateRun[];
  readOnly: boolean;
}

export function useSessionBundle(sid: string | undefined) {
  const session = useDocument<Session>(sid ? `sessions/${sid}` : null);
  const learners = useCollection<Learner>(sid ? `sessions/${sid}/learners` : null);
  const evaluations = useCollection<Evaluation & { id: string }>(sid ? `sessions/${sid}/evaluations` : null);
  const runs = useCollection<PrivateRun>(sid ? `sessions/${sid}/runs` : null);
  const sortedLearners = useMemo(
    () => [...learners.data].sort((a, b) => `${a.lastName} ${a.firstName}`.localeCompare(`${b.lastName} ${b.firstName}`, 'fr')),
    [learners.data],
  );
  const evalMap = useMemo(() => Object.fromEntries(evaluations.data.map((e) => [e.id, e])), [evaluations.data]);
  const sortedRuns = useMemo(() => [...runs.data].sort((a, b) => b.createdAt - a.createdAt), [runs.data]);
  return {
    loading: session.loading || learners.loading,
    error: session.error,
    session: session.data,
    learners: sortedLearners,
    evaluations: evalMap,
    runs: sortedRuns,
  };
}

type Tab = 'apprentis' | 'qcm' | 'resultats' | 'parametres';

export default function SessionDetail() {
  const { sid } = useParams();
  const { profile } = useAuth();
  const { tradeById } = useData();
  const { toast } = useFeedback();
  const [params, setParams] = useSearchParams();
  const tab = (params.get('onglet') as Tab) || 'apprentis';
  const data = useSessionBundle(sid);

  if (data.loading) return <PageLoader />;
  if (!data.session)
    return (
      <EmptyState icon={<Lock />} title="Session introuvable">
        Elle a peut-être été supprimée, ou vous n’y avez pas accès.
      </EmptyState>
    );

  const session = data.session;
  const phase = sessionPhase(session);
  const isOwner = session.trainerId === profile?.uid || profile?.role === 'admin';
  const readOnly = session.status === 'closed' || !isOwner;
  const bundle: SessionBundle = { session, learners: data.learners, evaluations: data.evaluations, runs: data.runs, readOnly };

  const reopen = async () => {
    try {
      await updateDoc(doc(db, 'sessions', session.id), { status: 'active', closedAt: null, updatedAt: Date.now() });
      toast('Session rouverte');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      <PageHeader
        back={{ to: '/sessions', label: 'Sessions' }}
        kicker={`${formationOf(session) === 'mac' ? `MAC – ${FORMATION_LABELS.mac}` : FORMATION_LABELS.initiale} · ${tradeById[session.tradeId]?.label ?? 'Métier non défini'}${session.groupName ? ` · ${session.groupName}` : ''}`}
        title={session.title}
        subtitle={
          <>
            Du {frDate(session.startDate)} au {frDate(session.endDate)}
            {session.location ? ` · ${session.location}` : ''} · {session.learnerCount ?? data.learners.length} apprenti(s) ·{' '}
            <span className="font-semibold text-sst-700">{PHASE_LABELS[phase]}</span>
            {session.trainerId !== profile?.uid && ` · Formateur : ${session.trainerName}`}
          </>
        }
        actions={
          !readOnly && (
            <Link to={`/sessions/${session.id}/tirage`} className="btn-primary">
              <Dices className="h-4 w-4" /> Tirage au sort
            </Link>
          )
        }
      />

      {session.status === 'closed' && (
        <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-sm text-ink-soft">
            <Lock className="h-4 w-4" /> Session clôturée le {frDateTime(session.closedAt)} : consultation et téléchargement des grilles uniquement.
          </p>
          {isOwner && (
            <button className="btn-secondary btn-sm" onClick={reopen}>
              <Unlock className="h-4 w-4" /> Rouvrir
            </button>
          )}
        </div>
      )}

      <Tabs
        value={tab}
        onChange={(t) => setParams({ onglet: t }, { replace: true })}
        tabs={[
          { id: 'apprentis', label: 'Apprentis', icon: <Users className="h-4 w-4" /> },
          { id: 'qcm', label: 'QCM', icon: <ListChecks className="h-4 w-4" /> },
          { id: 'resultats', label: 'Évaluations et grilles', icon: <Award className="h-4 w-4" /> },
          { id: 'parametres', label: 'Paramètres', icon: <Settings className="h-4 w-4" /> },
        ]}
      />

      {tab === 'apprentis' && <LearnersTab {...bundle} />}
      {tab === 'qcm' && <QcmTab {...bundle} />}
      {tab === 'resultats' && <ResultsTab {...bundle} />}
      {tab === 'parametres' && <SessionSettingsTab {...bundle} canEdit={isOwner} />}
    </div>
  );
}

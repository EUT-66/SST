import { Archive, ClipboardList, Lock, Plus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, PageHeader, PageLoader, Tabs } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { useSessions } from '../../hooks/useSessions';
import { frDate } from '../../lib/format';
import { archiveYear, FORMATION_SHORT, formationOf, PHASE_LABELS, sessionPhase, type SessionPhase } from '../../lib/sessions';
import type { Session } from '../../lib/types';

type Tab = 'actives' | 'cloturees' | 'archives';

const PHASE_BADGE: Record<SessionPhase, string> = {
  a_venir: 'badge-blue',
  en_cours: 'badge-green',
  a_cloturer: 'badge-amber',
  cloturee: 'badge-gray',
  archivee: 'badge-gray',
};

export default function SessionsList() {
  const { can, profile } = useAuth();
  const [scope, setScope] = useState<'mine' | 'all'>('mine');
  const sessions = useSessions(scope);
  const [tab, setTab] = useState<Tab>('actives');

  const groups = useMemo(() => {
    const actives: Session[] = [];
    const closed: Session[] = [];
    const archives = new Map<number, Session[]>();
    for (const s of sessions.data) {
      const phase = sessionPhase(s);
      if (phase === 'cloturee') closed.push(s);
      else if (phase === 'archivee') {
        const y = archiveYear(s);
        archives.set(y, [...(archives.get(y) ?? []), s]);
      } else actives.push(s);
    }
    return { actives, closed, archives: [...archives.entries()].sort((a, b) => b[0] - a[0]) };
  }, [sessions.data]);

  return (
    <div>
      <PageHeader
        kicker="Formations"
        title="Sessions"
        subtitle="Une session terminée se clôture, puis rejoint automatiquement les archives au 1er janvier suivant."
        actions={
          <>
            {can('viewAllSessions') && (
              <select className="input w-auto py-2" value={scope} onChange={(e) => setScope(e.target.value as 'mine' | 'all')}>
                <option value="mine">Mes sessions</option>
                <option value="all">Toute l’équipe</option>
              </select>
            )}
            <Link to="/sessions/nouvelle" className="btn-primary">
              <Plus className="h-4 w-4" /> Nouvelle session
            </Link>
          </>
        }
      />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'actives', label: 'En cours et à venir', icon: <ClipboardList className="h-4 w-4" />, badge: <span className="badge-green">{groups.actives.length}</span> },
          { id: 'cloturees', label: 'Clôturées', icon: <Lock className="h-4 w-4" />, badge: <span className="badge-gray">{groups.closed.length}</span> },
          { id: 'archives', label: 'Archives', icon: <Archive className="h-4 w-4" /> },
        ]}
      />
      {sessions.loading ? (
        <PageLoader />
      ) : tab === 'actives' ? (
        groups.actives.length ? (
          <SessionGrid sessions={groups.actives} showTrainer={scope === 'all'} myUid={profile?.uid} />
        ) : (
          <EmptyState
            icon={<ClipboardList />}
            title="Aucune session en cours"
            action={
              <Link to="/sessions/nouvelle" className="btn-primary">
                <Plus className="h-4 w-4" /> Créer une session
              </Link>
            }
          >
            Créez une session, importez le fichier CSV de vos apprentis (export Netyparéo) et c’est parti.
          </EmptyState>
        )
      ) : tab === 'cloturees' ? (
        groups.closed.length ? (
          <SessionGrid sessions={groups.closed} showTrainer={scope === 'all'} myUid={profile?.uid} />
        ) : (
          <EmptyState icon={<Lock />} title="Aucune session clôturée cette année" />
        )
      ) : groups.archives.length ? (
        <div className="space-y-8">
          {groups.archives.map(([year, list]) => (
            <section key={year}>
              <h2 className="section-title mb-3">Année {year}</h2>
              <SessionGrid sessions={list} showTrainer={scope === 'all'} myUid={profile?.uid} />
            </section>
          ))}
        </div>
      ) : (
        <EmptyState icon={<Archive />} title="Aucune archive">
          Les sessions clôturées sont archivées automatiquement l’année suivante.
        </EmptyState>
      )}
    </div>
  );
}

function SessionGrid({ sessions, showTrainer, myUid }: { sessions: Session[]; showTrainer: boolean; myUid?: string }) {
  const { tradeById } = useData();
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {sessions.map((s) => {
        const phase = sessionPhase(s);
        return (
          <Link key={s.id} to={`/sessions/${s.id}`} className="card group flex flex-col p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
            <div className="mb-3 flex items-start justify-between gap-3">
              <span className="flex flex-wrap gap-1.5">
                <span className="rounded-lg bg-sst-600 px-2.5 py-1 font-display text-xs font-extrabold text-white">{tradeById[s.tradeId]?.code ?? 'SST'}</span>
                <span className={formationOf(s) === 'mac' ? 'badge-amber' : 'badge-green'}>{FORMATION_SHORT[formationOf(s)]}</span>
              </span>
              <span className={PHASE_BADGE[phase]}>{PHASE_LABELS[phase]}</span>
            </div>
            <h3 className="font-bold leading-snug group-hover:text-sst-700">{s.title}</h3>
            <p className="mt-1 text-sm text-ink-muted">{tradeById[s.tradeId]?.label ?? 'Métier non défini'}</p>
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ink-soft">
              <span>
                Du {frDate(s.startDate)} au {frDate(s.endDate)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" /> {s.learnerCount ?? 0}
              </span>
            </div>
            {showTrainer && s.trainerId !== myUid && <p className="mt-2 text-xs text-ink-muted">Formateur : {s.trainerName}</p>}
          </Link>
        );
      })}
    </div>
  );
}

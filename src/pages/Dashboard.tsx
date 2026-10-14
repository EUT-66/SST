import { where } from 'firebase/firestore';
import { ArrowRight, BookOpen, Briefcase, CalendarDays, ClipboardList, ListChecks, Plus, Sparkles, UserPlus } from 'lucide-react';
import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { PageLoader } from '../components/ui';
import { CONTENT_VERSION } from '../data/version';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { useCollection } from '../hooks/useFirestore';
import { useSessions } from '../hooks/useSessions';
import { frDate } from '../lib/format';
import { PHASE_LABELS, sessionPhase } from '../lib/sessions';
import type { UserProfile } from '../lib/types';

export default function Dashboard() {
  const { profile, can } = useAuth();
  const { settings, courses, cases, questions, tradeById, loading } = useData();
  const sessions = useSessions();
  const pendingConstraints = useMemo(() => [where('role', '==', 'pending')], []);
  const pending = useCollection<UserProfile>(can('manageUsers') ? 'users' : null, pendingConstraints, 'pending');

  const active = sessions.data.filter((s) => ['a_venir', 'en_cours', 'a_cloturer'].includes(sessionPhase(s)));
  const learners = active.reduce((n, s) => n + (s.learnerCount ?? 0), 0);
  const hour = new Date().getHours();

  if (loading) return <PageLoader />;

  return (
    <div>
      <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-sst-600 via-sst-700 to-sst-800 p-6 text-white sm:p-8">
        <p className="kicker !text-sst-200">{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        <h1 className="mt-1 font-display text-3xl font-extrabold !text-white">
          {hour < 18 ? 'Bonjour' : 'Bonsoir'} {profile?.firstName} !
        </h1>
        <p className="mt-2 max-w-xl text-sst-100">Protéger, examiner, faire alerter, secourir : retrouvez ici vos sessions, vos supports et vos évaluations.</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/sessions/nouvelle" className="btn bg-white text-sst-800 hover:bg-sst-50">
            <Plus className="h-4 w-4" /> Nouvelle session
          </Link>
          <Link to="/cours" className="btn border border-white/30 text-white hover:bg-white/10">
            <BookOpen className="h-4 w-4" /> Ouvrir un cours
          </Link>
        </div>
        <svg className="pointer-events-none absolute -right-10 -top-10 h-64 w-64 text-white/10" viewBox="0 0 64 64" fill="currentColor">
          <path d="M26 6h12v20h20v12H38v20H26V38H6V26h20z" />
        </svg>
      </div>

      {can('manageSettings') && (settings.contentVersion ?? 0) < CONTENT_VERSION && (
        <div className="card mb-6 flex flex-col gap-4 border-amber-200 bg-amber-50 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <Sparkles className="mt-0.5 h-6 w-6 shrink-0 text-amber-600" />
            <div>
              <p className="font-bold">{settings.contentVersion ? 'Nouveaux contenus disponibles' : 'Installez le contenu pédagogique'}</p>
              <p className="text-sm text-ink-soft">
                {settings.contentVersion
                  ? 'De nouveaux supports de cours sont prêts (un par métier). Cliquez sur « Installer ce qui manque » : vos contenus actuels ne sont pas modifiés.'
                  : 'Supports de cours par métier et aide-mémoire, banque de QCM, 18 cas pratiques MIT et propositions pour les autres métiers du BTP.'}
              </p>
            </div>
          </div>
          <Link to="/admin/parametres" className="btn-primary">
            Installer <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {pending.data.length > 0 && (
        <Link to="/admin/utilisateurs" className="card mb-6 flex items-center gap-3 border-sst-200 p-4 hover:bg-sst-50">
          <UserPlus className="h-6 w-6 text-sst-600" />
          <p className="font-semibold">
            {pending.data.length} demande{pending.data.length > 1 ? 's' : ''} d’accès formateur à valider
          </p>
          <ArrowRight className="ml-auto h-5 w-5 text-sst-600" />
        </Link>
      )}

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Stat icon={<ClipboardList />} value={active.length} label="sessions actives" to="/sessions" />
        <Stat icon={<CalendarDays />} value={learners} label="apprentis en formation" to="/sessions" />
        <Stat icon={<ListChecks />} value={questions.length} label="questions de QCM" to="/qcm" />
        <Stat icon={<Briefcase />} value={cases.length} label="cas pratiques" to="/cas" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="section-title">Mes sessions en cours et à venir</h2>
            <Link to="/sessions" className="text-sm font-semibold text-sst-700 hover:underline">
              Tout voir
            </Link>
          </div>
          {active.length === 0 ? (
            <p className="text-sm text-ink-muted">Aucune session active. Créez votre première session en important votre liste d’apprentis.</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {active.slice(0, 6).map((s) => (
                <li key={s.id}>
                  <Link to={`/sessions/${s.id}`} className="flex items-center gap-4 py-3 hover:text-sst-700">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sst-50 font-display text-sm font-extrabold text-sst-700">
                      {tradeById[s.tradeId]?.code ?? '—'}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{s.title}</p>
                      <p className="text-xs text-ink-muted">
                        Du {frDate(s.startDate)} au {frDate(s.endDate)} · {s.learnerCount ?? 0} apprenti(s)
                      </p>
                    </div>
                    <span className="badge-green hidden sm:inline-flex">{PHASE_LABELS[sessionPhase(s)]}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="card p-6">
          <h2 className="section-title mb-4">Supports de cours</h2>
          <ul className="space-y-2">
            {courses.slice(0, 5).map((c) => (
              <li key={c.id}>
                <Link to={`/cours/${c.id}`} className="flex items-center gap-3 rounded-xl p-2 hover:bg-sst-50">
                  <BookOpen className="h-5 w-5 text-sst-600" />
                  <span className="flex-1 text-sm font-semibold">{c.title}</span>
                  <span className="text-xs text-ink-muted">{c.slides.length} diapos</span>
                </Link>
              </li>
            ))}
            {courses.length === 0 && <p className="text-sm text-ink-muted">Aucun support pour le moment.</p>}
          </ul>
        </section>
      </div>
    </div>
  );
}

function Stat({ icon, value, label, to }: { icon: React.ReactNode; value: number; label: string; to: string }) {
  return (
    <Link to={to} className="card flex items-center gap-4 p-5 transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sst-50 text-sst-600">{icon}</div>
      <div>
        <p className="font-display text-2xl font-extrabold">{value}</p>
        <p className="text-xs font-semibold text-ink-muted">{label}</p>
      </div>
    </Link>
  );
}

import clsx from 'clsx';
import {
  BookOpen,
  Briefcase,
  ClipboardList,
  HeartPulse,
  LayoutDashboard,
  ListChecks,
  LogOut,
  Menu,
  Settings,
  UserCircle,
  Users,
  X,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { ROLE_SHORT } from '../lib/permissions';

interface NavItem {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className={clsx('flex h-10 w-10 items-center justify-center rounded-2xl', light ? 'bg-white/15' : 'bg-sst-600')}>
        <HeartPulse className="h-6 w-6 text-white" />
      </div>
      <div className="leading-tight">
        <p className={clsx('font-display text-lg font-extrabold', light ? 'text-white' : 'text-ink')}>Mon espace SST</p>
        <p className={clsx('text-[11px] font-semibold uppercase tracking-wider', light ? 'text-sst-200' : 'text-sst-600')}>
          Sauveteur Secouriste du Travail
        </p>
      </div>
    </div>
  );
}

export default function Layout() {
  const { profile, can, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const main: NavItem[] = [
    { to: '/', label: 'Tableau de bord', icon: <LayoutDashboard className="h-5 w-5" />, end: true },
    { to: '/sessions', label: 'Sessions', icon: <ClipboardList className="h-5 w-5" /> },
    { to: '/cours', label: 'Supports de cours', icon: <BookOpen className="h-5 w-5" /> },
    { to: '/qcm', label: 'QCM', icon: <ListChecks className="h-5 w-5" /> },
    { to: '/cas', label: 'Cas pratiques', icon: <Briefcase className="h-5 w-5" /> },
  ];
  const admin: NavItem[] = [];
  if (can('manageUsers')) admin.push({ to: '/admin/utilisateurs', label: 'Utilisateurs', icon: <Users className="h-5 w-5" /> });
  if (can('manageTrades') || can('manageSettings'))
    admin.push({ to: '/admin/parametres', label: 'Paramètres', icon: <Settings className="h-5 w-5" /> });

  const link = (item: NavItem) => (
    <NavLink
      key={item.to}
      to={item.to}
      end={item.end}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        clsx(
          'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition',
          isActive ? 'bg-white text-sst-800 shadow-sm' : 'text-sst-50/90 hover:bg-white/10 hover:text-white',
        )
      }
    >
      {item.icon}
      {item.label}
    </NavLink>
  );

  const sidebar = (
    <div className="flex h-full flex-col bg-gradient-to-b from-sst-700 via-sst-800 to-sst-900 px-4 py-5">
      <div className="mb-8 px-1">
        <Logo light />
      </div>
      <nav className="flex flex-1 flex-col gap-1">
        {main.map(link)}
        {admin.length > 0 && (
          <>
            <p className="mb-1 mt-6 px-3 text-[11px] font-bold uppercase tracking-widest text-sst-300">Administration</p>
            {admin.map(link)}
          </>
        )}
      </nav>
      <div className="mt-6 rounded-2xl bg-white/10 p-3">
        <NavLink to="/profil" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl p-1 text-white hover:bg-white/10">
          <UserCircle className="h-9 w-9 shrink-0 text-sst-200" />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">
              {profile?.firstName} {profile?.lastName}
            </p>
            <p className="text-xs text-sst-200">{profile ? ROLE_SHORT[profile.role] : ''}</p>
          </div>
        </NavLink>
        <button onClick={() => signOut()} className="mt-2 flex w-full items-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold text-sst-100 hover:bg-white/10">
          <LogOut className="h-4 w-4" /> Se déconnecter
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen lg:pl-72">
      <aside className="no-print fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">{sidebar}</aside>

      <header className="no-print sticky top-0 z-30 flex items-center justify-between border-b border-sst-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
        <Logo />
        <button className="rounded-xl p-2 text-sst-800 hover:bg-sst-50" onClick={() => setOpen(true)} aria-label="Ouvrir le menu">
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {open && (
        <div className="no-print fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-sst-950/40" />
          <div className="absolute inset-y-0 left-0 w-72" onClick={(e) => e.stopPropagation()}>
            <button className="absolute right-3 top-4 z-10 rounded-lg p-1 text-white" onClick={() => setOpen(false)} aria-label="Fermer">
              <X className="h-6 w-6" />
            </button>
            {sidebar}
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
        <Outlet />
      </main>
    </div>
  );
}

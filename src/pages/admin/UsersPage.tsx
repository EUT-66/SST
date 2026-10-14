import clsx from 'clsx';
import { deleteDoc, deleteField, doc, updateDoc } from 'firebase/firestore';
import { Check, ChevronDown, ShieldCheck, Trash2, UserCheck, UserX, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { EmptyState, errorMessage, PageHeader, PageLoader, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useCollection } from '../../hooks/useFirestore';
import { db } from '../../lib/firebase';
import { frDateTime } from '../../lib/format';
import { ALL_PERMISSIONS, PERMISSION_LABELS, ROLE_DEFAULTS, ROLE_LABELS, ROLE_SHORT } from '../../lib/permissions';
import type { Permission, Role, UserProfile } from '../../lib/types';

const ROLE_BADGE: Record<Role, string> = {
  admin: 'badge-green',
  referent: 'badge-blue',
  formateur: 'badge-gray',
  pending: 'badge-amber',
  disabled: 'badge-red',
};

export default function UsersPage() {
  const { profile: me } = useAuth();
  const { toast, confirm } = useFeedback();
  const users = useCollection<UserProfile>('users');
  const [open, setOpen] = useState<string | null>(null);

  const { pending, team } = useMemo(() => {
    const sorted = [...users.data].sort((a, b) => `${a.lastName}${a.firstName}`.localeCompare(`${b.lastName}${b.firstName}`, 'fr'));
    return { pending: sorted.filter((u) => u.role === 'pending'), team: sorted.filter((u) => u.role !== 'pending') };
  }, [users.data]);

  const update = async (u: UserProfile, data: Record<string, unknown>, message: string) => {
    try {
      await updateDoc(doc(db, 'users', u.uid), data);
      toast(message);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const validate = (u: UserProfile, role: Role) =>
    update(u, { role, validatedAt: Date.now(), validatedBy: me?.uid ?? null }, `${u.firstName} ${u.lastName} est maintenant ${ROLE_SHORT[role].toLowerCase()}.`);

  const setRole = async (u: UserProfile, role: Role) => {
    if (role === 'admin' && !(await confirm({ title: 'Nommer administrateur ?', message: `${u.firstName} ${u.lastName} aura tous les droits, y compris sur les utilisateurs.`, confirmLabel: 'Confirmer' }))) return;
    await update(u, { role }, 'Rôle mis à jour');
  };

  const togglePermission = (u: UserProfile, p: Permission) => {
    const roleValue = !!ROLE_DEFAULTS[u.role][p];
    const current = u.permissions?.[p] ?? roleValue;
    const next = !current;
    // on ne stocke une surcharge que si elle diffère du rôle
    const value = next === roleValue ? deleteField() : next;
    return update(u, { [`permissions.${p}`]: value }, 'Permission mise à jour');
  };

  const resetPermissions = (u: UserProfile) => update(u, { permissions: deleteField() }, 'Permissions du rôle rétablies');

  const remove = async (u: UserProfile) => {
    const ok = await confirm({
      title: 'Supprimer ce compte ?',
      message: 'La fiche est supprimée et la personne perd tout accès. Ses sessions restent enregistrées. (Le compte de connexion Firebase peut ensuite être supprimé depuis la console Firebase.)',
      confirmLabel: 'Supprimer',
      danger: true,
    });
    if (!ok) return;
    try {
      await deleteDoc(doc(db, 'users', u.uid));
      toast('Compte supprimé');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  if (users.loading) return <PageLoader />;

  return (
    <div>
      <PageHeader kicker="Administration" title="Utilisateurs, rôles et permissions" subtitle="Validez les formateurs et ajustez ce que chacun peut faire." />

      <section className="mb-8">
        <h2 className="section-title mb-3 flex items-center gap-2">
          Demandes en attente {pending.length > 0 && <span className="badge-amber">{pending.length}</span>}
        </h2>
        {pending.length === 0 ? (
          <p className="text-sm text-ink-muted">Aucune demande en attente.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {pending.map((u) => (
              <div key={u.uid} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold">
                    {u.firstName} {u.lastName}
                  </p>
                  <p className="text-sm text-ink-muted">{u.email}</p>
                  <p className="text-xs text-ink-muted">Demande du {frDateTime(u.createdAt)}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button className="btn-primary btn-sm" onClick={() => validate(u, 'formateur')}>
                    <UserCheck className="h-4 w-4" /> Valider formateur
                  </button>
                  <button className="btn-secondary btn-sm" onClick={() => validate(u, 'referent')}>
                    Référent
                  </button>
                  <button className="btn-danger btn-sm" onClick={() => update(u, { role: 'disabled' }, 'Demande refusée')}>
                    <UserX className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="section-title mb-3">Équipe</h2>
        {team.length === 0 ? (
          <EmptyState icon={<Users />} title="Aucun utilisateur" />
        ) : (
          <div className="card divide-y divide-slate-100">
            {team.map((u) => {
              const self = u.uid === me?.uid;
              const expanded = open === u.uid;
              const overrides = Object.keys(u.permissions ?? {}).length;
              return (
                <div key={u.uid} className="p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div className="min-w-0">
                      <p className="flex flex-wrap items-center gap-2 font-bold">
                        {u.firstName} {u.lastName} <span className={ROLE_BADGE[u.role]}>{ROLE_SHORT[u.role]}</span>
                        {self && <span className="badge-gray">Vous</span>}
                        {overrides > 0 && <span className="badge-blue">{overrides} permission(s) personnalisée(s)</span>}
                      </p>
                      <p className="text-sm text-ink-muted">{u.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        className="input w-56 py-2"
                        value={u.role}
                        disabled={self}
                        title={self ? 'Vous ne pouvez pas modifier votre propre rôle' : undefined}
                        onChange={(e) => setRole(u, e.target.value as Role)}
                      >
                        {(['admin', 'referent', 'formateur', 'disabled'] as Role[]).map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </option>
                        ))}
                      </select>
                      <button className="btn-secondary btn-sm" onClick={() => setOpen(expanded ? null : u.uid)} disabled={u.role === 'admin' || u.role === 'disabled'}>
                        <ShieldCheck className="h-4 w-4" /> Permissions <ChevronDown className={clsx('h-4 w-4 transition', expanded && 'rotate-180')} />
                      </button>
                      {!self && (
                        <button className="btn-ghost btn-sm text-red-600" onClick={() => remove(u)} aria-label="Supprimer">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {expanded && u.role !== 'admin' && (
                    <div className="mt-4 rounded-2xl bg-sst-50/60 p-4">
                      <p className="mb-3 text-sm text-ink-muted">
                        Par défaut, un <strong>{ROLE_SHORT[u.role].toLowerCase()}</strong> crée et gère ses propres sessions et utilise tous les contenus. Ajoutez ou retirez des droits :
                      </p>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {ALL_PERMISSIONS.map((p) => {
                          const value = u.permissions?.[p] ?? !!ROLE_DEFAULTS[u.role][p];
                          const custom = u.permissions?.[p] !== undefined;
                          return (
                            <button
                              key={p}
                              type="button"
                              onClick={() => togglePermission(u, p)}
                              className={clsx(
                                'flex items-start gap-3 rounded-xl border bg-white p-3 text-left transition',
                                value ? 'border-sst-300' : 'border-slate-200 opacity-80',
                              )}
                            >
                              <span className={clsx('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border', value ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-300')}>
                                {value && <Check className="h-3.5 w-3.5" />}
                              </span>
                              <span>
                                <span className="block text-sm font-semibold">
                                  {PERMISSION_LABELS[p].label} {custom && <span className="badge-blue ml-1">personnalisé</span>}
                                </span>
                                <span className="block text-xs text-ink-muted">{PERMISSION_LABELS[p].help}</span>
                              </span>
                            </button>
                          );
                        })}
                      </div>
                      {overrides > 0 && (
                        <button className="btn-ghost btn-sm mt-3" onClick={() => resetPermissions(u)}>
                          Revenir aux permissions du rôle
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mt-8 rounded-2xl border border-sst-100 bg-white p-5 text-sm text-ink-soft">
        <h3 className="mb-2 font-bold text-ink">Rappel des rôles</h3>
        <ul className="space-y-1">
          <li><strong>Administratrice / administrateur</strong> : tous les droits, valide les comptes, voit toutes les sessions.</li>
          <li><strong>Formateur référent</strong> : formateur qui peut en plus modifier les cours, la banque de QCM et les cas pratiques.</li>
          <li><strong>Formateur SST</strong> : crée et gère ses propres sessions, apprentis, évaluations et grilles.</li>
          <li><strong>Désactivé</strong> : plus aucun accès (les données sont conservées).</li>
        </ul>
      </section>
    </div>
  );
}

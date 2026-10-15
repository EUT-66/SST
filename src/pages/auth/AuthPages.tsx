import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  type User,
} from 'firebase/auth';
import { doc, getDoc, setDoc, writeBatch } from 'firebase/firestore';
import { Clock, HeartPulse, ShieldCheck } from 'lucide-react';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../../components/Layout';
import { errorMessage, Field, PasswordField, Spinner } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { auth, db } from '../../lib/firebase';
import type { UserProfile } from '../../lib/types';

function AuthShell({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      <div className="relative hidden overflow-hidden bg-gradient-to-br from-sst-600 via-sst-700 to-sst-900 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo light />
        <div className="relative z-10 max-w-md">
          {aside ?? (
            <>
              <p className="kicker !text-sst-200">Formation SST · Formation initiale</p>
              <h1 className="mt-3 font-display text-4xl font-extrabold leading-tight !text-white">
                Protéger, examiner, faire alerter, secourir.
              </h1>
              <p className="mt-4 text-sst-100">
                Vos supports de cours, vos QCM, vos cas pratiques métiers et la grille de certification réunis dans un seul
                espace.
              </p>
            </>
          )}
        </div>
        <p className="text-xs text-sst-200">Contenus basés sur les référentiels et l’aide-mémoire INRS.</p>
        <HeartPulse className="absolute -bottom-16 -right-16 h-96 w-96 text-white/5" />
      </div>
      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      navigate('/');
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  const reset = async () => {
    setError('');
    if (!email.trim()) return setError('Saisissez votre e-mail pour recevoir le lien de réinitialisation.');
    try {
      await sendPasswordResetEmail(auth, email.trim());
      setInfo('Un e-mail de réinitialisation vous a été envoyé.');
    } catch (err) {
      setError(errorMessage(err));
    }
  };

  return (
    <AuthShell>
      <h2 className="text-2xl font-extrabold">Connexion formateur</h2>
      <p className="mt-1 text-sm text-ink-muted">Accédez à votre espace de formation SST.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <Field label="E-mail">
          <input className="input" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </Field>
        <PasswordField label="Mot de passe" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        {info && <p className="rounded-xl bg-sst-50 px-3 py-2 text-sm text-sst-800">{info}</p>}
        <button className="btn-primary w-full" disabled={busy}>
          {busy && <Spinner className="h-4 w-4 text-white" />} Se connecter
        </button>
        <button type="button" onClick={reset} className="w-full text-center text-sm font-semibold text-sst-700 hover:underline">
          Mot de passe oublié ?
        </button>
      </form>
      <div className="mt-8 space-y-3 border-t border-slate-100 pt-6 text-sm">
        <p>
          Nouveau formateur ?{' '}
          <Link to="/inscription" className="font-semibold text-sst-700 hover:underline">
            Demander un accès
          </Link>
        </p>
        <p>
          Vous êtes apprenti ?{' '}
          <Link to="/apprenti" className="font-semibold text-sst-700 hover:underline">
            Rejoindre un QCM avec un code
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}

/** Crée la fiche utilisateur : le tout premier compte devient administrateur. */
export async function createProfile(user: User, firstName: string, lastName: string): Promise<UserProfile> {
  const base = {
    uid: user.uid,
    email: user.email ?? '',
    firstName: firstName.trim(),
    lastName: lastName.trim().toLocaleUpperCase('fr-FR'),
    signature: null,
    createdAt: Date.now(),
  };
  const bootstrap = await getDoc(doc(db, 'meta', 'bootstrap'));
  if (!bootstrap.exists()) {
    try {
      const batch = writeBatch(db);
      const profile: UserProfile = { ...base, role: 'admin', validatedAt: Date.now(), validatedBy: user.uid };
      batch.set(doc(db, 'users', user.uid), profile);
      batch.set(doc(db, 'meta', 'bootstrap'), { uid: user.uid, at: Date.now() });
      await batch.commit();
      return profile;
    } catch {
      // un autre compte a été créé entre-temps : inscription normale
    }
  }
  const profile: UserProfile = { ...base, role: 'pending' };
  await setDoc(doc(db, 'users', user.uid), profile);
  return profile;
}

export function RegisterPage() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setBusy(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email.trim(), form.password);
      await updateProfile(cred.user, { displayName: `${form.firstName} ${form.lastName}` });
      await createProfile(cred.user, form.firstName, form.lastName);
      navigate('/');
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthShell
      aside={
        <>
          <ShieldCheck className="mb-4 h-12 w-12 text-sst-200" />
          <h1 className="font-display text-4xl font-extrabold leading-tight !text-white">Rejoindre l’équipe de formateurs</h1>
          <p className="mt-4 text-sst-100">
            Votre demande sera validée par l’administratrice. Vous disposerez ensuite de votre propre espace pour créer et
            gérer vos sessions SST.
          </p>
        </>
      }
    >
      <h2 className="text-2xl font-extrabold">Demande d’accès</h2>
      <p className="mt-1 text-sm text-ink-muted">Réservé aux formateurs SST certifiés.</p>
      <form onSubmit={submit} className="mt-8 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <Field label="Prénom">
            <input className="input" required value={form.firstName} onChange={set('firstName')} autoComplete="given-name" />
          </Field>
          <Field label="Nom">
            <input className="input" required value={form.lastName} onChange={set('lastName')} autoComplete="family-name" />
          </Field>
        </div>
        <Field label="E-mail">
          <input className="input" type="email" required value={form.email} onChange={set('email')} autoComplete="email" />
        </Field>
        <PasswordField label="Mot de passe" help="8 caractères minimum." required minLength={8} value={form.password} onChange={set('password')} autoComplete="new-password" />
        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>
          {busy && <Spinner className="h-4 w-4 text-white" />} Envoyer ma demande
        </button>
      </form>
      <p className="mt-6 text-sm">
        Déjà un compte ?{' '}
        <Link to="/connexion" className="font-semibold text-sst-700 hover:underline">
          Se connecter
        </Link>
      </p>
    </AuthShell>
  );
}

/** Compte connecté sans fiche (inscription interrompue) : on la complète. */
export function CompleteProfilePage() {
  const { firebaseUser, signOut } = useAuth();
  const [names, setNames] = useState(() => {
    const [firstName = '', ...rest] = (firebaseUser?.displayName ?? '').split(' ');
    return { firstName, lastName: rest.join(' ') };
  });
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!firebaseUser) return;
    setBusy(true);
    try {
      await createProfile(firebaseUser, names.firstName, names.lastName);
    } catch (err) {
      setError(errorMessage(err));
    } finally {
      setBusy(false);
    }
  };
  return (
    <AuthShell>
      <h2 className="text-2xl font-extrabold">Finaliser votre inscription</h2>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field label="Prénom">
          <input className="input" required value={names.firstName} onChange={(e) => setNames({ ...names, firstName: e.target.value })} />
        </Field>
        <Field label="Nom">
          <input className="input" required value={names.lastName} onChange={(e) => setNames({ ...names, lastName: e.target.value })} />
        </Field>
        {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
        <button className="btn-primary w-full" disabled={busy}>
          Continuer
        </button>
        <button type="button" className="btn-ghost w-full" onClick={() => signOut()}>
          Se déconnecter
        </button>
      </form>
    </AuthShell>
  );
}

export function PendingPage() {
  const { profile, signOut } = useAuth();
  const disabled = profile?.role === 'disabled';
  return (
    <AuthShell>
      <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-sst-50 text-sst-600">
        <Clock className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-extrabold">{disabled ? 'Compte désactivé' : 'Demande en attente'}</h2>
      <p className="mt-2 text-sm text-ink-muted">
        {disabled
          ? 'Votre accès a été désactivé. Contactez l’administratrice si vous pensez qu’il s’agit d’une erreur.'
          : `Bonjour ${profile?.firstName ?? ''}, votre compte a bien été créé. L’administratrice doit maintenant valider votre accès formateur. Cette page se mettra à jour automatiquement.`}
      </p>
      <button className="btn-secondary mt-8 w-full" onClick={() => signOut()}>
        Se déconnecter
      </button>
    </AuthShell>
  );
}

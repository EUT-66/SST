import { updatePassword } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { PenLine, Save } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import SignaturePad from '../components/SignaturePad';
import { errorMessage, Field, PageHeader, useFeedback } from '../components/ui';
import { useAuth } from '../hooks/useAuth';
import { auth, db } from '../lib/firebase';
import { ROLE_LABELS } from '../lib/permissions';

export default function ProfilePage() {
  const { profile } = useAuth();
  const { toast } = useFeedback();
  const [names, setNames] = useState({ firstName: profile?.firstName ?? '', lastName: profile?.lastName ?? '', organisation: profile?.organisation ?? '' });
  const [drawing, setDrawing] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [password, setPassword] = useState('');

  if (!profile) return null;

  const saveNames = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'users', profile.uid), {
        firstName: names.firstName.trim(),
        lastName: names.lastName.trim().toLocaleUpperCase('fr-FR'),
        organisation: names.organisation.trim(),
      });
      toast('Profil enregistré');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const saveSignature = async () => {
    if (!signature) return;
    try {
      await updateDoc(doc(db, 'users', profile.uid), { signature });
      setDrawing(false);
      setSignature(null);
      toast('Signature enregistrée');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const changePassword = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await updatePassword(auth.currentUser!, password);
      setPassword('');
      toast('Mot de passe modifié');
    } catch (err) {
      const code = (err as { code?: string }).code;
      toast(code === 'auth/requires-recent-login' ? 'Reconnectez-vous puis réessayez.' : errorMessage(err), 'error');
    }
  };

  return (
    <div className="max-w-3xl">
      <PageHeader kicker="Mon compte" title="Mon profil" subtitle={`${profile.email} · ${ROLE_LABELS[profile.role]}`} />

      <div className="space-y-6">
        <form onSubmit={saveNames} className="card space-y-4 p-6">
          <h2 className="section-title">Identité du formateur</h2>
          <p className="text-sm text-ink-muted">Ces informations sont reportées sur les grilles de certification.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Prénom">
              <input className="input" value={names.firstName} onChange={(e) => setNames({ ...names, firstName: e.target.value })} required />
            </Field>
            <Field label="Nom">
              <input className="input" value={names.lastName} onChange={(e) => setNames({ ...names, lastName: e.target.value })} required />
            </Field>
          </div>
          <Field label="Organisme / CFA (facultatif)">
            <input className="input" value={names.organisation} onChange={(e) => setNames({ ...names, organisation: e.target.value })} />
          </Field>
          <button className="btn-primary">
            <Save className="h-4 w-4" /> Enregistrer
          </button>
        </form>

        <div className="card space-y-4 p-6">
          <h2 className="section-title">Ma signature</h2>
          <p className="text-sm text-ink-muted">Elle sera apposée automatiquement sur les grilles de certification que vous générez.</p>
          {!drawing && (
            <div className="flex flex-wrap items-center gap-6">
              <div className="flex h-28 w-72 items-center justify-center rounded-2xl border border-sst-100 bg-sst-50/40 p-3">
                {profile.signature ? (
                  <img src={profile.signature} alt="Signature" className="max-h-full max-w-full" />
                ) : (
                  <span className="text-sm text-ink-muted">Aucune signature</span>
                )}
              </div>
              <button className="btn-secondary" onClick={() => setDrawing(true)}>
                <PenLine className="h-4 w-4" /> {profile.signature ? 'Refaire ma signature' : 'Signer'}
              </button>
            </div>
          )}
          {drawing && (
            <div>
              <SignaturePad onChange={setSignature} />
              <div className="mt-3 flex gap-2">
                <button className="btn-primary" disabled={!signature} onClick={saveSignature}>
                  Enregistrer la signature
                </button>
                <button className="btn-ghost" onClick={() => setDrawing(false)}>
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={changePassword} className="card space-y-4 p-6">
          <h2 className="section-title">Mot de passe</h2>
          <Field label="Nouveau mot de passe" help="8 caractères minimum.">
            <input className="input" type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" />
          </Field>
          <button className="btn-secondary" disabled={password.length < 8}>
            Modifier le mot de passe
          </button>
        </form>
      </div>
    </div>
  );
}

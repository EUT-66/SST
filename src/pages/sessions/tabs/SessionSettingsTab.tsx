import { collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from 'firebase/firestore';
import { Lock, Save, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { errorMessage, Field, useFeedback } from '../../../components/ui';
import { useData } from '../../../hooks/useData';
import { db } from '../../../lib/firebase';
import { FORMATION_LABELS, formationOf } from '../../../lib/sessions';
import type { CasePool, FormationType, PrivateRun } from '../../../lib/types';
import type { SessionBundle } from '../SessionDetail';

export default function SessionSettingsTab({ session, learners, evaluations, readOnly, canEdit }: SessionBundle & { canEdit: boolean }) {
  const { trades } = useData();
  const { toast, confirm } = useFeedback();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: session.title,
    groupName: session.groupName ?? '',
    location: session.location ?? '',
    startDate: session.startDate,
    endDate: session.endDate,
    tradeId: session.tradeId,
    casePool: session.casePool,
    formationType: formationOf(session),
  });

  const save = async () => {
    if (form.endDate < form.startDate) return toast('La date de fin précède la date de début.', 'error');
    try {
      await updateDoc(doc(db, 'sessions', session.id), { ...form, updatedAt: Date.now() });
      toast('Session mise à jour');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const close = async () => {
    const notEvaluated = learners.filter((l) => !l.absent && !evaluations[l.id]).length;
    const ok = await confirm({
      title: 'Clôturer la formation ?',
      message: (
        <>
          La session passe en lecture seule dans l’espace « Clôturées » et sera archivée automatiquement au 1er janvier prochain.
          {notEvaluated > 0 && <strong className="mt-2 block text-amber-700">{notEvaluated} apprenti(s) présent(s) n’ont pas encore été évalués.</strong>}
          <span className="mt-2 block">Vous pourrez la rouvrir si besoin.</span>
        </>
      ),
      confirmLabel: 'Clôturer',
    });
    if (!ok) return;
    try {
      const batch = writeBatch(db);
      batch.update(doc(db, 'sessions', session.id), { status: 'closed', closedAt: Date.now(), updatedAt: Date.now() });
      const runs = await getDocs(collection(db, 'sessions', session.id, 'runs'));
      runs.forEach((r) => {
        const run = r.data() as PrivateRun;
        if (run.code && run.open) {
          batch.update(r.ref, { open: false });
          batch.update(doc(db, 'publicRuns', run.code), { open: false });
        }
      });
      await batch.commit();
      toast('Session clôturée');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const remove = async () => {
    const ok = await confirm({
      title: 'Supprimer définitivement la session ?',
      message: `Les ${learners.length} apprenti(s), leurs évaluations et les QCM de la session seront supprimés. Cette action est irréversible.`,
      danger: true,
      confirmLabel: 'Supprimer',
    });
    if (!ok) return;
    try {
      for (const sub of ['learners', 'evaluations', 'runs']) {
        const snap = await getDocs(collection(db, 'sessions', session.id, sub));
        for (let i = 0; i < snap.docs.length; i += 400) {
          const batch = writeBatch(db);
          snap.docs.slice(i, i + 400).forEach((d) => {
            batch.delete(d.ref);
            const code = (d.data() as PrivateRun).code;
            if (sub === 'runs' && code) batch.delete(doc(db, 'publicRuns', code));
          });
          await batch.commit();
        }
      }
      await deleteDoc(doc(db, 'sessions', session.id));
      toast('Session supprimée');
      navigate('/sessions');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const disabled = readOnly || !canEdit;

  return (
    <div className="max-w-3xl space-y-6">
      <div className="card space-y-4 p-6">
        <h2 className="section-title">Informations de la session</h2>
        <Field label="Intitulé">
          <input className="input" disabled={disabled} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Du">
            <input className="input" type="date" disabled={disabled} value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} />
          </Field>
          <Field label="Au">
            <input className="input" type="date" disabled={disabled} value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} />
          </Field>
          <Field label="Groupe / classe">
            <input className="input" disabled={disabled} value={form.groupName} onChange={(e) => setForm({ ...form, groupName: e.target.value })} />
          </Field>
          <Field label="Lieu">
            <input className="input" disabled={disabled} value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          </Field>
          <Field label="Type de formation">
            <select className="input" disabled={disabled} value={form.formationType} onChange={(e) => setForm({ ...form, formationType: e.target.value as FormationType })}>
              {(Object.keys(FORMATION_LABELS) as FormationType[]).map((f) => (
                <option key={f} value={f}>
                  {f === 'mac' ? `MAC – ${FORMATION_LABELS.mac}` : FORMATION_LABELS[f]}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Métier">
            <select className="input" disabled={disabled} value={form.tradeId} onChange={(e) => setForm({ ...form, tradeId: e.target.value })}>
              {trades.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.code} – {t.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Cas proposés au tirage">
            <select className="input" disabled={disabled} value={form.casePool} onChange={(e) => setForm({ ...form, casePool: e.target.value as CasePool })}>
              <option value="both">Métier et vie quotidienne</option>
              <option value="metier">Métier uniquement</option>
              <option value="vie_quotidienne">Vie quotidienne uniquement</option>
            </select>
          </Field>
        </div>
        {!disabled && (
          <button className="btn-primary" onClick={save}>
            <Save className="h-4 w-4" /> Enregistrer
          </button>
        )}
      </div>

      {canEdit && session.status !== 'closed' && (
        <div className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="section-title">Formation terminée ?</h2>
            <p className="text-sm text-ink-muted">Clôturez la session une fois les grilles générées. Elle sera archivée l’année suivante.</p>
          </div>
          <button className="btn-secondary" onClick={close}>
            <Lock className="h-4 w-4" /> Clôturer la session
          </button>
        </div>
      )}

      {canEdit && (
        <div className="card flex flex-col gap-4 border-red-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="section-title text-red-700">Supprimer la session</h2>
            <p className="text-sm text-ink-muted">Supprime aussi les apprentis, évaluations et QCM associés.</p>
          </div>
          <button className="btn-danger" onClick={remove}>
            <Trash2 className="h-4 w-4" /> Supprimer
          </button>
        </div>
      )}
    </div>
  );
}

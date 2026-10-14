import { addDoc, collection, doc, increment, updateDoc } from 'firebase/firestore';
import { ClipboardCheck, Eye, EyeOff, FileUp, Pencil, Plus, Trash2, UserMinus, Users } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import CsvImport, { type CsvResult } from '../../../components/CsvImport';
import { EmptyState, errorMessage, Field, Modal, useFeedback } from '../../../components/ui';
import { useData } from '../../../hooks/useData';
import { diffLearners, formatFirstName, formatLastName } from '../../../lib/csv';
import { db } from '../../../lib/firebase';
import { frDate } from '../../../lib/format';
import { applyImport, deleteLearner } from '../../../lib/sessionOps';
import type { Learner } from '../../../lib/types';
import type { SessionBundle } from '../SessionDetail';

export default function LearnersTab({ session, learners, evaluations, readOnly }: SessionBundle) {
  const { caseById } = useData();
  const { toast, confirm } = useFeedback();
  const [editing, setEditing] = useState<Partial<Learner> | null>(null);
  const [importing, setImporting] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const remove = async (l: Learner) => {
    const ok = await confirm({
      title: `Supprimer ${l.firstName} ${l.lastName} ?`,
      message: 'L’apprenti et son évaluation seront supprimés de la session.',
      danger: true,
      confirmLabel: 'Supprimer',
    });
    if (!ok) return;
    try {
      await deleteLearner(session.id, l);
      toast('Apprenti supprimé');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const toggleAbsent = async (l: Learner) => {
    try {
      await updateDoc(doc(db, 'sessions', session.id, 'learners', l.id), { absent: !l.absent, updatedAt: Date.now() });
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      {!readOnly && (
        <div className="mb-4 flex flex-wrap gap-2">
          <button className="btn-primary" onClick={() => setEditing({ tradeId: session.tradeId })}>
            <Plus className="h-4 w-4" /> Ajouter un apprenti
          </button>
          <button className="btn-secondary" onClick={() => setImporting(true)}>
            <FileUp className="h-4 w-4" /> {learners.length ? 'Mettre à jour depuis un CSV' : 'Importer un CSV'}
          </button>
        </div>
      )}

      {learners.length === 0 ? (
        <EmptyState icon={<Users />} title="Aucun apprenti dans cette session">
          Importez l’export CSV de Netyparéo ou ajoutez les apprentis un par un.
        </EmptyState>
      ) : (
        <div className="card overflow-x-auto">
          <table className="table-base">
            <thead>
              <tr>
                <th className="w-12">Ordre</th>
                <th>Apprenti</th>
                <th>Naissance</th>
                <th className="hidden lg:table-cell">Entreprise</th>
                <th>Cas pratique</th>
                <th>Évaluation</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {learners.map((l) => {
                const ev = evaluations[l.id];
                const kase = l.caseId ? caseById[l.caseId] : null;
                const evaluated = ev && (Object.keys(ev.actions ?? {}).length > 0 || ev.qcm);
                return (
                  <tr key={l.id} className={l.absent ? 'opacity-50' : undefined}>
                    <td>
                      {l.drawOrder ? (
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sst-600 text-xs font-bold text-white">{l.drawOrder}</span>
                      ) : (
                        <span className="text-ink-muted">—</span>
                      )}
                    </td>
                    <td>
                      <p className="font-semibold">
                        {l.lastName} {l.firstName}
                      </p>
                      <p className="text-xs text-ink-muted">
                        {l.absent && <span className="badge-amber mr-1">Absent</span>}
                        {[l.groupName, l.externalId && `n° ${l.externalId}`].filter(Boolean).join(' · ')}
                      </p>
                    </td>
                    <td className="whitespace-nowrap">{l.birthDate ? frDate(l.birthDate) : <span className="text-xs text-amber-600">à compléter</span>}</td>
                    <td className="hidden max-w-[180px] truncate text-xs lg:table-cell">{l.company}</td>
                    <td>
                      {kase ? (
                        <button
                          className="inline-flex max-w-[220px] items-center gap-1.5 text-left text-xs font-semibold text-sst-800"
                          onClick={() => setRevealed({ ...revealed, [l.id]: !revealed[l.id] })}
                          title="Afficher / masquer le cas (l’apprenti ne doit pas connaître son sujet)"
                        >
                          {revealed[l.id] ? <EyeOff className="h-3.5 w-3.5 shrink-0" /> : <Eye className="h-3.5 w-3.5 shrink-0" />}
                          <span className="truncate">{revealed[l.id] ? `${kase.number ? `n° ${kase.number} – ` : ''}${kase.title}` : 'Cas attribué (masqué)'}</span>
                        </button>
                      ) : (
                        <span className="text-xs text-ink-muted">—</span>
                      )}
                    </td>
                    <td>
                      <Link to={`/sessions/${session.id}/evaluation/${l.id}`} className="btn-secondary btn-sm">
                        <ClipboardCheck className="h-4 w-4" /> {evaluated ? 'Reprendre' : 'Évaluer'}
                      </Link>
                    </td>
                    <td className="whitespace-nowrap text-right">
                      {!readOnly && (
                        <>
                          <button className="btn-ghost btn-sm" title={l.absent ? 'Marquer présent' : 'Marquer absent'} onClick={() => toggleAbsent(l)}>
                            <UserMinus className="h-4 w-4" />
                          </button>
                          <button className="btn-ghost btn-sm" onClick={() => setEditing(l)} aria-label="Modifier">
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button className="btn-ghost btn-sm text-red-600" onClick={() => remove(l)} aria-label="Supprimer">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      <LearnerModal sessionId={session.id} learner={editing} onClose={() => setEditing(null)} />
      {importing && <ReimportModal sessionId={session.id} tradeId={session.tradeId} learners={learners} onClose={() => setImporting(false)} />}
    </div>
  );
}

function LearnerModal({ sessionId, learner, onClose }: { sessionId: string; learner: Partial<Learner> | null; onClose: () => void }) {
  const { toast } = useFeedback();
  const [form, setForm] = useState<Partial<Learner>>({});
  const [key, setKey] = useState<string | null>(null);
  const currentKey = learner ? learner.id ?? 'new' : null;
  if (currentKey !== key) {
    setKey(currentKey);
    setForm(learner ?? {});
  }
  if (!learner) return null;

  const set = (k: keyof Learner) => (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [k]: e.target.value });

  const save = async () => {
    const data = {
      lastName: formatLastName(form.lastName ?? ''),
      firstName: formatFirstName(form.firstName ?? ''),
      birthDate: form.birthDate ?? '',
      email: form.email?.trim() ?? '',
      phone: form.phone?.trim() ?? '',
      company: form.company?.trim() ?? '',
      externalId: form.externalId?.trim() ?? '',
      groupName: form.groupName?.trim() ?? '',
      updatedAt: Date.now(),
    };
    try {
      if (learner.id) {
        await updateDoc(doc(db, 'sessions', sessionId, 'learners', learner.id), data);
      } else {
        await addDoc(collection(db, 'sessions', sessionId, 'learners'), { ...data, tradeId: learner.tradeId ?? '', source: 'manuel', createdAt: Date.now() });
        await updateDoc(doc(db, 'sessions', sessionId), { learnerCount: increment(1) });
      }
      toast('Apprenti enregistré');
      onClose();
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={learner.id ? 'Modifier l’apprenti' : 'Ajouter un apprenti'}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={!form.lastName?.trim() || !form.firstName?.trim()} onClick={save}>
            Enregistrer
          </button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Nom">
          <input className="input" value={form.lastName ?? ''} onChange={set('lastName')} autoFocus />
        </Field>
        <Field label="Prénom">
          <input className="input" value={form.firstName ?? ''} onChange={set('firstName')} />
        </Field>
        <Field label="Date de naissance" help="Reportée sur la grille de certification.">
          <input className="input" type="date" value={form.birthDate ?? ''} onChange={set('birthDate')} />
        </Field>
        <Field label="Identifiant Netyparéo">
          <input className="input" value={form.externalId ?? ''} onChange={set('externalId')} />
        </Field>
        <Field label="Groupe / classe">
          <input className="input" value={form.groupName ?? ''} onChange={set('groupName')} />
        </Field>
        <Field label="Entreprise">
          <input className="input" value={form.company ?? ''} onChange={set('company')} />
        </Field>
        <Field label="E-mail">
          <input className="input" type="email" value={form.email ?? ''} onChange={set('email')} />
        </Field>
        <Field label="Téléphone">
          <input className="input" value={form.phone ?? ''} onChange={set('phone')} />
        </Field>
      </div>
    </Modal>
  );
}

function ReimportModal({ sessionId, tradeId, learners, onClose }: { sessionId: string; tradeId: string; learners: Learner[]; onClose: () => void }) {
  const { trades } = useData();
  const { toast } = useFeedback();
  const [csv, setCsv] = useState<CsvResult | null>(null);
  const [removeMissing, setRemoveMissing] = useState(false);
  const [busy, setBusy] = useState(false);
  const diff = useMemo(() => (csv ? diffLearners(learners, csv.learners) : null), [csv, learners]);

  const apply = async () => {
    if (!diff) return;
    setBusy(true);
    try {
      await applyImport(sessionId, diff, tradeId, removeMissing);
      toast('Liste des apprentis mise à jour');
      onClose();
    } catch (err) {
      toast(errorMessage(err), 'error');
      setBusy(false);
    }
  };

  return (
    <Modal
      open
      size="lg"
      onClose={onClose}
      title={learners.length ? 'Mettre à jour la liste depuis un CSV' : 'Importer les apprentis'}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={!diff || busy || (diff.added.length + diff.updated.length === 0 && !(removeMissing && diff.missing.length))} onClick={apply}>
            Appliquer
          </button>
        </>
      }
    >
      <CsvImport trades={trades} onChange={setCsv} />
      {diff && (
        <div className="mt-5 grid gap-3 sm:grid-cols-4">
          <DiffStat n={diff.added.length} label="nouveaux" tone="text-sst-700" />
          <DiffStat n={diff.updated.length} label="mis à jour" tone="text-sky-700" />
          <DiffStat n={diff.unchanged.length} label="inchangés" tone="text-ink-muted" />
          <DiffStat n={diff.missing.length} label="absents du fichier" tone="text-amber-700" />
        </div>
      )}
      {diff && diff.updated.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-ink-soft">
          {diff.updated.slice(0, 8).map((u) => (
            <li key={u.existing.id}>
              <strong>
                {u.existing.lastName} {u.existing.firstName}
              </strong>{' '}
              : {u.changes.join(', ')}
            </li>
          ))}
        </ul>
      )}
      {diff && diff.missing.length > 0 && (
        <label className="mt-4 flex items-start gap-3 rounded-xl bg-amber-50 p-3 text-sm">
          <input type="checkbox" className="mt-1 h-4 w-4 accent-red-600" checked={removeMissing} onChange={(e) => setRemoveMissing(e.target.checked)} />
          <span>
            Supprimer les {diff.missing.length} apprenti(s) absent(s) du fichier ({diff.missing.map((m) => `${m.lastName} ${m.firstName}`).join(', ')}) et leurs évaluations.
          </span>
        </label>
      )}
    </Modal>
  );
}

function DiffStat({ n, label, tone }: { n: number; label: string; tone: string }) {
  return (
    <div className="rounded-xl border border-slate-200 p-3 text-center">
      <p className={`font-display text-2xl font-extrabold ${tone}`}>{n}</p>
      <p className="text-xs text-ink-muted">{label}</p>
    </div>
  );
}

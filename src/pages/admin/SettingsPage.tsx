import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Briefcase, Database, Download, Plus, Save, Settings, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { errorMessage, Field, Modal, PageHeader, Tabs, useFeedback } from '../../components/ui';
import { CONTENT_VERSION, installDefaultContent, SEED_SUMMARY, type SeedPart } from '../../data/seed';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { db } from '../../lib/firebase';
import { slug } from '../../lib/format';
import { schoolYear } from '../../lib/gridFiles';
import type { AppSettings, Trade } from '../../lib/types';

type Tab = 'general' | 'metiers' | 'contenu';

export default function SettingsPage() {
  const { can } = useAuth();
  const tabs = [
    ...(can('manageSettings') ? [{ id: 'general' as Tab, label: 'Général', icon: <Settings className="h-4 w-4" /> }] : []),
    ...(can('manageTrades') ? [{ id: 'metiers' as Tab, label: 'Métiers', icon: <Briefcase className="h-4 w-4" /> }] : []),
    ...(can('manageSettings') ? [{ id: 'contenu' as Tab, label: 'Contenu pédagogique', icon: <Database className="h-4 w-4" /> }] : []),
  ];
  const [tab, setTab] = useState<Tab>(tabs[0]?.id ?? 'metiers');
  return (
    <div>
      <PageHeader kicker="Administration" title="Paramètres" />
      <Tabs tabs={tabs} value={tab} onChange={setTab} />
      {tab === 'general' && <GeneralSettings />}
      {tab === 'metiers' && <TradesSettings />}
      {tab === 'contenu' && <ContentSettings />}
    </div>
  );
}

function GeneralSettings() {
  const { settings } = useData();
  const { toast } = useFeedback();
  const [form, setForm] = useState<AppSettings>(settings);
  useEffect(() => setForm(settings), [settings]);

  const save = async () => {
    try {
      await setDoc(doc(db, 'settings', 'app'), { ...form, qcmThreshold: Math.min(1, Math.max(0, form.qcmThreshold)) }, { merge: true });
      toast('Paramètres enregistrés');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="card space-y-4 p-6">
        <h2 className="section-title">Organisme</h2>
        <Field label="Nom du CFA / de l’organisme" help="Affiché sur les documents générés.">
          <input className="input" value={form.organisation} onChange={(e) => setForm({ ...form, organisation: e.target.value })} />
        </Field>
      </div>
      <div className="card space-y-4 p-6">
        <h2 className="section-title">QCM et grille de certification</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Seuil de réussite d’une compétence au QCM" help="Pourcentage de bonnes réponses sur les questions de la compétence.">
            <div className="flex items-center gap-2">
              <input
                className="input w-28"
                type="number"
                min={0}
                max={100}
                value={Math.round(form.qcmThreshold * 100)}
                onChange={(e) => setForm({ ...form, qcmThreshold: Number(e.target.value) / 100 })}
              />
              <span>%</span>
            </div>
          </Field>
          <Field label="Nombre de questions d’un QCM d’évaluation généré">
            <input className="input w-28" type="number" min={5} max={60} value={form.evaluationQuestionCount} onChange={(e) => setForm({ ...form, evaluationQuestionCount: Number(e.target.value) })} />
          </Field>
        </div>
        <Field label="Place du QCM dans la grille (compétences C1, C6, C7, C8)">
          <select className="input" value={form.qcmMode} onChange={(e) => setForm({ ...form, qcmMode: e.target.value as AppSettings['qcmMode'] })}>
            <option value="and">Le QCM doit confirmer l’entretien et le cas pratique (les deux doivent être réussis)</option>
            <option value="fallback">Le QCM ne sert que si la compétence n’a pas été évaluée à l’oral</option>
          </select>
        </Field>
        <p className="text-xs text-ink-muted">Dans tous les cas, le formateur garde la main : chaque case de la grille reste modifiable avant la génération du PDF.</p>
      </div>
      <div className="card space-y-2 p-6">
        <h2 className="section-title">Grille de certification</h2>
        <p className="text-sm text-ink-muted">
          Le PDF reprend la grille officielle de l’INRS (juin 2020) à l’identique, logos compris : les informations sont écrites à l’emplacement de chaque champ. Les fichiers sont nommés « Grille Evaluation SST {schoolYear()} NOM Prénom ».
        </p>
      </div>
      <button className="btn-primary" onClick={save}>
        <Save className="h-4 w-4" /> Enregistrer les paramètres
      </button>
    </div>
  );
}

function TradesSettings() {
  const { trades } = useData();
  const { toast, confirm } = useFeedback();
  const [editing, setEditing] = useState<Trade | null>(null);

  const save = async (t: Trade) => {
    const id = t.id || slug(t.code || t.label);
    if (!id) return;
    try {
      const { id: _id, ...data } = t;
      await setDoc(doc(db, 'trades', id), { ...data, keywords: data.keywords.map((k) => k.trim()).filter(Boolean) });
      setEditing(null);
      toast('Métier enregistré');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const remove = async (t: Trade) => {
    if (!(await confirm({ title: `Supprimer « ${t.label} » ?`, message: 'Les sessions et cas déjà liés à ce métier ne seront plus rattachés à un métier connu.', danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      await deleteDoc(doc(db, 'trades', t.id));
      toast('Métier supprimé');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <p className="text-sm text-ink-muted">Les mots-clés servent à reconnaître le métier dans la colonne « formation » ou « groupe » de l’export Netyparéo.</p>
        <button className="btn-primary" onClick={() => setEditing({ id: '', code: '', label: '', keywords: [], order: trades.length + 1 })}>
          <Plus className="h-4 w-4" /> Ajouter
        </button>
      </div>
      <div className="card overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Code</th>
              <th>Métier</th>
              <th>Mots-clés de détection</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {trades.map((t) => (
              <tr key={t.id}>
                <td className="font-bold text-sst-700">{t.code}</td>
                <td className="font-semibold">{t.label}</td>
                <td className="text-xs text-ink-muted">{t.keywords.join(' · ')}</td>
                <td className="whitespace-nowrap text-right">
                  <button className="btn-ghost btn-sm" onClick={() => setEditing(t)}>
                    Modifier
                  </button>
                  <button className="btn-ghost btn-sm text-red-600" onClick={() => remove(t)} aria-label="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TradeModal trade={editing} onClose={() => setEditing(null)} onSave={save} />
    </div>
  );
}

function TradeModal({ trade, onClose, onSave }: { trade: Trade | null; onClose: () => void; onSave: (t: Trade) => void }) {
  const [form, setForm] = useState<Trade | null>(trade);
  const [keywords, setKeywords] = useState('');
  useEffect(() => {
    setForm(trade);
    setKeywords(trade?.keywords.join(', ') ?? '');
  }, [trade]);
  if (!form) return null;
  return (
    <Modal
      open={!!trade}
      onClose={onClose}
      title={trade?.id ? 'Modifier le métier' : 'Nouveau métier'}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={!form.label.trim()} onClick={() => onSave({ ...form, keywords: keywords.split(',') })}>
            Enregistrer
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-[120px_1fr]">
          <Field label="Code">
            <input className="input" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} />
          </Field>
          <Field label="Intitulé">
            <input className="input" value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} />
          </Field>
        </div>
        <Field label="Mots-clés (séparés par des virgules)" help="Ex. : MIT, installations thermiques, chauffagiste. Les mots de 4 lettres ou moins doivent apparaître comme un mot entier.">
          <textarea className="input" rows={3} value={keywords} onChange={(e) => setKeywords(e.target.value)} />
        </Field>
      </div>
    </Modal>
  );
}

function ContentSettings() {
  const { profile } = useAuth();
  const { settings } = useData();
  const { toast, confirm } = useFeedback();
  const [parts, setParts] = useState<SeedPart[]>(['trades', 'courses', 'questions', 'cases']);
  const [busy, setBusy] = useState(false);

  const run = async (overwrite: boolean) => {
    if (
      overwrite &&
      !(await confirm({
        title: 'Réinstaller le contenu d’origine ?',
        message: 'Les éléments par défaut sélectionnés seront remplacés par leur version d’origine : vos modifications sur ces éléments seront perdues. Vos propres créations ne sont pas touchées.',
        danger: true,
        confirmLabel: 'Réinstaller',
      }))
    )
      return;
    setBusy(true);
    try {
      const count = await installDefaultContent(parts, overwrite, profile!.uid);
      await setDoc(doc(db, 'settings', 'app'), { contentVersion: CONTENT_VERSION }, { merge: true });
      toast(count ? `${count} élément(s) installé(s)` : 'Tout le contenu était déjà installé');
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div className="card p-6">
        <h2 className="section-title">Contenu pédagogique par défaut</h2>
        <p className="mt-1 text-sm text-ink-muted">
          Installe les supports de cours (aide-mémoire INRS et cours MIT), la banque de QCM classée par compétence, les 18 cas pratiques MIT et des propositions de cas pour d’autres métiers du BTP.
          {settings.contentVersion ? ` Version installée : ${settings.contentVersion}.` : ' Pas encore installé.'}
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {(Object.keys(SEED_SUMMARY) as SeedPart[]).map((p) => (
            <label key={p} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3">
              <input
                type="checkbox"
                className="h-4 w-4 accent-sst-600"
                checked={parts.includes(p)}
                onChange={(e) => setParts(e.target.checked ? [...parts, p] : parts.filter((x) => x !== p))}
              />
              <span className="text-sm font-semibold">{SEED_SUMMARY[p].label}</span>
              <span className="badge-gray ml-auto">{SEED_SUMMARY[p].count}</span>
            </label>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <button className="btn-primary" disabled={busy || parts.length === 0} onClick={() => run(false)}>
            <Download className="h-4 w-4" /> Installer ce qui manque
          </button>
          <button className="btn-danger" disabled={busy || parts.length === 0} onClick={() => run(true)}>
            Réinstaller la version d’origine
          </button>
        </div>
      </div>
    </div>
  );
}

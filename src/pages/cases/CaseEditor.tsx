import clsx from 'clsx';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ArrowDown, ArrowUp, Plus, Save, X } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EmptyState, errorMessage, Field, PageHeader, useFeedback } from '../../components/ui';
import { prevention as emptyPrevention } from '../../data/caseHelpers';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { ALL_INDICATORS, EPREUVE1_INDICATORS, INDICATOR_BY_ID } from '../../lib/competences';
import { db } from '../../lib/firebase';
import type { CaseAction, IndicatorId, PracticalCase } from '../../lib/types';

const blank = (): PracticalCase => ({
  id: '',
  title: '',
  geste: '',
  category: 'metier',
  tradeIds: [],
  scenario: '',
  victime: '',
  temoin: '',
  materiel: '',
  actions: [{ text: '', indicators: [] }],
  prevention: emptyPrevention({ danger: '', situation: '', evenement: '', dommage: '', eviter: '', remonter: '' }),
  reviewed: true,
});

export default function CaseEditor() {
  const { id } = useParams();
  const { caseById, trades } = useData();
  const { profile } = useAuth();
  const { toast } = useFeedback();
  const navigate = useNavigate();
  const isNew = id === 'nouveau';
  const source = isNew ? blank() : id ? caseById[id] : undefined;
  const [c, setC] = useState<PracticalCase | null>(source ? structuredClone(source) : null);
  if (!c) return <EmptyState title="Cas introuvable" />;

  const setAction = (i: number, a: Partial<CaseAction>) => setC({ ...c, actions: c.actions.map((x, k) => (k === i ? { ...x, ...a } : x)) });
  const moveAction = (i: number, to: number) => {
    if (to < 0 || to >= c.actions.length) return;
    const actions = [...c.actions];
    const [a] = actions.splice(i, 1);
    actions.splice(to, 0, a);
    setC({ ...c, actions });
  };
  const toggleIndicator = (list: IndicatorId[], ind: IndicatorId) => (list.includes(ind) ? list.filter((x) => x !== ind) : [...list, ind]);

  const valid = c.title.trim() && c.scenario.trim() && c.actions.some((a) => a.text.trim());

  const save = async () => {
    const { id: _id, ...data } = c;
    const payload = JSON.parse(
      JSON.stringify({ ...data, actions: c.actions.filter((a) => a.text.trim()), createdBy: c.createdBy ?? profile?.uid, updatedAt: Date.now() }),
    );
    try {
      if (isNew) {
        const ref = await addDoc(collection(db, 'cases'), payload);
        navigate(`/cas/${ref.id}`, { replace: true });
      } else {
        await setDoc(doc(db, 'cases', c.id), payload);
        navigate(`/cas/${c.id}`);
      }
      toast('Cas enregistré');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const text = (key: 'title' | 'geste' | 'victime' | 'temoin' | 'materiel') => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setC({ ...c, [key]: e.target.value });

  return (
    <div className="max-w-5xl">
      <PageHeader
        back={{ to: isNew ? '/cas' : `/cas/${c.id}`, label: 'Retour' }}
        kicker="Cas pratique"
        title={isNew ? 'Nouveau cas pratique' : `Modifier : ${c.title}`}
        actions={
          <button className="btn-primary" disabled={!valid} onClick={save}>
            <Save className="h-4 w-4" /> Enregistrer
          </button>
        }
      />
      <div className="space-y-6">
        <div className="card grid gap-4 p-6 md:grid-cols-6">
          <Field label="N°" className="md:col-span-1">
            <input className="input" type="number" value={c.number ?? ''} onChange={(e) => setC({ ...c, number: e.target.value ? Number(e.target.value) : undefined })} />
          </Field>
          <Field label="Titre" className="md:col-span-3">
            <input className="input" value={c.title} onChange={text('title')} />
          </Field>
          <Field label="Catégorie" className="md:col-span-2">
            <select className="input" value={c.category} onChange={(e) => setC({ ...c, category: e.target.value as PracticalCase['category'] })}>
              <option value="metier">Situation de travail</option>
              <option value="vie_quotidienne">Vie quotidienne</option>
            </select>
          </Field>
          <Field label="Geste évalué" className="md:col-span-6">
            <input className="input" value={c.geste} onChange={text('geste')} />
          </Field>
          <div className="md:col-span-6">
            <p className="label">Métiers (aucun = tous les métiers)</p>
            <div className="flex flex-wrap gap-2">
              {trades.map((t) => {
                const on = c.tradeIds.includes(t.id);
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setC({ ...c, tradeIds: on ? c.tradeIds.filter((x) => x !== t.id) : [...c.tradeIds, t.id] })}
                    className={clsx('rounded-full border px-3 py-1 text-xs font-semibold', on ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-200')}
                  >
                    {t.code} · {t.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card space-y-4 p-6">
          <h2 className="section-title">Mise en situation</h2>
          <Field label="Scénario à lire à l’apprenti SST">
            <textarea className="input" rows={4} value={c.scenario} onChange={(e) => setC({ ...c, scenario: e.target.value })} />
          </Field>
          <div className="grid gap-4 md:grid-cols-3">
            <Field label="Victime">
              <textarea className="input" rows={4} value={c.victime} onChange={text('victime')} />
            </Field>
            <Field label="Témoin">
              <textarea className="input" rows={4} value={c.temoin} onChange={text('temoin')} />
            </Field>
            <Field label="Matériel">
              <textarea className="input" rows={4} value={c.materiel} onChange={text('materiel')} />
            </Field>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title">Épreuve 1 – Actions attendues</h2>
          <p className="mb-4 text-sm text-ink-muted">Pour chaque action, indiquez le ou les indicateurs de la grille qu’elle permet d’évaluer (surlignés = incontournables).</p>
          <div className="space-y-3">
            {c.actions.map((a, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-3">
                <div className="flex gap-2">
                  <span className="pt-2 font-bold text-sst-700">{i + 1}.</span>
                  <input className="input" value={a.text} onChange={(e) => setAction(i, { text: e.target.value })} />
                  <button className="btn-ghost btn-sm" onClick={() => moveAction(i, i - 1)} aria-label="Monter">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button className="btn-ghost btn-sm" onClick={() => moveAction(i, i + 1)} aria-label="Descendre">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button className="btn-ghost btn-sm text-red-600" onClick={() => setC({ ...c, actions: c.actions.filter((_, k) => k !== i) })} aria-label="Retirer">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-1 pl-6">
                  {EPREUVE1_INDICATORS.map((ind) => {
                    const on = a.indicators.includes(ind);
                    return (
                      <button
                        key={ind}
                        type="button"
                        title={INDICATOR_BY_ID[ind].text}
                        onClick={() => setAction(i, { indicators: toggleIndicator(a.indicators, ind) })}
                        className={clsx(
                          'rounded-md border px-2 py-0.5 text-[11px] font-bold',
                          on ? 'border-sst-600 bg-sst-600 text-white' : INDICATOR_BY_ID[ind].key ? 'border-yellow-300 bg-yellow-50' : 'border-slate-200',
                        )}
                      >
                        {ind}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <button className="btn-ghost btn-sm" onClick={() => setC({ ...c, actions: [...c.actions, { text: '', indicators: [] }] })}>
              <Plus className="h-4 w-4" /> Ajouter une action
            </button>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="section-title mb-4">Épreuve 2 – Prévention : réponses attendues</h2>
          <div className="space-y-3">
            {c.prevention.map((p, i) => (
              <div key={p.key} className="grid gap-2 md:grid-cols-[180px_1fr]">
                <div>
                  <p className="text-sm font-bold">{p.label}</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {ALL_INDICATORS.filter((x) => ['C6a', 'C7a', 'C8a', 'C8b', 'C1a'].includes(x.id)).map((ind) => {
                      const on = p.indicators.includes(ind.id);
                      return (
                        <button
                          key={ind.id}
                          type="button"
                          title={ind.text}
                          onClick={() => setC({ ...c, prevention: c.prevention.map((x, k) => (k === i ? { ...x, indicators: toggleIndicator(x.indicators, ind.id) } : x)) })}
                          className={clsx('rounded-md border px-1.5 text-[10px] font-bold', on ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-200')}
                        >
                          {ind.id}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <textarea className="input" rows={2} value={p.answer} onChange={(e) => setC({ ...c, prevention: c.prevention.map((x, k) => (k === i ? { ...x, answer: e.target.value } : x)) })} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

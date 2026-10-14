import clsx from 'clsx';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { CheckCircle2, Circle, Layers, ListChecks, Pencil, Play, Plus, Search, Trash2, Wand2, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, errorMessage, Field, Modal, PageHeader, Tabs, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { COMPETENCE_LABELS, COMPETENCE_ORDER, THEMES } from '../../lib/competences';
import { db } from '../../lib/firebase';
import { pickBalanced, questionMatchesTrade } from '../../lib/quiz';
import type { CompetenceId, Question, QuestionTheme, QuestionUsage, QuizTemplate, QuizType } from '../../lib/types';

type Tab = 'questions' | 'modeles';

export default function QuizHome() {
  const [tab, setTab] = useState<Tab>('questions');
  return (
    <div>
      <PageHeader
        kicker="Pédagogie"
        title="QCM"
        subtitle="Banque de questions classées selon les 8 compétences de la grille de certification."
        actions={
          <Link to="/qcm/entrainement" className="btn-primary">
            <Play className="h-4 w-4" /> S’entraîner / projeter
          </Link>
        }
      />
      <Tabs
        value={tab}
        onChange={setTab}
        tabs={[
          { id: 'questions', label: 'Banque de questions', icon: <ListChecks className="h-4 w-4" /> },
          { id: 'modeles', label: 'Modèles de QCM', icon: <Layers className="h-4 w-4" /> },
        ]}
      />
      {tab === 'questions' ? <QuestionBank /> : <Templates />}
    </div>
  );
}

function QuestionBank() {
  const { questions, trades, tradeById } = useData();
  const { can } = useAuth();
  const { toast, confirm } = useFeedback();
  const [filters, setFilters] = useState({ q: '', competence: '', trade: '' });
  const [editing, setEditing] = useState<Partial<Question> | null>(null);
  const canEdit = can('manageQuestions');

  const list = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return questions
      .filter((x) => !filters.competence || x.competence === filters.competence)
      .filter((x) => !filters.trade || questionMatchesTrade(x, filters.trade))
      .filter((x) => !q || `${x.text} ${x.choices.map((c) => c.text).join(' ')}`.toLowerCase().includes(q))
      .sort((a, b) => a.competence.localeCompare(b.competence) || a.text.localeCompare(b.text, 'fr'));
  }, [questions, filters]);

  const remove = async (q: Question) => {
    if (!(await confirm({ title: 'Supprimer cette question ?', message: q.text, danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      await deleteDoc(doc(db, 'questions', q.id));
      toast('Question supprimée');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Rechercher…" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
        </div>
        <select className="input lg:w-72" value={filters.competence} onChange={(e) => setFilters({ ...filters, competence: e.target.value })}>
          <option value="">Toutes les compétences</option>
          {COMPETENCE_ORDER.map((c) => (
            <option key={c} value={c}>
              {c} – {COMPETENCE_LABELS[c]}
            </option>
          ))}
        </select>
        <select className="input lg:w-56" value={filters.trade} onChange={(e) => setFilters({ ...filters, trade: e.target.value })}>
          <option value="">Tous les métiers</option>
          {trades.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        {canEdit && (
          <button className="btn-primary" onClick={() => setEditing({ competence: 'C1', theme: 'cadre', tradeIds: [], usage: 'both', choices: [{ text: '', correct: true }, { text: '', correct: false }, { text: '', correct: false }] })}>
            <Plus className="h-4 w-4" /> Question
          </button>
        )}
      </div>
      <p className="mb-3 text-sm text-ink-muted">{list.length} question(s)</p>
      {list.length === 0 ? (
        <EmptyState icon={<ListChecks />} title="Aucune question" />
      ) : (
        <div className="grid gap-3 lg:grid-cols-2">
          {list.map((q) => (
            <div key={q.id} className="card p-5">
              <div className="mb-2 flex flex-wrap items-center gap-1.5">
                <span className="badge-green">{q.competence}</span>
                <span className="badge-gray">{THEMES[q.theme]}</span>
                {q.tradeIds.map((t) => (
                  <span key={t} className="badge-blue">
                    {tradeById[t]?.code ?? t}
                  </span>
                ))}
                {q.usage !== 'both' && <span className="badge-amber">{q.usage === 'evaluation' ? 'Évaluation seulement' : 'Entraînement seulement'}</span>}
                {canEdit && (
                  <span className="ml-auto flex gap-1">
                    <button className="btn-ghost btn-sm" onClick={() => setEditing(q)} aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="btn-ghost btn-sm text-red-600" onClick={() => remove(q)} aria-label="Supprimer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </div>
              <p className="font-semibold">{q.text}</p>
              <ul className="mt-2 space-y-1">
                {q.choices.map((c, i) => (
                  <li key={i} className={clsx('flex items-start gap-2 text-sm', c.correct ? 'font-semibold text-sst-800' : 'text-ink-muted')}>
                    {c.correct ? <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sst-600" /> : <Circle className="mt-0.5 h-4 w-4 shrink-0 text-slate-300" />}
                    {c.text}
                  </li>
                ))}
              </ul>
              {q.explanation && <p className="mt-2 rounded-xl bg-sst-50 px-3 py-2 text-xs text-sst-900">{q.explanation}</p>}
            </div>
          ))}
        </div>
      )}
      {editing && <QuestionModal question={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function QuestionModal({ question, onClose }: { question: Partial<Question>; onClose: () => void }) {
  const { trades } = useData();
  const { profile } = useAuth();
  const { toast } = useFeedback();
  const [q, setQ] = useState<Partial<Question>>(structuredClone(question));
  const choices = q.choices ?? [];
  const valid = q.text?.trim() && choices.filter((c) => c.text.trim()).length >= 2 && choices.some((c) => c.correct && c.text.trim());

  const save = async () => {
    const data = {
      text: q.text!.trim(),
      choices: choices.filter((c) => c.text.trim()).map((c) => ({ text: c.text.trim(), correct: c.correct })),
      explanation: q.explanation?.trim() ?? '',
      competence: q.competence as CompetenceId,
      theme: q.theme as QuestionTheme,
      tradeIds: q.tradeIds ?? [],
      usage: q.usage as QuestionUsage,
      createdBy: q.createdBy ?? profile?.uid ?? '',
      updatedAt: Date.now(),
    };
    try {
      if (q.id) await setDoc(doc(db, 'questions', q.id), data);
      else await addDoc(collection(db, 'questions'), data);
      toast('Question enregistrée');
      onClose();
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <Modal
      open
      size="lg"
      onClose={onClose}
      title={q.id ? 'Modifier la question' : 'Nouvelle question'}
      footer={
        <>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={!valid} onClick={save}>
            Enregistrer
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <Field label="Question">
          <textarea className="input" rows={2} value={q.text ?? ''} onChange={(e) => setQ({ ...q, text: e.target.value })} />
        </Field>
        <div>
          <p className="label">Réponses (cochez la ou les bonnes réponses)</p>
          <div className="space-y-2">
            {choices.map((c, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-5 w-5 accent-sst-600"
                  checked={c.correct}
                  onChange={(e) => setQ({ ...q, choices: choices.map((x, k) => (k === i ? { ...x, correct: e.target.checked } : x)) })}
                />
                <input className="input py-2" value={c.text} onChange={(e) => setQ({ ...q, choices: choices.map((x, k) => (k === i ? { ...x, text: e.target.value } : x)) })} />
                <button className="btn-ghost btn-sm" onClick={() => setQ({ ...q, choices: choices.filter((_, k) => k !== i) })} aria-label="Retirer">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
            {choices.length < 6 && (
              <button className="btn-ghost btn-sm" onClick={() => setQ({ ...q, choices: [...choices, { text: '', correct: false }] })}>
                <Plus className="h-4 w-4" /> Ajouter une réponse
              </button>
            )}
          </div>
        </div>
        <Field label="Explication (affichée en entraînement)">
          <textarea className="input" rows={2} value={q.explanation ?? ''} onChange={(e) => setQ({ ...q, explanation: e.target.value })} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Compétence">
            <select className="input" value={q.competence} onChange={(e) => setQ({ ...q, competence: e.target.value as CompetenceId })}>
              {COMPETENCE_ORDER.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Thème">
            <select className="input" value={q.theme} onChange={(e) => setQ({ ...q, theme: e.target.value as QuestionTheme })}>
              {Object.entries(THEMES).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Utilisation">
            <select className="input" value={q.usage} onChange={(e) => setQ({ ...q, usage: e.target.value as QuestionUsage })}>
              <option value="both">Entraînement et évaluation</option>
              <option value="entrainement">Entraînement</option>
              <option value="evaluation">Évaluation</option>
            </select>
          </Field>
        </div>
        <div>
          <p className="label">Métiers (aucun = tous)</p>
          <div className="flex flex-wrap gap-2">
            {trades.map((t) => {
              const on = q.tradeIds?.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setQ({ ...q, tradeIds: on ? q.tradeIds!.filter((x) => x !== t.id) : [...(q.tradeIds ?? []), t.id] })}
                  className={clsx('rounded-full border px-3 py-1 text-xs font-semibold', on ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-200')}
                >
                  {t.code}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Modal>
  );
}

function Templates() {
  const { quizzes, questions, tradeById } = useData();
  const { can } = useAuth();
  const { toast, confirm } = useFeedback();
  const [editing, setEditing] = useState<Partial<QuizTemplate> | null>(null);
  const canEdit = can('manageQuestions');

  const remove = async (t: QuizTemplate) => {
    if (!(await confirm({ title: `Supprimer « ${t.title} » ?`, danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      await deleteDoc(doc(db, 'quizzes', t.id));
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      {canEdit && (
        <button className="btn-primary mb-4" onClick={() => setEditing({ title: '', type: 'evaluation', tradeIds: [], questionIds: [] })}>
          <Plus className="h-4 w-4" /> Nouveau modèle
        </button>
      )}
      <div className="grid gap-4 md:grid-cols-2">
        {quizzes.map((t) => {
          const byComp = COMPETENCE_ORDER.map((c) => [c, t.questionIds.filter((id) => questions.find((q) => q.id === id)?.competence === c).length] as const);
          return (
            <div key={t.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className={t.type === 'evaluation' ? 'badge-green' : 'badge-blue'}>{t.type === 'evaluation' ? 'Évaluation' : 'Entraînement'}</span>
                  <h3 className="mt-2 font-bold">{t.title}</h3>
                  {t.description && <p className="text-sm text-ink-muted">{t.description}</p>}
                </div>
                {canEdit && (
                  <div className="flex gap-1">
                    <button className="btn-ghost btn-sm" onClick={() => setEditing(t)} aria-label="Modifier">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="btn-ghost btn-sm text-red-600" onClick={() => remove(t)} aria-label="Supprimer">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <p className="mt-3 text-sm font-semibold">{t.questionIds.length} questions</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {byComp
                  .filter(([, n]) => n)
                  .map(([c, n]) => (
                    <span key={c} className="badge-gray">
                      {c} × {n}
                    </span>
                  ))}
                {t.tradeIds.map((id) => (
                  <span key={id} className="badge-blue">
                    {tradeById[id]?.code}
                  </span>
                ))}
              </div>
              <Link to={`/qcm/entrainement?modele=${t.id}`} className="btn-secondary btn-sm mt-4">
                <Play className="h-4 w-4" /> Essayer
              </Link>
            </div>
          );
        })}
      </div>
      {editing && <TemplateModal template={editing} onClose={() => setEditing(null)} />}
    </div>
  );
}

function TemplateModal({ template, onClose }: { template: Partial<QuizTemplate>; onClose: () => void }) {
  const { questions, trades } = useData();
  const { profile } = useAuth();
  const { toast } = useFeedback();
  const [t, setT] = useState<Partial<QuizTemplate>>(structuredClone(template));
  const [comp, setComp] = useState('');
  const [count, setCount] = useState(20);
  const tradeId = t.tradeIds?.[0];
  const selected = new Set(t.questionIds ?? []);
  const pool = questions.filter((q) => (!tradeId || questionMatchesTrade(q, tradeId)) && (!comp || q.competence === comp));

  const toggle = (id: string) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setT({ ...t, questionIds: [...next] });
  };

  const save = async () => {
    const data = {
      title: t.title!.trim(),
      description: t.description ?? '',
      type: t.type as QuizType,
      tradeIds: t.tradeIds ?? [],
      questionIds: t.questionIds ?? [],
      createdBy: t.createdBy ?? profile?.uid ?? '',
      updatedAt: Date.now(),
    };
    try {
      if (t.id) await setDoc(doc(db, 'quizzes', t.id), data);
      else await addDoc(collection(db, 'quizzes'), data);
      toast('Modèle enregistré');
      onClose();
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <Modal
      open
      size="xl"
      onClose={onClose}
      title={t.id ? 'Modifier le modèle' : 'Nouveau modèle de QCM'}
      footer={
        <>
          <span className="mr-auto text-sm font-semibold">{selected.size} question(s) sélectionnée(s)</span>
          <button className="btn-secondary" onClick={onClose}>
            Annuler
          </button>
          <button className="btn-primary" disabled={!t.title?.trim() || selected.size === 0} onClick={save}>
            Enregistrer
          </button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Titre" className="sm:col-span-2">
            <input className="input" value={t.title ?? ''} onChange={(e) => setT({ ...t, title: e.target.value })} />
          </Field>
          <Field label="Type">
            <select className="input" value={t.type} onChange={(e) => setT({ ...t, type: e.target.value as QuizType })}>
              <option value="evaluation">Évaluation</option>
              <option value="entrainement">Entraînement</option>
            </select>
          </Field>
          <Field label="Métier" className="sm:col-span-1">
            <select className="input" value={tradeId ?? ''} onChange={(e) => setT({ ...t, tradeIds: e.target.value ? [e.target.value] : [] })}>
              <option value="">Tous les métiers</option>
              {trades.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Description" className="sm:col-span-2">
            <input className="input" value={t.description ?? ''} onChange={(e) => setT({ ...t, description: e.target.value })} />
          </Field>
        </div>
        <div className="flex flex-wrap items-end gap-2 rounded-2xl bg-sst-50 p-3">
          <Field label="Remplir automatiquement">
            <input className="input w-24" type="number" min={4} max={60} value={count} onChange={(e) => setCount(Number(e.target.value))} />
          </Field>
          <button className="btn-secondary" onClick={() => setT({ ...t, questionIds: pickBalanced(questions.filter((q) => !tradeId || questionMatchesTrade(q, tradeId)), count, tradeId).map((q) => q.id) })}>
            <Wand2 className="h-4 w-4" /> Tirage équilibré sur les 8 compétences
          </button>
          <select className="input ml-auto w-56" value={comp} onChange={(e) => setComp(e.target.value)}>
            <option value="">Afficher toutes les compétences</option>
            {COMPETENCE_ORDER.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <ul className="max-h-[45vh] space-y-1 overflow-y-auto">
          {pool.map((q) => (
            <li key={q.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl p-2 hover:bg-sst-50">
                <input type="checkbox" className="mt-1 h-4 w-4 accent-sst-600" checked={selected.has(q.id)} onChange={() => toggle(q.id)} />
                <span className="badge-green shrink-0">{q.competence}</span>
                <span className="text-sm">{q.text}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </Modal>
  );
}

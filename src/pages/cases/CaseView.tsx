import clsx from 'clsx';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { BadgeCheck, Copy, Pencil, Trash2 } from 'lucide-react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CaseSheet from '../../components/CaseSheet';
import { EmptyState, errorMessage, PageHeader, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { INDICATOR_BY_ID } from '../../lib/competences';
import { db } from '../../lib/firebase';

export default function CaseView() {
  const { id } = useParams();
  const { caseById, tradeById } = useData();
  const { can, profile } = useAuth();
  const { toast, confirm } = useFeedback();
  const navigate = useNavigate();
  const kase = id ? caseById[id] : undefined;
  if (!kase) return <EmptyState title="Cas introuvable" />;
  const canEdit = can('manageCases');

  const markReviewed = async () => {
    try {
      await updateDoc(doc(db, 'cases', kase.id), { reviewed: true, updatedAt: Date.now() });
      toast('Cas marqué comme relu');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };
  const duplicate = async () => {
    try {
      const { id: _id, ...data } = kase;
      const ref = await addDoc(collection(db, 'cases'), { ...data, title: `${kase.title} (copie)`, reviewed: false, createdBy: profile?.uid, updatedAt: Date.now() });
      navigate(`/cas/${ref.id}/modifier`);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };
  const remove = async () => {
    if (!(await confirm({ title: 'Supprimer ce cas ?', message: 'Les sessions où il a été attribué afficheront « cas introuvable ».', danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      await deleteDoc(doc(db, 'cases', kase.id));
      navigate('/cas');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div className="max-w-5xl">
      <PageHeader
        back={{ to: '/cas', label: 'Cas pratiques' }}
        kicker={`${kase.tradeIds.length ? kase.tradeIds.map((t) => tradeById[t]?.label ?? t).join(', ') : 'Tous métiers'}${kase.number ? ` · Cas n° ${kase.number}` : ''}`}
        title={kase.title}
        subtitle={`Geste évalué : ${kase.geste}`}
        actions={
          canEdit && (
            <>
              {!kase.reviewed && (
                <button className="btn-secondary" onClick={markReviewed}>
                  <BadgeCheck className="h-4 w-4" /> Marquer comme relu
                </button>
              )}
              <button className="btn-ghost btn-sm" onClick={duplicate}>
                <Copy className="h-4 w-4" /> Dupliquer
              </button>
              <button className="btn-ghost btn-sm text-red-600" onClick={remove}>
                <Trash2 className="h-4 w-4" />
              </button>
              <Link to={`/cas/${kase.id}/modifier`} className="btn-primary">
                <Pencil className="h-4 w-4" /> Modifier
              </Link>
            </>
          )
        }
      />
      {!kase.reviewed && (
        <p className="mb-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Proposition rédigée d’après l’aide-mémoire INRS : relisez-la et adaptez-la à vos pratiques avant de la marquer comme relue.
        </p>
      )}
      <CaseSheet kase={kase} />

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="card p-5">
          <h2 className="section-title mb-3">Épreuve 1 – Actions attendues</h2>
          <ol className="space-y-2">
            {kase.actions.map((a, i) => (
              <li key={i} className="flex gap-3 text-sm">
                <span className="font-bold text-sst-700">{i + 1}.</span>
                <span className="flex-1">
                  {a.text}
                  <span className="mt-1 flex flex-wrap gap-1">
                    {a.indicators.map((ind) => (
                      <span key={ind} title={INDICATOR_BY_ID[ind].text} className={clsx('rounded px-1.5 text-[10px] font-bold', INDICATOR_BY_ID[ind].key ? 'bg-yellow-200 text-yellow-900' : 'bg-slate-100 text-slate-600')}>
                        {ind}
                      </span>
                    ))}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </section>
        <section className="card p-5">
          <h2 className="section-title mb-3">Épreuve 2 – Prévention : réponses attendues</h2>
          <dl className="space-y-3 text-sm">
            {kase.prevention.map((p) => (
              <div key={p.key}>
                <dt className="font-bold">
                  {p.label} <span className="text-[10px] text-slate-500">{p.indicators.join(' · ')}</span>
                </dt>
                <dd className="text-ink-soft">{p.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}

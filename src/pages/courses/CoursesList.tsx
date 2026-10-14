import { addDoc, collection } from 'firebase/firestore';
import { BookOpen, Plus, Presentation } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { EmptyState, errorMessage, PageHeader, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { db } from '../../lib/firebase';
import { newId } from '../../lib/format';
import type { Course } from '../../lib/types';

export default function CoursesList() {
  const { courses, trades, tradeById } = useData();
  const { can, profile } = useAuth();
  const { toast } = useFeedback();
  const navigate = useNavigate();
  const [trade, setTrade] = useState('');

  const list = courses.filter((c) => !trade || c.tradeIds.length === 0 || c.tradeIds.includes(trade));

  const create = async () => {
    const course: Omit<Course, 'id'> = {
      title: 'Nouveau support',
      description: '',
      tradeIds: [],
      slides: [{ id: newId('s-'), layout: 'cover', kicker: 'Formation SST', title: 'Sauveteur Secouriste du Travail', subtitle: '' }],
      attachments: [],
      order: courses.length + 1,
      createdBy: profile?.uid,
      updatedAt: Date.now(),
    };
    try {
      const ref = await addDoc(collection(db, 'courses'), course);
      navigate(`/cours/${ref.id}/modifier`);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      <PageHeader
        kicker="Pédagogie"
        title="Supports de cours"
        subtitle="Projetez vos cours en plein écran et retrouvez vos notes de présentation."
        actions={
          <>
            <select className="input w-auto py-2" value={trade} onChange={(e) => setTrade(e.target.value)}>
              <option value="">Tous les métiers</option>
              {trades.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
            {can('manageCourses') && (
              <button className="btn-primary" onClick={create}>
                <Plus className="h-4 w-4" /> Nouveau support
              </button>
            )}
          </>
        }
      />
      {list.length === 0 ? (
        <EmptyState icon={<BookOpen />} title="Aucun support de cours">
          {can('manageSettings') ? 'Installez le contenu par défaut depuis Paramètres > Contenu pédagogique.' : 'Les supports apparaîtront ici.'}
        </EmptyState>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {list.map((c) => {
            const cover = c.slides[0];
            return (
              <div key={c.id} className="card group flex flex-col overflow-hidden">
                <Link to={`/cours/${c.id}`} className="relative block aspect-video bg-gradient-to-br from-sst-700 via-sst-800 to-sst-950 p-6 text-white">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-vigilance">{cover?.kicker}</p>
                  <p className="mt-2 font-display text-xl font-extrabold leading-tight">{cover?.title ?? c.title}</p>
                  <span className="absolute bottom-4 right-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{c.slides.length} diapositives</span>
                </Link>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-bold group-hover:text-sst-700">{c.title}</h3>
                  {c.description && <p className="mt-1 line-clamp-2 text-sm text-ink-muted">{c.description}</p>}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {c.tradeIds.length === 0 ? <span className="badge-gray">Tous métiers</span> : c.tradeIds.map((t) => <span key={t} className="badge-green">{tradeById[t]?.code ?? t}</span>)}
                  </div>
                  <div className="mt-auto flex gap-2 pt-4">
                    <Link to={`/cours/${c.id}`} className="btn-secondary btn-sm">
                      <BookOpen className="h-4 w-4" /> Ouvrir
                    </Link>
                    <Link to={`/cours/${c.id}/presentation`} className="btn-primary btn-sm">
                      <Presentation className="h-4 w-4" /> Présenter
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

import clsx from 'clsx';
import { addDoc, collection } from 'firebase/firestore';
import { ChevronLeft, ChevronRight, Copy, Download, Maximize, Paperclip, Pencil, Presentation, StickyNote, X } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import SlideView from '../../components/SlideView';
import { EmptyState, errorMessage, PageHeader, PageLoader, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { db } from '../../lib/firebase';

export default function CourseViewer({ presentation = false }: { presentation?: boolean }) {
  const { cid } = useParams();
  const { courses, loading, tradeById } = useData();
  const { can, profile } = useAuth();
  const { toast } = useFeedback();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [notes, setNotes] = useState(!presentation);
  const course = courses.find((c) => c.id === cid);
  const total = course?.slides.length ?? 0;
  const index = Math.min(Math.max(Number(params.get('diapo') ?? 1) - 1, 0), Math.max(total - 1, 0));

  const go = useCallback((i: number) => setParams({ diapo: String(Math.min(Math.max(i, 0), total - 1) + 1) }, { replace: true }), [setParams, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (['ArrowLeft', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === 'Home') go(0);
      else if (e.key === 'End') go(total - 1);
      else if (e.key.toLowerCase() === 'n') setNotes((n) => !n);
      else if (e.key === 'Escape' && presentation) navigate(`/cours/${cid}?diapo=${index + 1}`);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, index, total, presentation, navigate, cid]);

  if (loading) return <PageLoader />;
  if (!course) return <EmptyState title="Support introuvable" />;
  const slide = course.slides[index];
  const footer = { left: course.title, right: `${index + 1}` };

  if (presentation) {
    return (
      <div className="fixed inset-0 flex flex-col bg-[#0b1a12]">
        <div className="relative flex-1 p-3 sm:p-6" onClick={() => go(index + 1)}>
          {slide && <SlideView slide={slide} footer={footer} fill />}
        </div>
        {notes && slide?.notes && <div className="max-h-40 overflow-y-auto border-t border-white/10 bg-black/60 px-8 py-4 text-base text-sst-100">{slide.notes}</div>}
        <div className="flex items-center justify-between bg-black/40 px-4 py-2 text-sm text-sst-100">
          <Link to={`/cours/${course.id}?diapo=${index + 1}`} className="inline-flex items-center gap-1 hover:text-white">
            <X className="h-4 w-4" /> Quitter (Échap)
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={() => go(index - 1)} className="rounded-lg p-1 hover:bg-white/10" aria-label="Précédente">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span>
              {index + 1} / {total}
            </span>
            <button onClick={() => go(index + 1)} className="rounded-lg p-1 hover:bg-white/10" aria-label="Suivante">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setNotes(!notes)} className={clsx('inline-flex items-center gap-1 hover:text-white', notes && 'text-white')}>
              <StickyNote className="h-4 w-4" /> Notes (N)
            </button>
            <button onClick={() => document.documentElement.requestFullscreen?.().catch(() => undefined)} className="inline-flex items-center gap-1 hover:text-white">
              <Maximize className="h-4 w-4" /> Plein écran
            </button>
          </div>
        </div>
      </div>
    );
  }

  const duplicate = async () => {
    try {
      const { id: _id, ...data } = course;
      const ref = await addDoc(collection(db, 'courses'), { ...data, title: `${course.title} (copie)`, createdBy: profile?.uid, updatedAt: Date.now() });
      toast('Support dupliqué');
      navigate(`/cours/${ref.id}/modifier`);
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  return (
    <div>
      <PageHeader
        back={{ to: '/cours', label: 'Supports de cours' }}
        kicker={course.tradeIds.length ? course.tradeIds.map((t) => tradeById[t]?.label ?? t).join(' · ') : 'Tous métiers'}
        title={course.title}
        subtitle={course.description}
        actions={
          <>
            {can('manageCourses') && (
              <>
                <button className="btn-ghost btn-sm" onClick={duplicate}>
                  <Copy className="h-4 w-4" /> Dupliquer
                </button>
                <Link to={`/cours/${course.id}/modifier`} className="btn-secondary">
                  <Pencil className="h-4 w-4" /> Modifier
                </Link>
              </>
            )}
            <Link to={`/cours/${course.id}/presentation?diapo=${index + 1}`} className="btn-primary">
              <Presentation className="h-4 w-4" /> Présenter
            </Link>
          </>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
        <nav className="card hidden max-h-[75vh] overflow-y-auto p-2 xl:block">
          {course.slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={clsx(
                'flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-sm transition',
                i === index ? 'bg-sst-600 text-white' : 'hover:bg-sst-50',
                (s.layout === 'section' || s.layout === 'cover') && i !== index && 'font-bold text-sst-800',
              )}
            >
              <span className={clsx('w-6 shrink-0 text-xs', i === index ? 'text-sst-100' : 'text-ink-muted')}>{i + 1}</span>
              <span className="line-clamp-2">{s.title}</span>
            </button>
          ))}
        </nav>

        <div className="min-w-0">
          {slide && <SlideView slide={slide} footer={footer} />}
          <div className="mt-4 flex items-center justify-between">
            <button className="btn-secondary" disabled={index === 0} onClick={() => go(index - 1)}>
              <ChevronLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-sm font-semibold text-ink-muted">
              {index + 1} / {total}
            </span>
            <button className="btn-secondary" disabled={index >= total - 1} onClick={() => go(index + 1)}>
              Suivante <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          {slide?.notes && (
            <div className="card mt-4 p-5">
              <button className="mb-2 flex items-center gap-2 text-sm font-bold text-sst-700" onClick={() => setNotes(!notes)}>
                <StickyNote className="h-4 w-4" /> Notes du formateur
              </button>
              {notes && <p className="text-sm leading-relaxed text-ink-soft">{slide.notes}</p>}
            </div>
          )}
          {!!course.attachments?.length && (
            <div className="card mt-4 p-5">
              <p className="mb-2 flex items-center gap-2 text-sm font-bold text-sst-700">
                <Paperclip className="h-4 w-4" /> Fichiers joints
              </p>
              <ul className="space-y-1">
                {course.attachments.map((a) => (
                  <li key={a.path}>
                    <a href={a.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-sst-700 hover:underline">
                      <Download className="h-4 w-4" /> {a.name} <span className="text-xs font-normal text-ink-muted">({Math.round(a.size / 1024)} Ko)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

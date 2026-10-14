import clsx from 'clsx';
import { deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';
import { ArrowDown, ArrowUp, Copy, Eye, Paperclip, Plus, Save, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import SlideView from '../../components/SlideView';
import { EmptyState, errorMessage, Field, PageHeader, PageLoader, Spinner, useFeedback } from '../../components/ui';
import { useData } from '../../hooks/useData';
import { db, storage } from '../../lib/firebase';
import { newId } from '../../lib/format';
import type { Attachment, Callout, CalloutKind, Course, Slide, SlideItem, SlideLayout } from '../../lib/types';

const LAYOUTS: Record<SlideLayout, string> = {
  cover: 'Couverture',
  section: 'Titre de partie',
  content: 'Texte et puces',
  cards: 'Cartes',
  steps: 'Étapes numérotées',
  stats: 'Chiffres clés',
};

const CALLOUTS: Record<CalloutKind, string> = {
  metier: 'Côté métier',
  attention: 'Attention',
  info: 'À retenir',
  question: 'Question',
};

export default function CourseEditor() {
  const { cid } = useParams();
  const { courses, trades, loading } = useData();
  const { toast, confirm } = useFeedback();
  const navigate = useNavigate();
  const original = courses.find((c) => c.id === cid);
  const [course, setCourse] = useState<Course | null>(null);
  const [sel, setSel] = useState(0);
  const [dirty, setDirty] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (original && !course) setCourse(structuredClone(original));
  }, [original, course]);

  if (loading || (original && !course)) return <PageLoader />;
  if (!course) return <EmptyState title="Support introuvable" />;
  const slide = course.slides[sel];

  const patch = (p: Partial<Course>) => {
    setCourse({ ...course, ...p });
    setDirty(true);
  };
  const patchSlide = (p: Partial<Slide>) => {
    const slides = course.slides.map((s, i) => (i === sel ? { ...s, ...p } : s));
    patch({ slides });
  };
  const move = (from: number, to: number) => {
    if (to < 0 || to >= course.slides.length) return;
    const slides = [...course.slides];
    const [s] = slides.splice(from, 1);
    slides.splice(to, 0, s);
    patch({ slides });
    setSel(to);
  };
  const addSlide = (layout: SlideLayout = 'content') => {
    const s: Slide = { id: newId('s-'), layout, title: 'Nouvelle diapositive', items: layout === 'cards' || layout === 'steps' || layout === 'stats' ? [{ title: 'Élément' }] : [] };
    const slides = [...course.slides];
    slides.splice(sel + 1, 0, s);
    patch({ slides });
    setSel(sel + 1);
  };
  const duplicateSlide = () => {
    const slides = [...course.slides];
    slides.splice(sel + 1, 0, { ...structuredClone(slide), id: newId('s-') });
    patch({ slides });
    setSel(sel + 1);
  };
  const removeSlide = () => {
    if (course.slides.length <= 1) return;
    patch({ slides: course.slides.filter((_, i) => i !== sel) });
    setSel(Math.max(0, sel - 1));
  };

  const save = async () => {
    try {
      const { id, ...data } = course;
      await setDoc(doc(db, 'courses', id), JSON.parse(JSON.stringify({ ...data, updatedAt: Date.now() })));
      setDirty(false);
      toast('Support enregistré');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const remove = async () => {
    if (!(await confirm({ title: 'Supprimer ce support ?', message: 'Le support et ses diapositives seront supprimés.', danger: true, confirmLabel: 'Supprimer' }))) return;
    try {
      await deleteDoc(doc(db, 'courses', course.id));
      navigate('/cours');
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const upload = async (file: File) => {
    setUploading(true);
    try {
      const path = `courses/${course.id}/${Date.now()}-${file.name.replace(/[^\w.-]+/g, '_')}`;
      const r = storageRef(storage, path);
      await uploadBytes(r, file, { contentType: file.type });
      const att: Attachment = { name: file.name, path, url: await getDownloadURL(r), size: file.size, contentType: file.type };
      const attachments = [...(course.attachments ?? []), att];
      await updateDoc(doc(db, 'courses', course.id), { attachments });
      setCourse({ ...course, attachments });
      toast('Fichier ajouté');
    } catch (err) {
      toast(`${errorMessage(err)} (le stockage de fichiers Firebase doit être activé)`, 'error');
    } finally {
      setUploading(false);
    }
  };

  const removeAttachment = async (a: Attachment) => {
    try {
      await deleteObject(storageRef(storage, a.path)).catch(() => undefined);
      const attachments = (course.attachments ?? []).filter((x) => x.path !== a.path);
      await updateDoc(doc(db, 'courses', course.id), { attachments });
      setCourse({ ...course, attachments });
    } catch (err) {
      toast(errorMessage(err), 'error');
    }
  };

  const items = slide?.items ?? [];
  const setItem = (i: number, p: Partial<SlideItem>) => patchSlide({ items: items.map((it, k) => (k === i ? { ...it, ...p } : it)) });
  const callouts = slide?.callouts ?? [];
  const setCallout = (i: number, p: Partial<Callout>) => patchSlide({ callouts: callouts.map((c, k) => (k === i ? { ...c, ...p } : c)) });

  return (
    <div>
      <PageHeader
        back={{ to: `/cours/${course.id}`, label: 'Retour au support' }}
        kicker="Édition du support"
        title={course.title}
        actions={
          <>
            <button className="btn-ghost btn-sm text-red-600" onClick={remove}>
              <Trash2 className="h-4 w-4" /> Supprimer
            </button>
            <Link to={`/cours/${course.id}?diapo=${sel + 1}`} className="btn-secondary">
              <Eye className="h-4 w-4" /> Aperçu
            </Link>
            <button className="btn-primary" disabled={!dirty} onClick={save}>
              <Save className="h-4 w-4" /> Enregistrer
            </button>
          </>
        }
      />

      <div className="card mb-6 grid gap-4 p-5 md:grid-cols-2">
        <Field label="Titre du support">
          <input className="input" value={course.title} onChange={(e) => patch({ title: e.target.value })} />
        </Field>
        <Field label="Description">
          <input className="input" value={course.description ?? ''} onChange={(e) => patch({ description: e.target.value })} />
        </Field>
        <div className="md:col-span-2">
          <p className="label">Métiers concernés (aucun = tous les métiers)</p>
          <div className="flex flex-wrap gap-2">
            {trades.map((t) => {
              const on = course.tradeIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => patch({ tradeIds: on ? course.tradeIds.filter((x) => x !== t.id) : [...course.tradeIds, t.id] })}
                  className={clsx('rounded-full border px-3 py-1 text-xs font-semibold', on ? 'border-sst-600 bg-sst-600 text-white' : 'border-slate-200 hover:border-sst-300')}
                >
                  {t.code} · {t.label}
                </button>
              );
            })}
          </div>
        </div>
        <div className="md:col-span-2">
          <p className="label flex items-center gap-2">
            <Paperclip className="h-4 w-4" /> Fichiers joints (PowerPoint d’origine, PDF, vidéos…)
          </p>
          <div className="flex flex-wrap items-center gap-2">
            {(course.attachments ?? []).map((a) => (
              <span key={a.path} className="badge-gray">
                {a.name}
                <button onClick={() => removeAttachment(a)} aria-label="Retirer">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <label className="btn-secondary btn-sm cursor-pointer">
              {uploading ? <Spinner className="h-4 w-4" /> : <Upload className="h-4 w-4" />} Ajouter un fichier
              <input type="file" className="hidden" onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])} />
            </label>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[240px_1fr]">
        <div className="card max-h-[80vh] overflow-y-auto p-2">
          {course.slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setSel(i)}
              className={clsx('flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left text-sm', i === sel ? 'bg-sst-600 text-white' : 'hover:bg-sst-50')}
            >
              <span className="w-6 shrink-0 text-xs opacity-70">{i + 1}</span>
              <span className="line-clamp-2">{s.title}</span>
            </button>
          ))}
          <button className="btn-ghost btn-sm mt-2 w-full" onClick={() => addSlide()}>
            <Plus className="h-4 w-4" /> Ajouter une diapositive
          </button>
        </div>

        {slide && (
          <div className="grid gap-6 2xl:grid-cols-2">
            <div className="card space-y-4 p-5">
              <div className="flex flex-wrap items-center gap-2">
                <select className="input w-auto py-2" value={slide.layout} onChange={(e) => patchSlide({ layout: e.target.value as SlideLayout })}>
                  {Object.entries(LAYOUTS).map(([k, v]) => (
                    <option key={k} value={k}>
                      {v}
                    </option>
                  ))}
                </select>
                <div className="ml-auto flex gap-1">
                  <button className="btn-ghost btn-sm" onClick={() => move(sel, sel - 1)} aria-label="Monter">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button className="btn-ghost btn-sm" onClick={() => move(sel, sel + 1)} aria-label="Descendre">
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button className="btn-ghost btn-sm" onClick={duplicateSlide} aria-label="Dupliquer">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="btn-ghost btn-sm text-red-600" onClick={removeSlide} aria-label="Supprimer">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <Field label="Surtitre">
                <input className="input" value={slide.kicker ?? ''} onChange={(e) => patchSlide({ kicker: e.target.value })} />
              </Field>
              <Field label="Titre">
                <input className="input" value={slide.title} onChange={(e) => patchSlide({ title: e.target.value })} />
              </Field>
              {(slide.layout === 'cover' || slide.layout === 'section') && (
                <Field label="Sous-titre">
                  <input className="input" value={slide.subtitle ?? ''} onChange={(e) => patchSlide({ subtitle: e.target.value })} />
                </Field>
              )}
              {slide.layout === 'steps' && (
                <Field label="Résultat à atteindre (facultatif)">
                  <input className="input" value={slide.result ?? ''} onChange={(e) => patchSlide({ result: e.target.value })} />
                </Field>
              )}
              {slide.layout !== 'cover' && slide.layout !== 'section' && (
                <Field label="Texte" help="Une ligne commençant par « - » devient une puce.">
                  <textarea className="input" rows={4} value={slide.body ?? ''} onChange={(e) => patchSlide({ body: e.target.value })} />
                </Field>
              )}
              {['cover', 'cards', 'steps', 'stats'].includes(slide.layout) && (
                <div>
                  <p className="label">{slide.layout === 'steps' ? 'Étapes' : slide.layout === 'cards' ? 'Cartes' : 'Chiffres'}</p>
                  <div className="space-y-2">
                    {items.map((it, i) => (
                      <div key={i} className="flex gap-2 rounded-xl border border-slate-200 p-2">
                        <div className="grid flex-1 gap-2">
                          {(slide.layout === 'stats' || slide.layout === 'cover' || slide.layout === 'cards') && (
                            <input className="input py-1.5" placeholder="Valeur (ex. 15, 24 mois)" value={it.value ?? ''} onChange={(e) => setItem(i, { value: e.target.value })} />
                          )}
                          <input className="input py-1.5" placeholder="Titre" value={it.title ?? ''} onChange={(e) => setItem(i, { title: e.target.value })} />
                          {slide.layout !== 'stats' && slide.layout !== 'cover' && (
                            <textarea className="input py-1.5" rows={2} placeholder="Texte" value={it.text ?? ''} onChange={(e) => setItem(i, { text: e.target.value })} />
                          )}
                        </div>
                        <button className="btn-ghost btn-sm self-start text-red-600" onClick={() => patchSlide({ items: items.filter((_, k) => k !== i) })} aria-label="Retirer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button className="btn-ghost btn-sm" onClick={() => patchSlide({ items: [...items, { title: '' }] })}>
                      <Plus className="h-4 w-4" /> Ajouter
                    </button>
                  </div>
                </div>
              )}
              {slide.layout !== 'cover' && slide.layout !== 'section' && (
                <div>
                  <p className="label">Encadrés</p>
                  <div className="space-y-2">
                    {callouts.map((c, i) => (
                      <div key={i} className="flex gap-2 rounded-xl border border-slate-200 p-2">
                        <div className="grid flex-1 gap-2">
                          <div className="flex gap-2">
                            <select className="input w-40 py-1.5" value={c.kind} onChange={(e) => setCallout(i, { kind: e.target.value as CalloutKind })}>
                              {Object.entries(CALLOUTS).map(([k, v]) => (
                                <option key={k} value={k}>
                                  {v}
                                </option>
                              ))}
                            </select>
                            <input className="input py-1.5" placeholder="Titre (facultatif)" value={c.title ?? ''} onChange={(e) => setCallout(i, { title: e.target.value })} />
                          </div>
                          <textarea className="input py-1.5" rows={2} value={c.text} onChange={(e) => setCallout(i, { text: e.target.value })} />
                        </div>
                        <button className="btn-ghost btn-sm self-start text-red-600" onClick={() => patchSlide({ callouts: callouts.filter((_, k) => k !== i) })} aria-label="Retirer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button className="btn-ghost btn-sm" onClick={() => patchSlide({ callouts: [...callouts, { kind: 'metier', text: '' }] })}>
                      <Plus className="h-4 w-4" /> Ajouter un encadré
                    </button>
                  </div>
                </div>
              )}
              <Field label="Notes du formateur">
                <textarea className="input" rows={3} value={slide.notes ?? ''} onChange={(e) => patchSlide({ notes: e.target.value })} />
              </Field>
            </div>
            <div className="2xl:sticky 2xl:top-6 2xl:self-start">
              <SlideView slide={slide} footer={{ left: course.title, right: String(sel + 1) }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import clsx from 'clsx';
import { addDoc, collection } from 'firebase/firestore';
import { ArrowLeft, ArrowRight, Check, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CsvImport, { type CsvResult } from '../../components/CsvImport';
import { errorMessage, Field, PageHeader, Spinner, useFeedback } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';
import { detectSessionTrade } from '../../lib/csv';
import { db } from '../../lib/firebase';
import { fullName, todayIso } from '../../lib/format';
import { addLearners } from '../../lib/sessionOps';
import type { CasePool, Session } from '../../lib/types';

const STEPS = ['Dates et intitulé', 'Apprentis', 'Métier'];

export default function SessionNew() {
  const { profile } = useAuth();
  const { trades } = useData();
  const { toast } = useFeedback();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const [info, setInfo] = useState({ title: '', groupName: '', location: '', startDate: todayIso(), endDate: todayIso() });
  const [csv, setCsv] = useState<CsvResult | null>(null);
  const [tradeId, setTradeId] = useState('');
  const [casePool, setCasePool] = useState<CasePool>('both');

  const datesValid = info.startDate && info.endDate && info.endDate >= info.startDate;
  // recalculé si la liste des métiers arrive après le fichier
  const detected = useMemo(() => (csv ? detectSessionTrade(csv.learners, trades) : null), [csv, trades]);
  const selectedTrade = tradeId || detected?.id || '';

  const goToTrade = () => setStep(2);

  const create = async () => {
    if (!profile || !selectedTrade) return;
    const tradeId = selectedTrade;
    setBusy(true);
    try {
      const trade = trades.find((t) => t.id === tradeId);
      const group = info.groupName.trim() || csv?.learners.find((l) => l.groupName)?.groupName || '';
      const session: Omit<Session, 'id'> = {
        title: info.title.trim() || `SST ${trade?.code ?? ''} ${group}`.replace(/\s+/g, ' ').trim(),
        trainerId: profile.uid,
        trainerName: fullName(profile),
        tradeId,
        groupName: group,
        location: info.location.trim(),
        startDate: info.startDate,
        endDate: info.endDate,
        status: 'active',
        closedAt: null,
        casePool,
        drawnCaseIds: [],
        drawCounter: 0,
        learnerCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const ref = await addDoc(collection(db, 'sessions'), session);
      if (csv?.learners.length) await addLearners(ref.id, csv.learners, tradeId);
      toast('Session créée');
      navigate(`/sessions/${ref.id}`);
    } catch (err) {
      toast(errorMessage(err), 'error');
      setBusy(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <PageHeader back={{ to: '/sessions', label: 'Sessions' }} kicker="Nouvelle session" title="Créer une session de formation" />

      <ol className="mb-8 flex items-center gap-2">
        {STEPS.map((s, i) => (
          <li key={s} className="flex flex-1 items-center gap-2">
            <span
              className={clsx(
                'flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                i < step ? 'bg-sst-600 text-white' : i === step ? 'bg-sst-100 text-sst-800 ring-2 ring-sst-500' : 'bg-slate-100 text-slate-500',
              )}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </span>
            <span className={clsx('hidden text-sm font-semibold sm:block', i === step ? 'text-ink' : 'text-ink-muted')}>{s}</span>
            {i < STEPS.length - 1 && <span className="h-0.5 flex-1 rounded bg-slate-200" />}
          </li>
        ))}
      </ol>

      <div className="card p-6">
        {step === 0 && (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Du">
                <input className="input" type="date" value={info.startDate} onChange={(e) => setInfo({ ...info, startDate: e.target.value, endDate: e.target.value > info.endDate ? e.target.value : info.endDate })} />
              </Field>
              <Field label="Au">
                <input className="input" type="date" min={info.startDate} value={info.endDate} onChange={(e) => setInfo({ ...info, endDate: e.target.value })} />
              </Field>
            </div>
            <Field label="Intitulé (facultatif)" help="Laissé vide, il sera composé à partir du métier et du groupe (ex. : SST MIT 1A).">
              <input className="input" value={info.title} onChange={(e) => setInfo({ ...info, title: e.target.value })} placeholder="SST – CAP MIT 1re année" />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Groupe / classe (facultatif)">
                <input className="input" value={info.groupName} onChange={(e) => setInfo({ ...info, groupName: e.target.value })} />
              </Field>
              <Field label="Lieu (facultatif)">
                <input className="input" value={info.location} onChange={(e) => setInfo({ ...info, location: e.target.value })} />
              </Field>
            </div>
          </div>
        )}

        {step === 1 && (
          <div>
            <h2 className="section-title mb-1">Importer les apprentis</h2>
            <p className="mb-4 text-sm text-ink-muted">Exportez la liste du groupe depuis Netyparéo au format CSV. Vous pourrez aussi ajouter, modifier ou réimporter les apprentis plus tard.</p>
            <CsvImport onChange={setCsv} />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h2 className="section-title mb-1">Métier de la section</h2>
              {detected ? (
                <p className="flex items-center gap-2 text-sm text-sst-700">
                  <Sparkles className="h-4 w-4" /> Métier détecté dans le fichier : <strong>{detected.label}</strong>
                </p>
              ) : (
                <p className="text-sm text-ink-muted">Le métier n’a pas été détecté dans le fichier : choisissez-le. Il détermine les cas pratiques tirés au sort.</p>
              )}
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {trades.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTradeId(t.id)}
                  className={clsx(
                    'flex items-center gap-3 rounded-xl border p-3 text-left transition',
                    selectedTrade === t.id ? 'border-sst-500 bg-sst-50 ring-2 ring-sst-200' : 'border-slate-200 hover:border-sst-300',
                  )}
                >
                  <span className="w-12 shrink-0 rounded-lg bg-sst-600 px-2 py-1 text-center font-display text-xs font-extrabold text-white">{t.code}</span>
                  <span className="text-sm font-semibold">{t.label}</span>
                </button>
              ))}
            </div>
            {trades.length === 0 && <p className="text-sm text-amber-700">Aucun métier configuré : demandez à l’administratrice d’installer le contenu par défaut.</p>}
            <Field label="Cas pratiques proposés au tirage au sort">
              <select className="input" value={casePool} onChange={(e) => setCasePool(e.target.value as CasePool)}>
                <option value="both">Cas du métier et cas de la vie quotidienne</option>
                <option value="metier">Uniquement les cas du métier</option>
                <option value="vie_quotidienne">Uniquement les cas de la vie quotidienne</option>
              </select>
            </Field>
          </div>
        )}

        <div className="mt-8 flex justify-between border-t border-slate-100 pt-5">
          <button className="btn-ghost" disabled={step === 0 || busy} onClick={() => setStep(step - 1)}>
            <ArrowLeft className="h-4 w-4" /> Retour
          </button>
          {step === 0 && (
            <button className="btn-primary" disabled={!datesValid} onClick={() => setStep(1)}>
              Continuer <ArrowRight className="h-4 w-4" />
            </button>
          )}
          {step === 1 && (
            <button className="btn-primary" onClick={goToTrade}>
              {csv ? `Continuer avec ${csv.learners.length} apprenti(s)` : 'Ajouter les apprentis plus tard'} <ArrowRight className="h-4 w-4" />
            </button>
          )}
          {step === 2 && (
            <button className="btn-primary" disabled={!selectedTrade || busy} onClick={create}>
              {busy ? <Spinner className="h-4 w-4 text-white" /> : <Check className="h-4 w-4" />} Créer la session
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

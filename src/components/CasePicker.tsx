import clsx from 'clsx';
import { Dices, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useData } from '../hooks/useData';
import { assignCase, pickRandomCase } from '../lib/drawOps';
import { caseMatchesPool } from '../lib/sessions';
import type { Learner, Session } from '../lib/types';
import { errorMessage, Modal, useFeedback } from './ui';

/** Choix (ou nouveau tirage) du cas pratique d'un apprenti. */
export default function CasePicker({ session, learner, onClose }: { session: Session; learner: Learner; onClose: () => void }) {
  const { cases, tradeById } = useData();
  const { toast } = useFeedback();
  const [query, setQuery] = useState('');
  const [busy, setBusy] = useState(false);
  const drawn = new Set(session.drawnCaseIds ?? []);

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return cases
      .filter((c) => caseMatchesPool(c, session.tradeId, 'both'))
      .filter((c) => !q || `${c.title} ${c.geste}`.toLowerCase().includes(q));
  }, [cases, session.tradeId, query]);

  const choose = async (caseId: string, manual: boolean) => {
    setBusy(true);
    try {
      await assignCase(session, learner, caseId, manual);
      toast('Cas attribué');
      onClose();
    } catch (err) {
      toast(errorMessage(err), 'error');
      setBusy(false);
    }
  };

  const redraw = () => {
    const c = pickRandomCase(cases, session, learner.caseId ? [learner.caseId] : []);
    if (!c) return toast('Plus aucun cas disponible dans cette session.', 'error');
    choose(c.id, false);
  };

  return (
    <Modal open onClose={onClose} size="lg" title={`Cas pratique de ${learner.firstName} ${learner.lastName}`}>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button className="btn-primary" disabled={busy} onClick={redraw}>
          <Dices className="h-4 w-4" /> {learner.caseId ? 'Tirer un autre cas au hasard' : 'Tirer un cas au hasard'}
        </button>
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Rechercher un cas…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>
      <p className="mb-3 text-xs text-ink-muted">
        Les cas déjà tirés dans cette session sont signalés : ils ne retombent pas au hasard, mais vous pouvez les choisir volontairement. Le cas précédent est remis en jeu.
      </p>
      <ul className="max-h-[50vh] space-y-2 overflow-y-auto pr-1">
        {list.map((c) => {
          const current = c.id === learner.caseId;
          const used = drawn.has(c.id) && !current;
          const inPool = caseMatchesPool(c, session.tradeId, session.casePool);
          return (
            <li key={c.id}>
              <button
                type="button"
                disabled={busy || current}
                onClick={() => choose(c.id, true)}
                className={clsx(
                  'flex w-full items-start gap-3 rounded-xl border p-3 text-left transition',
                  current ? 'border-sst-500 bg-sst-50' : 'border-slate-200 hover:border-sst-300 hover:bg-sst-50/50',
                )}
              >
                <span className="mt-0.5 w-12 shrink-0 rounded-lg bg-sst-100 py-1 text-center text-xs font-bold text-sst-800">
                  {c.tradeIds[0] ? tradeById[c.tradeIds[0]]?.code ?? '' : 'VQ'} {c.number ?? ''}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-semibold">{c.title}</span>
                  <span className="block text-xs text-ink-muted">{c.geste}</span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1">
                  {current && <span className="badge-green">Attribué</span>}
                  {used && <span className="badge-amber">Déjà tiré</span>}
                  {!inPool && <span className="badge-gray">Hors tirage</span>}
                  {c.category === 'vie_quotidienne' && <span className="badge-blue">Vie quotidienne</span>}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Modal>
  );
}

import { Briefcase, Plus, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, PageHeader } from '../../components/ui';
import { useAuth } from '../../hooks/useAuth';
import { useData } from '../../hooks/useData';

export default function CasesList() {
  const { cases, trades, tradeById } = useData();
  const { can } = useAuth();
  const [filters, setFilters] = useState({ q: '', trade: '', category: '' });

  const list = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return cases
      .filter((c) => !filters.trade || c.tradeIds.includes(filters.trade) || (filters.trade === 'tous' && c.tradeIds.length === 0))
      .filter((c) => !filters.category || c.category === filters.category)
      .filter((c) => !q || `${c.title} ${c.geste} ${c.scenario}`.toLowerCase().includes(q));
  }, [cases, filters]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof list>();
    for (const c of list) {
      const key = c.tradeIds.length === 0 ? 'Tous métiers – vie quotidienne' : c.tradeIds.map((t) => tradeById[t]?.label ?? t).join(', ');
      map.set(key, [...(map.get(key) ?? []), c]);
    }
    return [...map.entries()];
  }, [list, tradeById]);

  return (
    <div>
      <PageHeader
        kicker="Pédagogie"
        title="Cas pratiques"
        subtitle="Mises en situation par métier et de la vie quotidienne, avec les actions attendues reliées à la grille de certification."
        actions={
          can('manageCases') && (
            <Link to="/cas/nouveau/modifier" className="btn-primary">
              <Plus className="h-4 w-4" /> Nouveau cas
            </Link>
          )
        }
      />
      <div className="mb-6 flex flex-col gap-2 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Rechercher (geste, situation…)" value={filters.q} onChange={(e) => setFilters({ ...filters, q: e.target.value })} />
        </div>
        <select className="input lg:w-64" value={filters.trade} onChange={(e) => setFilters({ ...filters, trade: e.target.value })}>
          <option value="">Tous les métiers</option>
          <option value="tous">Communs à tous les métiers</option>
          {trades.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label}
            </option>
          ))}
        </select>
        <select className="input lg:w-56" value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
          <option value="">Métier et vie quotidienne</option>
          <option value="metier">Situations de travail</option>
          <option value="vie_quotidienne">Vie quotidienne</option>
        </select>
      </div>
      {groups.length === 0 ? (
        <EmptyState icon={<Briefcase />} title="Aucun cas pratique" />
      ) : (
        <div className="space-y-8">
          {groups.map(([label, items]) => (
            <section key={label}>
              <h2 className="section-title mb-3">
                {label} <span className="badge-gray ml-1">{items.length}</span>
              </h2>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {items.map((c) => (
                  <Link key={c.id} to={`/cas/${c.id}`} className="card group flex gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sst-50 font-display font-extrabold text-sst-700">{c.number ?? '•'}</span>
                    <span className="min-w-0">
                      <span className="block font-bold group-hover:text-sst-700">{c.title}</span>
                      <span className="block text-sm text-ink-muted">{c.geste}</span>
                      <span className="mt-2 flex flex-wrap gap-1">
                        {c.category === 'vie_quotidienne' && <span className="badge-blue">Vie quotidienne</span>}
                        {!c.reviewed && <span className="badge-amber">À relire</span>}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

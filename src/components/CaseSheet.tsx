import { BookOpenText, Package, UserRound, Users } from 'lucide-react';
import type { ReactNode } from 'react';
import type { PracticalCase } from '../lib/types';

/** Mise en situation d'un cas : scénario à lire et consignes des figurants. */
export default function CaseSheet({ kase, compact = false }: { kase: PracticalCase; compact?: boolean }) {
  return (
    <div className="space-y-4">
      <div className="rounded-2xl border-l-4 border-sst-500 bg-sst-50/70 p-5">
        <p className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-sst-700">
          <BookOpenText className="h-4 w-4" /> Scénario à lire à l’apprenti SST
        </p>
        <p className={compact ? 'text-sm leading-relaxed' : 'text-base leading-relaxed'}>{kase.scenario}</p>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Brief icon={<UserRound className="h-4 w-4" />} title="Victime">
          {kase.victime}
        </Brief>
        <Brief icon={<Users className="h-4 w-4" />} title="Témoin">
          {kase.temoin}
        </Brief>
        <Brief icon={<Package className="h-4 w-4" />} title="Matériel">
          {kase.materiel}
        </Brief>
      </div>
    </div>
  );
}

function Brief({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <p className="mb-1 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ink-muted">
        {icon} {title}
      </p>
      <p className="text-sm text-ink-soft">{children}</p>
    </div>
  );
}

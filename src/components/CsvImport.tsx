import clsx from 'clsx';
import { FileSpreadsheet, Upload } from 'lucide-react';
import { useMemo, useState } from 'react';
import { detectSessionTrade, FIELD_LABELS, parseCsvBuffer, rowsToLearners, type ColumnMapping, type ImportedLearner, type LearnerField, type ParsedCsv } from '../lib/csv';
import { frDate } from '../lib/format';
import type { Trade } from '../lib/types';

export interface CsvResult {
  learners: ImportedLearner[];
  detectedTrade: Trade | null;
  fileName: string;
}

const FIELDS: LearnerField[] = ['lastName', 'firstName', 'fullName', 'birthDate', 'externalId', 'formation', 'groupName', 'company', 'email', 'phone'];

/** Dépôt d'un fichier CSV + vérification de la correspondance des colonnes. */
export default function CsvImport({ trades, onChange }: { trades: Trade[]; onChange: (r: CsvResult | null) => void }) {
  const [parsed, setParsed] = useState<ParsedCsv | null>(null);
  const [mapping, setMapping] = useState<ColumnMapping>({});
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');
  const [dragging, setDragging] = useState(false);

  const learners = useMemo(() => (parsed ? rowsToLearners(parsed, mapping) : []), [parsed, mapping]);

  const emit = (p: ParsedCsv, m: ColumnMapping, name: string) => {
    const list = rowsToLearners(p, m);
    onChange(list.length ? { learners: list, detectedTrade: detectSessionTrade(list, trades), fileName: name } : null);
  };

  const load = async (file: File) => {
    setError('');
    try {
      const p = parseCsvBuffer(await file.arrayBuffer());
      if (!p.headers.length || !p.rows.length) throw new Error('Le fichier semble vide.');
      if (p.mapping.lastName === undefined && p.mapping.fullName === undefined)
        setError('Colonne « Nom » non reconnue : indiquez-la ci-dessous.');
      setParsed(p);
      setMapping(p.mapping);
      setFileName(file.name);
      emit(p, p.mapping, file.name);
    } catch (e) {
      setParsed(null);
      onChange(null);
      setError((e as Error).message || 'Fichier illisible. Exportez la liste au format CSV depuis Netyparéo.');
    }
  };

  const setField = (field: LearnerField, col: string) => {
    const next = { ...mapping };
    if (col === '') delete next[field];
    else next[field] = Number(col);
    setMapping(next);
    if (parsed) emit(parsed, next, fileName);
  };

  return (
    <div className="space-y-4">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          const f = e.dataTransfer.files?.[0];
          if (f) load(f);
        }}
        className={clsx(
          'flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 text-center transition',
          dragging ? 'border-sst-500 bg-sst-50' : 'border-sst-200 bg-white hover:border-sst-400 hover:bg-sst-50/50',
        )}
      >
        {fileName ? <FileSpreadsheet className="mb-2 h-9 w-9 text-sst-600" /> : <Upload className="mb-2 h-9 w-9 text-sst-500" />}
        <p className="font-semibold">{fileName || 'Déposez le fichier CSV des apprentis'}</p>
        <p className="mt-1 text-xs text-ink-muted">Export Netyparéo (ou Excel enregistré en CSV) : séparateur « ; » ou « , », accents gérés automatiquement.</p>
        <input type="file" accept=".csv,.txt,text/csv" className="hidden" onChange={(e) => e.target.files?.[0] && load(e.target.files[0])} />
      </label>

      {error && <p className="rounded-xl bg-amber-50 px-3 py-2 text-sm text-amber-800">{error}</p>}

      {parsed && (
        <>
          <details className="rounded-2xl border border-sst-100 bg-sst-50/40 p-4" open={!!error}>
            <summary className="cursor-pointer text-sm font-bold text-sst-800">Correspondance des colonnes ({parsed.headers.length} colonnes détectées)</summary>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {FIELDS.map((f) => (
                <label key={f} className="block">
                  <span className="mb-1 block text-xs font-semibold text-ink-soft">{FIELD_LABELS[f]}</span>
                  <select className="input py-2" value={mapping[f] ?? ''} onChange={(e) => setField(f, e.target.value)}>
                    <option value="">— Non utilisée —</option>
                    {parsed.headers.map((h, i) => (
                      <option key={i} value={i}>
                        {h || `Colonne ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </label>
              ))}
            </div>
          </details>

          <div>
            <p className="mb-2 text-sm font-semibold">
              {learners.length} apprenti(s) trouvé(s){' '}
              <span className="font-normal text-ink-muted">· encodage {parsed.encoding === 'utf-8' ? 'UTF-8' : 'Windows (ANSI)'}</span>
            </p>
            <div className="max-h-72 overflow-auto rounded-2xl border border-slate-200">
              <table className="table-base">
                <thead className="sticky top-0">
                  <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Naissance</th>
                    <th>Formation / groupe</th>
                    <th>Entreprise</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.slice(0, 200).map((l, i) => (
                    <tr key={i}>
                      <td className="font-semibold">{l.lastName}</td>
                      <td>{l.firstName}</td>
                      <td>{l.birthDate ? frDate(l.birthDate) : <span className="text-amber-600">manquante</span>}</td>
                      <td className="text-xs">{[l.formation, l.groupName].filter(Boolean).join(' · ')}</td>
                      <td className="text-xs">{l.company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

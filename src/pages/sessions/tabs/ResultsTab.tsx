import clsx from 'clsx';
import { Award, ClipboardCheck, FileArchive, FileDown, FileSpreadsheet, FileText } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState, errorMessage, Spinner, useFeedback } from '../../../components/ui';
import { useAuth } from '../../../hooks/useAuth';
import { useData } from '../../../hooks/useData';
import { COMPETENCE_ORDER } from '../../../lib/competences';
import { downloadBlob, frDate, slug } from '../../../lib/format';
import { gridForLearner, summarize } from '../../../lib/grid';
import { gridFileName, schoolYear, sessionGridsFileName, uniqueNames } from '../../../lib/gridFiles';
import { formationOf } from '../../../lib/sessions';
import type { Session, UserProfile } from '../../../lib/types';
import type { SessionBundle } from '../SessionDetail';

/** Identité du formateur de la session, pour la grille. */
export function useSessionTrainer(session: Session): Pick<UserProfile, 'firstName' | 'lastName' | 'signature'> {
  const { profile } = useAuth();
  return useMemo(() => {
    if (profile && session.trainerId === profile.uid) return profile;
    const [firstName = '', ...rest] = (session.trainerName ?? '').split(' ');
    return { firstName, lastName: rest.join(' '), signature: null };
  }, [profile, session.trainerId, session.trainerName]);
}

export default function ResultsTab({ session, learners, evaluations }: SessionBundle) {
  const { caseById, settings, tradeById } = useData();
  const { toast } = useFeedback();
  const trainer = useSessionTrainer(session);
  const [busy, setBusy] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      learners.map((l) => {
        const ev = evaluations[l.id];
        const kase = l.caseId ? caseById[l.caseId] : null;
        const summary = summarize(kase, ev ?? { learnerId: l.id, actions: {}, prevention: {}, manual: {} }, settings);
        const grid = gridForLearner({ learner: l, session, evaluation: ev, caseData: kase, settings, trainer });
        return { l, ev, kase, summary, grid };
      }),
    [learners, evaluations, caseById, settings, session, trainer],
  );

  const present = rows.filter((r) => !r.l.absent);
  const certifiedCount = present.filter((r) => r.grid.certified === true).length;
  const formation = formationOf(session);
  const year = schoolYear(session.startDate);
  const item = (r: (typeof rows)[number]) => ({ grid: r.grid, formation, absent: !!r.l.absent });

  /** Toutes les grilles dans un seul PDF, ou la grille d'un apprenti. */
  const gridsPdf = async (selected: typeof rows, name: string, key: string) => {
    setBusy(key);
    try {
      const { renderGridsPdf } = await import('../../../lib/pdf/gridPdf');
      downloadBlob(await renderGridsPdf(selected.map(item)), name, 'application/pdf');
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setBusy(null);
    }
  };

  /** Un PDF par apprenti, nommés « Grille Evaluation SST 2026-2027 NOM Prénom », dans une archive ZIP. */
  const gridsZip = async () => {
    setBusy('zip');
    try {
      const [{ renderGridsPdf }, { zipSync }] = await Promise.all([import('../../../lib/pdf/gridPdf'), import('fflate')]);
      const names = uniqueNames(rows.map((r) => gridFileName(r.grid.candidate, year)));
      const files: Record<string, Uint8Array> = {};
      for (const [i, r] of rows.entries()) files[names[i]] = await renderGridsPdf([item(r)]);
      // les PDF sont déjà compressés : on les range sans les recompresser
      downloadBlob(zipSync(files, { level: 0 }), sessionGridsFileName(session.title, year, 'zip'), 'application/zip');
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setBusy(null);
    }
  };

  const fichesPdf = async () => {
    setBusy('fiches');
    try {
      const { renderFichePdf } = await import('../../../lib/pdf/fichePdf');
      const bytes = await renderFichePdf(
        rows.map((r) => ({
          learner: r.l,
          session,
          tradeLabel: tradeById[session.tradeId]?.label ?? 'SST',
          caseData: r.kase,
          evaluation: r.ev,
          summary: r.summary,
          trainerName: session.trainerName,
        })),
      );
      downloadBlob(bytes, `fiches-evaluation-${slug(session.title)}.pdf`, 'application/pdf');
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setBusy(null);
    }
  };

  const exportCsv = () => {
    const head = ['Nom', 'Prénom', 'Date de naissance', 'Identifiant', 'Entreprise', 'Cas pratique', 'QCM', ...COMPETENCE_ORDER, 'Certifié', 'Date de certification'];
    const lines = rows.map(({ l, kase, ev, grid }) => [
      l.lastName,
      l.firstName,
      frDate(l.birthDate),
      l.externalId ?? '',
      l.company ?? '',
      kase ? `${kase.number ?? ''} ${kase.title}`.trim() : '',
      ev?.qcm ? `${ev.qcm.score}/${ev.qcm.total}` : '',
      ...COMPETENCE_ORDER.map((c) => (l.absent ? '' : grid.competences[c] === 'acquise' ? 'Acquise' : grid.competences[c] === 'non_acquise' ? 'Non acquise' : '')),
      l.absent ? 'ABSENT' : grid.certified === true ? 'OUI' : grid.certified === false ? 'NON' : '',
      l.absent ? '' : frDate(grid.certificationDate),
    ]);
    const csv = [head, ...lines].map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\r\n');
    downloadBlob('﻿' + csv, `resultats-${slug(session.title)}.csv`, 'text/csv;charset=utf-8');
  };

  if (learners.length === 0) return <EmptyState icon={<Award />} title="Aucun apprenti à évaluer" />;

  return (
    <div>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          <strong className="text-sst-700">{certifiedCount}</strong> certifié(s) sur {present.length} présent(s)
          {rows.length > present.length && <> · {rows.length - present.length} absent(s)</>}. Les grilles sont pré-remplies à partir du cas pratique, de l’entretien et du QCM ; ouvrez-les pour les vérifier et les signer.
        </p>
        <div className="flex flex-wrap gap-2">
          <button className="btn-primary btn-sm" disabled={!!busy} onClick={gridsZip} title="Un fichier PDF par apprenti, déjà nommé, dans une archive ZIP">
            {busy === 'zip' ? <Spinner className="h-4 w-4 text-white" /> : <FileArchive className="h-4 w-4" />} Grilles (un PDF par apprenti)
          </button>
          <button className="btn-secondary btn-sm" disabled={!!busy} onClick={() => gridsPdf(rows, sessionGridsFileName(session.title, year, 'pdf'), 'all')} title="Toutes les grilles dans un seul PDF, prêt à imprimer">
            {busy === 'all' ? <Spinner className="h-4 w-4" /> : <FileDown className="h-4 w-4" />} Toutes les grilles (1 PDF)
          </button>
          <button className="btn-secondary btn-sm" disabled={!!busy} onClick={fichesPdf}>
            {busy === 'fiches' ? <Spinner className="h-4 w-4" /> : <FileText className="h-4 w-4" />} Fiches d’évaluation
          </button>
          <button className="btn-secondary btn-sm" onClick={exportCsv}>
            <FileSpreadsheet className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="card overflow-x-auto">
        <table className="table-base">
          <thead>
            <tr>
              <th>Apprenti</th>
              <th>QCM</th>
              <th>Épreuve 1</th>
              <th>Épreuve 2</th>
              <th className="text-center">C1 à C8</th>
              <th>Certification</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ l, ev, grid, summary }) => (
              <tr key={l.id}>
                <td>
                  <p className="font-semibold">
                    {l.lastName} {l.firstName}
                    {l.absent && <span className="badge-blue ml-2">Absent</span>}
                  </p>
                  {ev?.gridEdited && <p className="text-xs text-sky-700">Grille vérifiée par le formateur</p>}
                </td>
                <td>{ev?.qcm ? <span className="badge-gray">{ev.qcm.score}/{ev.qcm.total}</span> : <span className="text-xs text-ink-muted">—</span>}</td>
                <td>
                  {l.absent ? (
                    <span className="text-xs text-ink-muted">—</span>
                  ) : (
                    <>
                      <EpreuveBadge value={summary.epreuve1} />
                      {summary.actionsTotal > 0 && <p className="mt-0.5 text-[11px] text-ink-muted">{summary.actionsDone}/{summary.actionsTotal} actions</p>}
                    </>
                  )}
                </td>
                <td>{l.absent ? <span className="text-xs text-ink-muted">—</span> : <EpreuveBadge value={summary.epreuve2} />}</td>
                <td>
                  <div className="flex justify-center gap-1">
                    {COMPETENCE_ORDER.map((c) => {
                      const v = l.absent ? null : (grid.competences[c] ?? null);
                      return (
                        <span
                          key={c}
                          title={`${c} : ${v ?? (l.absent ? 'absent' : 'à évaluer')}`}
                          className={clsx(
                            'flex h-6 w-6 items-center justify-center rounded-md text-[10px] font-bold',
                            v === 'acquise' && 'bg-sst-600 text-white',
                            v === 'non_acquise' && 'bg-red-500 text-white',
                            !v && 'bg-slate-100 text-slate-500',
                          )}
                        >
                          {c.slice(1)}
                        </span>
                      );
                    })}
                  </div>
                </td>
                <td>
                  {l.absent ? <span className="badge-blue">Absent</span> : grid.certified === true ? <span className="badge-green">Certifié</span> : grid.certified === false ? <span className="badge-red">Non certifié</span> : <span className="badge-gray">En cours</span>}
                </td>
                <td className="whitespace-nowrap text-right">
                  <Link to={`/sessions/${session.id}/evaluation/${l.id}`} className="btn-ghost btn-sm" title="Évaluation">
                    <ClipboardCheck className="h-4 w-4" />
                  </Link>
                  <Link to={`/sessions/${session.id}/grille/${l.id}`} className="btn-secondary btn-sm">
                    <Award className="h-4 w-4" /> Grille
                  </Link>
                  <button className="btn-ghost btn-sm" disabled={!!busy} title="Télécharger la grille" onClick={() => gridsPdf([rows.find((r) => r.l.id === l.id)!], gridFileName(grid.candidate, year), `one-${l.id}`)}>
                    <FileDown className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EpreuveBadge({ value }: { value: boolean | null }) {
  if (value === true) return <span className="badge-green">Validée</span>;
  if (value === false) return <span className="badge-amber">À retravailler</span>;
  return <span className="badge-gray">À évaluer</span>;
}

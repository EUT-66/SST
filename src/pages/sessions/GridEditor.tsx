import clsx from 'clsx';
import { doc, setDoc } from 'firebase/firestore';
import { FileDown, PenLine, RefreshCw, Save } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import SignaturePad from '../../components/SignaturePad';
import { EmptyState, errorMessage, Field, Modal, PageHeader, PageLoader, Spinner, useFeedback } from '../../components/ui';
import { useData } from '../../hooks/useData';
import { useDocument } from '../../hooks/useFirestore';
import { COMPETENCES, COMPETENCE_ORDER, computeCertified } from '../../lib/competences';
import { db } from '../../lib/firebase';
import { downloadBlob } from '../../lib/format';
import { buildGrid, refreshGridDerived, summarize } from '../../lib/grid';
import type { CompetenceId, CompetenceValue, Evaluation, GridState, IndicatorId, IndicatorValue } from '../../lib/types';
import { useSessionBundle } from './SessionDetail';
import { gridFileName, useSessionTrainer } from './tabs/ResultsTab';

export default function GridEditor() {
  const { sid, lid } = useParams();
  const { session, learners, loading } = useSessionBundle(sid);
  const evalDoc = useDocument<Evaluation>(sid && lid ? `sessions/${sid}/evaluations/${lid}` : null);
  const { caseById, settings } = useData();
  const { toast, confirm } = useFeedback();
  const [grid, setGrid] = useState<GridState | null>(null);
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [signing, setSigning] = useState(false);
  const [newSignature, setNewSignature] = useState<string | null>(null);

  const learner = learners.find((l) => l.id === lid);
  const trainer = useSessionTrainer(session ?? ({ trainerId: '', trainerName: '' } as never));
  const readOnly = session?.status === 'closed';

  const computed = useMemo(() => {
    if (!session || !learner) return null;
    const kase = learner.caseId ? caseById[learner.caseId] : null;
    const ev = evalDoc.data ?? { learnerId: learner.id, actions: {}, prevention: {}, manual: {} };
    return buildGrid({ learner, session, trainer, summary: summarize(kase, ev, settings) });
  }, [session, learner, caseById, evalDoc.data, settings, trainer]);

  useEffect(() => {
    if (grid || evalDoc.loading || !computed) return;
    const saved = evalDoc.data?.grid;
    // la signature enregistrée dans le profil est reprise si la grille n'en a pas
    setGrid(saved ? { ...saved, trainer: { ...saved.trainer, signature: saved.trainer.signature ?? trainer.signature ?? null } } : computed);
  }, [grid, evalDoc.loading, evalDoc.data, computed, trainer.signature]);

  if (loading || evalDoc.loading || !grid) return <PageLoader />;
  if (!session || !learner) return <EmptyState title="Apprenti introuvable" />;

  const edit = (next: GridState) => {
    if (readOnly) return;
    setGrid(next);
    setDirty(true);
  };
  const setIndicator = (id: IndicatorId, v: IndicatorValue) => {
    const current = grid.indicators[id] ?? null;
    edit(refreshGridDerived({ ...grid, indicators: { ...grid.indicators, [id]: current === v ? null : v } }));
  };
  const setCompetence = (c: CompetenceId, v: CompetenceValue) => {
    const current = grid.competences[c] ?? null;
    const competences = { ...grid.competences, [c]: current === v ? null : v };
    edit({ ...grid, competences, certified: computeCertified(competences) });
  };

  const save = async () => {
    try {
      await setDoc(doc(db, 'sessions', session.id, 'evaluations', learner.id), { learnerId: learner.id, grid, gridEdited: true, updatedAt: Date.now() }, { mergeFields: ['learnerId', 'grid', 'gridEdited', 'updatedAt'] });
      setDirty(false);
      toast('Grille enregistrée');
      return true;
    } catch (err) {
      toast(errorMessage(err), 'error');
      return false;
    }
  };

  const recompute = async () => {
    if (!computed) return;
    if (!(await confirm({ title: 'Recalculer la grille ?', message: 'Les cases seront remplies à nouveau à partir de l’évaluation (cas pratique, entretien, QCM). Vos modifications manuelles de la grille seront perdues.', confirmLabel: 'Recalculer' }))) return;
    setGrid({ ...computed, certificationDate: grid.certificationDate, trainer: { ...computed.trainer, signature: grid.trainer.signature ?? computed.trainer.signature } });
    setDirty(true);
  };

  const pdf = async () => {
    setBusy(true);
    try {
      if (dirty && !readOnly) await save();
      const { renderGridsPdf } = await import('../../lib/pdf/gridPdf');
      const bytes = await renderGridsPdf([grid], { logoLeft: settings.logoLeft, logoRight: settings.logoRight });
      downloadBlob(bytes, gridFileName(learner), 'application/pdf');
    } catch (err) {
      toast(errorMessage(err), 'error');
    } finally {
      setBusy(false);
    }
  };

  const input = (value: string, onChange: (v: string) => void, type = 'text') => (
    <input
      type={type}
      disabled={readOnly}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-md border border-transparent bg-sky-50/70 px-2 py-1 font-semibold text-[#0d2a73] hover:border-sky-200 focus:border-sky-400 focus:outline-none"
    />
  );

  return (
    <div>
      <PageHeader
        back={{ to: `/sessions/${session.id}/evaluation/${learner.id}`, label: 'Évaluation' }}
        kicker="Grille de certification des compétences du SST – formation initiale"
        title={`${learner.firstName} ${learner.lastName}`}
        subtitle="Pré-remplie depuis l’évaluation. Cliquez sur une case pour la modifier, puis générez le PDF."
        actions={
          <>
            {!readOnly && (
              <>
                <button className="btn-ghost btn-sm" onClick={recompute}>
                  <RefreshCw className="h-4 w-4" /> Recalculer depuis l’évaluation
                </button>
                <button className="btn-secondary" disabled={!dirty} onClick={save}>
                  <Save className="h-4 w-4" /> Enregistrer
                </button>
              </>
            )}
            <button className="btn-primary" disabled={busy} onClick={pdf}>
              {busy ? <Spinner className="h-4 w-4 text-white" /> : <FileDown className="h-4 w-4" />} Générer le PDF
            </button>
          </>
        }
      />

      <div className="mx-auto max-w-4xl space-y-6 rounded-3xl bg-white p-4 shadow-card sm:p-8">
        {/* Candidat / session */}
        <div className="grid border-2 border-ink sm:grid-cols-2">
          <div className="space-y-1.5 border-b border-ink p-3 sm:border-b-0 sm:border-r">
            <p className="font-bold text-sst-700 underline">Candidat :</p>
            <Row label="Nom :">{input(grid.candidate.lastName, (v) => edit({ ...grid, candidate: { ...grid.candidate, lastName: v.toLocaleUpperCase('fr-FR') } }))}</Row>
            <Row label="Prénom :">{input(grid.candidate.firstName, (v) => edit({ ...grid, candidate: { ...grid.candidate, firstName: v } }))}</Row>
            <Row label="Date de naissance :">{input(grid.candidate.birthDate, (v) => edit({ ...grid, candidate: { ...grid.candidate, birthDate: v } }), 'date')}</Row>
          </div>
          <div className="space-y-1.5 p-3">
            <p className="font-bold text-sst-700 underline">Session :</p>
            <Row label="Du :">{input(grid.session.from, (v) => edit({ ...grid, session: { ...grid.session, from: v } }), 'date')}</Row>
            <Row label="Au :">{input(grid.session.to, (v) => edit({ ...grid, session: { ...grid.session, to: v } }), 'date')}</Row>
          </div>
        </div>

        {[1, 2].map((ep) => (
          <div key={ep} className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-2 border-ink text-sm">
              <thead>
                <tr>
                  <th colSpan={6} className="border border-ink px-3 py-2 text-center text-xs font-bold text-sst-700">
                    {ep === 1
                      ? 'ÉPREUVE 1 : Lors d’une mise en situation d’accident du travail simulée (action / analyse), le candidat devra montrer sa capacité à mettre en œuvre l’intégralité des compétences lui permettant d’intervenir efficacement'
                      : 'ÉPREUVE 2 : Lors d’un entretien avec le formateur, le candidat devra répondre à un questionnement simple portant sur sa connaissance du cadre réglementaire de l’activité SST et ses compétences en matière de prévention'}
                  </th>
                </tr>
                <tr className="text-xs font-bold text-sst-700">
                  <th className="w-10 border border-ink" />
                  <th className="border border-ink px-2 py-2">Compétences</th>
                  <th className="border border-ink px-2 py-2">INDICATEURS DE RÉUSSITE</th>
                  <th className="w-16 border border-ink px-1">Acquis</th>
                  <th className="w-16 border border-ink px-1">Non acquis</th>
                  <th className="w-28 border border-ink px-2">Conditions d’acquisition</th>
                </tr>
              </thead>
              <tbody>
                {COMPETENCES.filter((c) => c.epreuve === ep).flatMap((comp) => {
                  const merged = comp.conditions.length !== comp.groups.length;
                  const total = comp.groups.reduce((n, g) => n + g.indicators.length, 0);
                  let first = true;
                  return comp.groups.flatMap((g, gi) =>
                    g.indicators.map((ind, ii) => {
                      const v = grid.indicators[ind.id] ?? null;
                      const row = (
                        <tr key={ind.id} className="align-middle">
                          {first && (
                            <td rowSpan={total} className="border border-ink text-center font-bold">
                              {comp.id}
                            </td>
                          )}
                          {ii === 0 && (
                            <td rowSpan={g.indicators.length} className="border border-ink px-2 py-2 text-xs">
                              {g.label}
                            </td>
                          )}
                          <td className="border-x border-ink px-2 py-2 text-xs">
                            {ii === 0 && g.intro && <p className="mb-1">{g.intro}</p>}
                            <span className={clsx(ind.key && 'bg-yellow-300')}>{ind.text}</span>
                          </td>
                          <td className="border border-ink text-center">
                            <Check checked={v === 'acquis'} onClick={() => setIndicator(ind.id, 'acquis')} disabled={readOnly} />
                          </td>
                          <td className="border border-ink text-center">
                            <Check checked={v === 'non_acquis'} onClick={() => setIndicator(ind.id, 'non_acquis')} disabled={readOnly} />
                          </td>
                          {merged
                            ? first && (
                                <td rowSpan={total} className="border border-ink px-2 text-xs">
                                  {comp.conditions[0]}
                                </td>
                              )
                            : ii === 0 && (
                                <td rowSpan={g.indicators.length} className="border border-ink px-2 text-xs">
                                  {comp.conditions[gi]}
                                </td>
                              )}
                        </tr>
                      );
                      first = false;
                      return row;
                    }),
                  );
                })}
              </tbody>
            </table>
            <p className="mt-1 pl-3 text-xs italic">
              Les critères de réussite incontournables sont surlignés en jaune : <span className="bg-yellow-300">exemple</span>
            </p>
          </div>
        ))}

        {/* Formateur / résultat */}
        <div className="grid border-2 border-ink md:grid-cols-[1fr_1.4fr]">
          <div className="space-y-2 border-b border-ink p-3 md:border-b-0 md:border-r">
            <p className="font-bold text-sst-700 underline">Formateur / évaluateur :</p>
            <Row label="NOM :" green>
              {input(grid.trainer.lastName, (v) => edit({ ...grid, trainer: { ...grid.trainer, lastName: v } }))}
            </Row>
            <Row label="Prénom :" green>
              {input(grid.trainer.firstName, (v) => edit({ ...grid, trainer: { ...grid.trainer, firstName: v } }))}
            </Row>
            <div>
              <p className="text-sm font-bold text-sst-700">Signature :</p>
              <div className="mt-1 flex items-center gap-3">
                <div className="flex h-20 w-48 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white p-1">
                  {grid.trainer.signature ? <img src={grid.trainer.signature} alt="Signature" className="max-h-full max-w-full" /> : <span className="text-xs text-ink-muted">Non signée</span>}
                </div>
                {!readOnly && (
                  <div className="flex flex-col gap-1">
                    <button className="btn-secondary btn-sm" onClick={() => setSigning(true)}>
                      <PenLine className="h-4 w-4" /> Signer
                    </button>
                    {grid.trainer.signature && (
                      <button className="btn-ghost btn-sm" onClick={() => edit({ ...grid, trainer: { ...grid.trainer, signature: null } })}>
                        Retirer
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-ink pt-2">
              <Field label="Date de certification">{input(grid.certificationDate, (v) => edit({ ...grid, certificationDate: v }), 'date')}</Field>
            </div>
          </div>
          <div className="p-3">
            <div className="space-y-1.5">
              {COMPETENCE_ORDER.map((c) => (
                <div key={c} className="flex items-center gap-3 text-sm font-bold text-sst-700">
                  <span className="w-32">Compétence {c.slice(1)} :</span>
                  <label className="flex items-center gap-1.5">
                    <Check checked={grid.competences[c] === 'acquise'} onClick={() => setCompetence(c, 'acquise')} disabled={readOnly} small /> Acquise
                  </label>
                  <label className="ml-4 flex items-center gap-1.5">
                    <Check checked={grid.competences[c] === 'non_acquise'} onClick={() => setCompetence(c, 'non_acquise')} disabled={readOnly} small /> Non acquise
                  </label>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-ink pt-3">
              <p className="font-bold text-sst-700 underline">Résultat :</p>
              <div className="mt-2 flex items-center gap-3 text-sm font-bold text-sst-700">
                <span className="w-32">Candidat certifié</span>
                <label className="flex items-center gap-1.5">
                  <Check checked={grid.certified === true} onClick={() => edit({ ...grid, certified: grid.certified === true ? null : true })} disabled={readOnly} small /> OUI*
                </label>
                <label className="ml-4 flex items-center gap-1.5">
                  <Check checked={grid.certified === false} onClick={() => edit({ ...grid, certified: grid.certified === false ? null : false })} disabled={readOnly} small /> NON
                </label>
              </div>
              {grid.certified === true && COMPETENCE_ORDER.some((c) => grid.competences[c] !== 'acquise') && (
                <p className="mt-2 text-xs font-semibold text-amber-700">Attention : les 8 compétences doivent être acquises pour certifier.</p>
              )}
            </div>
          </div>
        </div>
        <p className="pl-3 text-xs italic">* : 8 compétences acquises donnent la certification</p>
      </div>

      <Modal
        open={signing}
        onClose={() => setSigning(false)}
        title="Signature du formateur"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setSigning(false)}>
              Annuler
            </button>
            <button
              className="btn-primary"
              disabled={!newSignature}
              onClick={() => {
                edit({ ...grid, trainer: { ...grid.trainer, signature: newSignature } });
                setSigning(false);
              }}
            >
              Apposer la signature
            </button>
          </>
        }
      >
        <SignaturePad onChange={setNewSignature} />
        <p className="mt-2 text-xs text-ink-muted">Pour réutiliser automatiquement votre signature, enregistrez-la dans « Mon profil ».</p>
      </Modal>
    </div>
  );
}

function Row({ label, children, green }: { label: string; children: React.ReactNode; green?: boolean }) {
  return (
    <div className="flex items-center gap-2">
      <span className={clsx('w-36 shrink-0 text-sm', green && 'font-bold text-sst-700')}>{label}</span>
      {children}
    </div>
  );
}

function Check({ checked, onClick, disabled, small }: { checked: boolean; onClick: () => void; disabled?: boolean; small?: boolean }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-pressed={checked}
      className={clsx(
        'inline-flex items-center justify-center border border-ink bg-white text-[#0d2a73] transition hover:bg-sky-50 disabled:cursor-default',
        small ? 'h-4 w-4 text-xs' : 'my-1 h-6 w-6 text-base',
      )}
    >
      {checked ? '✕' : ''}
    </button>
  );
}

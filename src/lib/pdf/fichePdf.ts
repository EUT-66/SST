// Fiche d'évaluation SST d'un apprenti (cas pratique, entretien, QCM, bilan).
import { rgb, type PDFDocument } from 'pdf-lib';
import { COMPETENCE_LABELS, COMPETENCE_ORDER } from '../competences';
import { frDate } from '../format';
import type { EvaluationSummary } from '../grid';
import type { Evaluation, Learner, PracticalCase, Session } from '../types';
import { A4, C, createDoc, Painter, type Fonts, type FontFiles } from './kit';

const M = 36;
const W = A4.w - M * 2;
const GREEN = rgb(0.1, 0.5, 0.29);
const LIGHT = rgb(0.92, 0.97, 0.94);

export interface FicheInput {
  learner: Learner;
  session: Session;
  tradeLabel: string;
  caseData: PracticalCase | null;
  evaluation: Evaluation | undefined;
  summary: EvaluationSummary;
  trainerName: string;
}

class Flow {
  p!: Painter;
  y = 0;
  pageNo = 0;
  constructor(private doc: PDFDocument, private fonts: Fonts, private headerText: string) {
    this.newPage();
  }
  newPage() {
    this.p = new Painter(this.doc.addPage([A4.w, A4.h]), this.fonts);
    this.pageNo++;
    this.p.rect(0, 0, A4.w, 26, { border: 0, fill: GREEN });
    this.p.text(this.headerText, M, 8, { font: this.fonts.bold, size: 9.5, color: C.white });
    this.p.text(`${this.pageNo}`, A4.w - M - 30, 8, { size: 9.5, color: C.white, align: 'right', width: 30 });
    this.y = 44;
  }
  ensure(h: number) {
    if (this.y + h > A4.h - 36) this.newPage();
  }
  title(s: string) {
    this.ensure(30);
    this.y += 6;
    this.p.text(s, M, this.y, { font: this.fonts.bold, size: 12, color: GREEN });
    this.y += 18;
  }
}

function mark(v: boolean | null | undefined, yes = 'Fait', no = 'Non fait') {
  return v === true ? yes : v === false ? no : '—';
}

export async function renderFichePdf(inputs: FicheInput[], fontFiles?: FontFiles): Promise<Uint8Array> {
  const { doc, fonts } = await createDoc('Fiches d’évaluation SST', fontFiles);
  for (const input of inputs) renderOne(doc, fonts, input);
  return doc.save();
}

function renderOne(doc: PDFDocument, fonts: Fonts, input: FicheInput) {
  const { learner, session, caseData, evaluation: ev, summary } = input;
  const f = new Flow(doc, fonts, `FICHE D’ÉVALUATION SST – ${input.tradeLabel.toUpperCase()}`);
  const p = () => f.p;

  // Identité
  p().text(`${learner.lastName} ${learner.firstName}`, M, f.y, { font: fonts.bold, size: 16 });
  f.y += 22;
  const meta = [
    learner.birthDate && `Né(e) le ${frDate(learner.birthDate)}`,
    learner.groupName && `Classe : ${learner.groupName}`,
    `Session du ${frDate(session.startDate)} au ${frDate(session.endDate)}`,
    `Formateur : ${input.trainerName}`,
  ]
    .filter(Boolean)
    .join('   ·   ');
  f.y += p().paragraph(meta, M, f.y, W, { size: 9.5, color: C.grey }) + 6;

  // Cas pratique
  if (caseData) {
    f.title(`Cas n° ${caseData.number ?? '–'} – ${caseData.title}`);
    p().text(`Geste évalué : ${caseData.geste}`, M, f.y, { font: fonts.italic, size: 10 });
    f.y += 16;
    const scenarioH = p().measure(caseData.scenario, W - 16, { size: 9.5 }) + 12;
    f.ensure(scenarioH);
    p().rect(M, f.y, W, scenarioH, { border: 0, fill: LIGHT });
    p().paragraph(caseData.scenario, M + 8, f.y + 6, W - 16, { size: 9.5 });
    f.y += scenarioH + 10;

    f.title('Épreuve 1 – Actions attendues');
    caseData.actions.forEach((a, i) => {
      const st = ev?.actions?.[String(i)];
      const v = st === 'fait' ? true : st === 'non_fait' ? false : null;
      const h = Math.max(16, p().measure(`${i + 1}. ${a.text}`, W - 80, { size: 9.5 }) + 5);
      f.ensure(h);
      p().paragraph(`${i + 1}. ${a.text}`, M, f.y, W - 80, { size: 9.5 });
      p().text(mark(v), M + W - 70, f.y, { font: fonts.bold, size: 9.5, color: v === false ? rgb(0.75, 0.15, 0.1) : GREEN, align: 'right', width: 70 });
      p().line(M, f.y + h - 2, M + W, f.y + h - 2, 0.3, rgb(0.85, 0.85, 0.85));
      f.y += h;
    });

    f.title('Épreuve 2 – Prévention');
    for (const item of caseData.prevention) {
      const st = ev?.prevention?.[item.key];
      const v = st === 'acquis' ? true : st === 'non_acquis' ? false : null;
      const h = Math.max(16, p().measure(item.answer, W - 210, { size: 9 }) + 5);
      f.ensure(h);
      p().text(item.label, M, f.y, { font: fonts.bold, size: 9.5 });
      p().paragraph(item.answer, M + 130, f.y, W - 210, { size: 9, color: C.grey });
      p().text(mark(v, 'Acquis', 'Non acquis'), M + W - 70, f.y, { font: fonts.bold, size: 9.5, color: v === false ? rgb(0.75, 0.15, 0.1) : GREEN, align: 'right', width: 70 });
      p().line(M, f.y + h - 2, M + W, f.y + h - 2, 0.3, rgb(0.85, 0.85, 0.85));
      f.y += h;
    }
  } else {
    f.title('Cas pratique');
    p().text('Aucun cas attribué.', M, f.y, { size: 10, color: C.grey });
    f.y += 16;
  }

  // QCM
  f.title('QCM');
  if (ev?.qcm) {
    const q = ev.qcm;
    p().text(`${q.quizTitle} : ${q.score}/${q.total} (${Math.round((q.score / q.total) * 100)} %)`, M, f.y, { font: fonts.bold, size: 10 });
    f.y += 15;
    const parts = COMPETENCE_ORDER.filter((c) => q.byCompetence[c]).map((c) => `${c} ${q.byCompetence[c]!.correct}/${q.byCompetence[c]!.total}`);
    f.y += p().paragraph(parts.join('   ·   '), M, f.y, W, { size: 9.5, color: C.grey }) + 4;
  } else {
    p().text('Non passé.', M, f.y, { size: 10, color: C.grey });
    f.y += 16;
  }

  if (ev?.observations?.trim()) {
    f.title('Observations');
    const h = p().measure(ev.observations, W, { size: 9.5 });
    f.ensure(h);
    f.y += p().paragraph(ev.observations, M, f.y, W, { size: 9.5 }) + 4;
  }

  // Bilan
  f.title('Bilan par compétence');
  for (const c of COMPETENCE_ORDER) {
    f.ensure(15);
    const v = summary.competences[c];
    p().text(`${c} – ${COMPETENCE_LABELS[c]}`, M, f.y, { size: 9.5 });
    p().text(v === 'acquise' ? 'Acquise' : v === 'non_acquise' ? 'Non acquise' : 'À évaluer', M + W - 80, f.y, {
      font: fonts.bold,
      size: 9.5,
      color: v === 'non_acquise' ? rgb(0.75, 0.15, 0.1) : v === 'acquise' ? GREEN : C.grey,
      align: 'right',
      width: 80,
    });
    f.y += 15;
  }
  f.ensure(30);
  f.y += 6;
  const result = summary.certified === true ? 'Candidat certifié' : summary.certified === false ? 'Candidat non certifié' : 'Certification à finaliser';
  p().rect(M, f.y, W, 24, { border: 0, fill: summary.certified ? GREEN : LIGHT });
  p().text(result, M, f.y + 6, { font: fonts.bold, size: 12, color: summary.certified ? C.white : C.ink, align: 'center', width: W });
}

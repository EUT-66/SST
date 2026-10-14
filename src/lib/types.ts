// Modèle de données de l'application (collections Firestore).

export type Role = 'admin' | 'referent' | 'formateur' | 'pending' | 'disabled';

export type Permission =
  | 'manageUsers'
  | 'manageSettings'
  | 'manageTrades'
  | 'manageCourses'
  | 'manageQuestions'
  | 'manageCases'
  | 'viewAllSessions';

export type PermissionMap = Partial<Record<Permission, boolean>>;

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  role: Role;
  /** Surcharges individuelles des permissions du rôle. */
  permissions?: PermissionMap;
  /** Signature manuscrite (PNG en data URL). */
  signature?: string | null;
  organisation?: string;
  createdAt?: number;
  validatedAt?: number | null;
  validatedBy?: string | null;
}

export interface Trade {
  id: string;
  code: string;
  label: string;
  /** Mots-clés pour reconnaître le métier dans l'export Netyparéo. */
  keywords: string[];
  order?: number;
}

// ---------------------------------------------------------------- Compétences

export type CompetenceId = 'C1' | 'C2' | 'C3' | 'C4' | 'C5' | 'C6' | 'C7' | 'C8';

export type IndicatorId =
  | 'C1a'
  | 'C2a'
  | 'C2b'
  | 'C2c'
  | 'C2d'
  | 'C2e'
  | 'C3a'
  | 'C3b'
  | 'C4a'
  | 'C4b'
  | 'C5a'
  | 'C5b'
  | 'C5c'
  | 'C6a'
  | 'C7a'
  | 'C8a'
  | 'C8b';

export type IndicatorValue = 'acquis' | 'non_acquis' | null;
export type CompetenceValue = 'acquise' | 'non_acquise' | null;

// ---------------------------------------------------------------- Cours

export type SlideLayout = 'cover' | 'section' | 'content' | 'cards' | 'steps' | 'stats';

export interface SlideItem {
  title?: string;
  text?: string;
  value?: string;
}

export type CalloutKind = 'metier' | 'attention' | 'info' | 'question';

export interface Callout {
  kind: CalloutKind;
  title?: string;
  text: string;
}

export interface Slide {
  id: string;
  layout: SlideLayout;
  kicker?: string;
  title: string;
  subtitle?: string;
  body?: string;
  items?: SlideItem[];
  result?: string;
  callouts?: Callout[];
  notes?: string;
}

export interface Attachment {
  name: string;
  path: string;
  url: string;
  size: number;
  contentType: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string;
  /** Métiers concernés ; vide = tous les métiers. */
  tradeIds: string[];
  slides: Slide[];
  attachments?: Attachment[];
  order?: number;
  createdBy?: string;
  updatedAt?: number;
}

// ---------------------------------------------------------------- QCM

export type QuestionTheme = 'cadre' | 'prevention' | 'proteger' | 'examiner' | 'alerter' | 'secourir';
export type QuestionUsage = 'entrainement' | 'evaluation' | 'both';

export interface Choice {
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  text: string;
  choices: Choice[];
  explanation?: string;
  competence: CompetenceId;
  theme: QuestionTheme;
  /** Vide = question commune à tous les métiers. */
  tradeIds: string[];
  usage: QuestionUsage;
  createdBy?: string;
  updatedAt?: number;
}

export type QuizType = 'entrainement' | 'evaluation';

export interface QuizTemplate {
  id: string;
  title: string;
  description?: string;
  type: QuizType;
  tradeIds: string[];
  questionIds: string[];
  createdBy?: string;
  updatedAt?: number;
}

// ---------------------------------------------------------------- Cas pratiques

export type CaseCategory = 'metier' | 'vie_quotidienne';

export interface CaseAction {
  text: string;
  /** Indicateurs de la grille INRS alimentés par cette action. */
  indicators: IndicatorId[];
}

export type PreventionKey = 'danger' | 'situation' | 'evenement' | 'dommage' | 'eviter' | 'remonter';

export interface PreventionItem {
  key: PreventionKey;
  label: string;
  answer: string;
  indicators: IndicatorId[];
}

export interface PracticalCase {
  id: string;
  number?: number;
  title: string;
  geste: string;
  category: CaseCategory;
  /** Vide = utilisable pour tous les métiers (vie quotidienne). */
  tradeIds: string[];
  scenario: string;
  victime: string;
  temoin: string;
  materiel: string;
  actions: CaseAction[];
  prevention: PreventionItem[];
  /** false = proposition à relire par la formatrice. */
  reviewed: boolean;
  source?: string;
  createdBy?: string;
  updatedAt?: number;
}

// ---------------------------------------------------------------- Sessions

export type CasePool = 'both' | 'metier' | 'vie_quotidienne';

export interface Session {
  id: string;
  title: string;
  trainerId: string;
  trainerName: string;
  tradeId: string;
  groupName?: string;
  location?: string;
  startDate: string; // AAAA-MM-JJ
  endDate: string; // AAAA-MM-JJ
  status: 'active' | 'closed';
  closedAt?: number | null;
  casePool: CasePool;
  /** Cas déjà tirés dans la session : ils ne retombent pas. */
  drawnCaseIds: string[];
  /** Compteur de tirage des apprentis. */
  drawCounter?: number;
  learnerCount?: number;
  createdAt: number;
  updatedAt?: number;
}

export interface Learner {
  id: string;
  lastName: string;
  firstName: string;
  birthDate?: string; // AAAA-MM-JJ
  email?: string;
  phone?: string;
  externalId?: string;
  formation?: string;
  groupName?: string;
  company?: string;
  tradeId?: string;
  absent?: boolean;
  drawOrder?: number | null;
  drawnAt?: number | null;
  caseId?: string | null;
  caseChangedManually?: boolean;
  source?: 'csv' | 'manuel';
  createdAt?: number;
  updatedAt?: number;
}

export type ActionStatus = 'fait' | 'non_fait';
export type ItemStatus = 'acquis' | 'non_acquis';

export interface CompetenceScore {
  correct: number;
  total: number;
}

export interface QcmResult {
  runId?: string | null;
  quizTitle: string;
  score: number;
  total: number;
  byCompetence: Partial<Record<CompetenceId, CompetenceScore>>;
  answers: Record<string, number[]>;
  date: number;
  mode: 'local' | 'distance';
}

export interface GridState {
  candidate: { lastName: string; firstName: string; birthDate: string };
  session: { from: string; to: string };
  indicators: Partial<Record<IndicatorId, IndicatorValue>>;
  competences: Partial<Record<CompetenceId, CompetenceValue>>;
  certified: boolean | null;
  trainer: { lastName: string; firstName: string; signature?: string | null };
  certificationDate: string;
}

export interface Evaluation {
  learnerId: string;
  caseId?: string | null;
  /** Index de l'action dans le cas -> statut. */
  actions: Record<string, ActionStatus>;
  prevention: Partial<Record<PreventionKey, ItemStatus>>;
  /** Questions d'entretien de l'épreuve 2 (C1, C6…) : source directe. */
  entretien?: Partial<Record<IndicatorId, ItemStatus>>;
  /** Décision du formateur sur un indicateur : prioritaire sur les propositions. */
  manual: Partial<Record<IndicatorId, ItemStatus>>;
  qcm?: QcmResult | null;
  observations?: string;
  grid?: GridState | null;
  gridEdited?: boolean;
  updatedAt?: number;
}

// ---------------------------------------------------------------- Passation des QCM

export interface RunQuestion {
  id: string;
  text: string;
  choices: string[];
  multiple: boolean;
  competence: CompetenceId;
  /** Présent uniquement pour les QCM d'entraînement (correction immédiate). */
  correct?: number[];
  explanation?: string;
}

export interface PublicRun {
  code: string;
  sessionId: string;
  runId: string;
  ownerId: string;
  title: string;
  type: QuizType;
  open: boolean;
  learners: { id: string; label: string }[];
  learnerIds: string[];
  questions: RunQuestion[];
  createdAt: number;
}

export interface PrivateRun {
  id: string;
  code: string;
  title: string;
  type: QuizType;
  open: boolean;
  /** Questions complètes avec bonnes réponses (pour la correction). */
  questions: (RunQuestion & { correct: number[] })[];
  createdAt: number;
  appliedLearnerIds?: string[];
}

export interface Submission {
  id: string;
  learnerId: string;
  label: string;
  uid: string;
  answers: Record<string, number[]>;
  startedAt: number;
  submittedAt: number;
}

export interface AppSettings {
  organisation: string;
  /** Seuil de réussite d'une compétence au QCM (0-1). */
  qcmThreshold: number;
  /** 'and' : le QCM doit confirmer l'évaluation directe ; 'fallback' : utilisé seulement sans évaluation directe. */
  qcmMode: 'and' | 'fallback';
  evaluationQuestionCount: number;
  logoLeft?: string | null;
  logoRight?: string | null;
  contentVersion?: number;
}

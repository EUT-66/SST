import { createContext, useContext, useMemo, type ReactNode } from 'react';
import type { AppSettings, Course, PracticalCase, Question, QuizTemplate, Trade } from '../lib/types';
import { useAuth } from './useAuth';
import { useCollection, useDocument } from './useFirestore';

export const DEFAULT_SETTINGS: AppSettings = {
  organisation: '',
  qcmThreshold: 0.7,
  qcmMode: 'and',
  evaluationQuestionCount: 20,
  logoLeft: null,
  logoRight: null,
};

interface DataState {
  trades: Trade[];
  tradeById: Record<string, Trade>;
  cases: PracticalCase[];
  caseById: Record<string, PracticalCase>;
  questions: Question[];
  quizzes: QuizTemplate[];
  courses: Course[];
  settings: AppSettings;
  loading: boolean;
}

const DataContext = createContext<DataState | null>(null);

const byOrder = <T extends { order?: number; title?: string; label?: string }>(a: T, b: T) =>
  (a.order ?? 999) - (b.order ?? 999) || (a.title ?? a.label ?? '').localeCompare(b.title ?? b.label ?? '', 'fr');

/** Contenus partagés (métiers, cas, questions, cours, paramètres), chargés une fois pour l'équipe. */
export function DataProvider({ children }: { children: ReactNode }) {
  const { isStaff } = useAuth();
  const trades = useCollection<Trade>(isStaff ? 'trades' : null);
  const cases = useCollection<PracticalCase>(isStaff ? 'cases' : null);
  const questions = useCollection<Question>(isStaff ? 'questions' : null);
  const quizzes = useCollection<QuizTemplate>(isStaff ? 'quizzes' : null);
  const courses = useCollection<Course>(isStaff ? 'courses' : null);
  const settings = useDocument<AppSettings & { id?: string }>(isStaff ? 'settings/app' : null);

  const value = useMemo<DataState>(() => {
    const sortedTrades = [...trades.data].sort(byOrder);
    const sortedCases = [...cases.data].sort(
      (a, b) =>
        (a.tradeIds[0] ?? 'zz').localeCompare(b.tradeIds[0] ?? 'zz') ||
        (a.number ?? 999) - (b.number ?? 999) ||
        a.title.localeCompare(b.title, 'fr'),
    );
    return {
      trades: sortedTrades,
      tradeById: Object.fromEntries(sortedTrades.map((t) => [t.id, t])),
      cases: sortedCases,
      caseById: Object.fromEntries(sortedCases.map((c) => [c.id, c])),
      questions: questions.data,
      quizzes: [...quizzes.data].sort(byOrder),
      courses: [...courses.data].sort(byOrder),
      settings: { ...DEFAULT_SETTINGS, ...(settings.data ?? {}) },
      loading: trades.loading || cases.loading || questions.loading || courses.loading || settings.loading,
    };
  }, [trades.data, cases.data, questions.data, quizzes.data, courses.data, settings.data, trades.loading, cases.loading, questions.loading, courses.loading, settings.loading]);

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData(): DataState {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error('useData doit être utilisé dans DataProvider');
  return ctx;
}

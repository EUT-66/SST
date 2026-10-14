import { lazy, Suspense, type ReactNode } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import { PageLoader } from './components/ui';
import { useAuth } from './hooks/useAuth';
import { DataProvider } from './hooks/useData';
import type { Permission } from './lib/types';
import { CompleteProfilePage, LoginPage, PendingPage, RegisterPage } from './pages/auth/AuthPages';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const SessionsList = lazy(() => import('./pages/sessions/SessionsList'));
const SessionNew = lazy(() => import('./pages/sessions/SessionNew'));
const SessionDetail = lazy(() => import('./pages/sessions/SessionDetail'));
const LearnerEvaluation = lazy(() => import('./pages/sessions/LearnerEvaluation'));
const GridEditor = lazy(() => import('./pages/sessions/GridEditor'));
const DrawPage = lazy(() => import('./pages/sessions/DrawPage'));
const LocalQuiz = lazy(() => import('./pages/sessions/LocalQuiz'));
const CoursesList = lazy(() => import('./pages/courses/CoursesList'));
const CourseViewer = lazy(() => import('./pages/courses/CourseViewer'));
const CourseEditor = lazy(() => import('./pages/courses/CourseEditor'));
const QuizHome = lazy(() => import('./pages/quiz/QuizHome'));
const TrainingPage = lazy(() => import('./pages/quiz/TrainingPage'));
const CasesList = lazy(() => import('./pages/cases/CasesList'));
const CaseView = lazy(() => import('./pages/cases/CaseView'));
const CaseEditor = lazy(() => import('./pages/cases/CaseEditor'));
const UsersPage = lazy(() => import('./pages/admin/UsersPage'));
const SettingsPage = lazy(() => import('./pages/admin/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const JoinPage = lazy(() => import('./pages/learner/JoinPage'));

function RequireStaff({ children }: { children: ReactNode }) {
  const { firebaseUser, profile, loading, isStaff } = useAuth();
  const location = useLocation();
  if (loading) return <PageLoader />;
  if (!firebaseUser || firebaseUser.isAnonymous) return <Navigate to="/connexion" state={{ from: location }} replace />;
  if (!profile) return <CompleteProfilePage />;
  if (!isStaff) return <PendingPage />;
  return <DataProvider>{children}</DataProvider>;
}

function RequirePermission({ permission, children }: { permission: Permission | Permission[]; children: ReactNode }) {
  const { can } = useAuth();
  const list = Array.isArray(permission) ? permission : [permission];
  if (!list.some((p) => can(p))) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function PublicOnly({ children }: { children: ReactNode }) {
  const { firebaseUser, loading } = useAuth();
  if (loading) return <PageLoader />;
  if (firebaseUser && !firebaseUser.isAnonymous) return <Navigate to="/" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/connexion" element={<PublicOnly><LoginPage /></PublicOnly>} />
        <Route path="/inscription" element={<PublicOnly><RegisterPage /></PublicOnly>} />
        <Route path="/apprenti" element={<JoinPage />} />
        <Route path="/apprenti/:code" element={<JoinPage />} />

        <Route path="/sessions/:sid/tirage" element={<RequireStaff><DrawPage /></RequireStaff>} />
        <Route path="/sessions/:sid/passation" element={<RequireStaff><LocalQuiz /></RequireStaff>} />
        <Route path="/cours/:cid/presentation" element={<RequireStaff><CourseViewer presentation /></RequireStaff>} />

        <Route element={<RequireStaff><Layout /></RequireStaff>}>
          <Route index element={<Dashboard />} />
          <Route path="sessions" element={<SessionsList />} />
          <Route path="sessions/nouvelle" element={<SessionNew />} />
          <Route path="sessions/:sid" element={<SessionDetail />} />
          <Route path="sessions/:sid/evaluation/:lid" element={<LearnerEvaluation />} />
          <Route path="sessions/:sid/grille/:lid" element={<GridEditor />} />
          <Route path="cours" element={<CoursesList />} />
          <Route path="cours/:cid" element={<CourseViewer />} />
          <Route path="cours/:cid/modifier" element={<RequirePermission permission="manageCourses"><CourseEditor /></RequirePermission>} />
          <Route path="qcm" element={<QuizHome />} />
          <Route path="qcm/entrainement" element={<TrainingPage />} />
          <Route path="cas" element={<CasesList />} />
          <Route path="cas/:id" element={<CaseView />} />
          <Route path="cas/:id/modifier" element={<RequirePermission permission="manageCases"><CaseEditor /></RequirePermission>} />
          <Route path="admin/utilisateurs" element={<RequirePermission permission="manageUsers"><UsersPage /></RequirePermission>} />
          <Route path="admin/parametres" element={<RequirePermission permission={['manageSettings', 'manageTrades']}><SettingsPage /></RequirePermission>} />
          <Route path="profil" element={<ProfilePage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

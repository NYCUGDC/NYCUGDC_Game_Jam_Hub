
import React, { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { GameDataProvider } from './contexts/GameDataContext';

// Lazy load pages using absolute paths from the root, without .tsx extension
const ThemePage = lazy(() => import('./pages/ThemePage'));
const AchievementsPage = lazy(() => import('./pages/AchievementsPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const TeamDashboardPage = lazy(() => import('./pages/TeamDashboardPage'));
const SubmissionPage = lazy(() => import('./pages/SubmissionPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const AllTeamsPage = lazy(() => import('./pages/AllTeamsPage')); // New page

const LoadingFallback: React.FC = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-cyan-500"></div>
  </div>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { currentTeam } = useAuth();
  if (!currentTeam) {
    return <Navigate to="/auth" replace />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <GameDataProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<ThemePage />} />
                  <Route path="/theme" element={<ThemePage />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/all-teams" element={<AllTeamsPage />} /> {/* New route */}
                  <Route 
                    path="/team" 
                    element={
                      <ProtectedRoute>
                        <TeamDashboardPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/submit" 
                    element={
                      <ProtectedRoute>
                        <SubmissionPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/admin" element={<AdminPage />} /> {/* Consider protecting admin too */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </GameDataProvider>
    </AuthProvider>
  );
};

export default App;

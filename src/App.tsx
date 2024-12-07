import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/layout/Header';
import { HomePage } from './pages/home/HomePage';
import { LoginPage } from './pages/auth/LoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { AssessmentList } from './pages/assessments/AssessmentList';
import { AssessmentQuestions } from './pages/assessments/AssessmentQuestions';
import { ResultsPage } from './pages/results/ResultsPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { UserManagement } from './pages/admin/UserManagement';
import { AssessmentManagement } from './pages/admin/AssessmentManagement';
import { useAuthStore } from './store/useAuthStore';
import { AdminRoute } from './components/admin/AdminRoute';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          {/* Admin Routes */}
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <AdminLayout />
              </AdminRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="assessments" element={<AssessmentManagement />} />
          </Route>

          {/* Public Routes */}
          <Route
            path="*"
            element={
              <>
                <Header />
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/assessments"
                    element={
                      <PrivateRoute>
                        <AssessmentList />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/assessments/:id"
                    element={
                      <PrivateRoute>
                        <AssessmentQuestions />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/results"
                    element={
                      <PrivateRoute>
                        <ResultsPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </>
            }
          />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
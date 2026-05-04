import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "../App.tsx";
import { AuthProvider, routeForRole, useAuth } from "../auth/AuthContext.tsx";
import { AuthPage } from "../pages/AuthPage.tsx";
import { EmployerApplicantsPage } from "../pages/employer/EmployerApplicantsPage.tsx";
import { EmployerJobsPage } from "../pages/employer/EmployerJobsPage.tsx";
import { EmployerProfilePage } from "../pages/employer/EmployerProfilePage.tsx";
import { WorkerApplicationsPage } from "../pages/worker/WorkerApplicationsPage.tsx";
import { WorkerFeedPage } from "../pages/worker/WorkerFeedPage.tsx";
import { WorkerProfilePage } from "../pages/worker/WorkerProfilePage.tsx";
import { ProtectedRoute } from "./ProtectedRoute";

function AppHomeGate() {
  const { isReady, session } = useAuth();

  if (!isReady) {
    return (
      <div className="min-h-screen grid place-items-center bg-slate-50 text-slate-700">
        <p className="text-sm font-medium">Loading app...</p>
      </div>
    );
  }

  if (!session) {
    return <App />;
  }

  return <Navigate to={routeForRole(session.user.role)} replace />;
}

function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 grid place-items-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold mb-2">Page not found</h1>
        <p className="text-slate-600 mb-6">The route does not exist in this environment.</p>
        <a
          href="/"
          className="inline-block bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-semibold"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppHomeGate />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedRoute allowedRoles={["WORKER"]} />}>
            <Route path="/worker/profile" element={<WorkerProfilePage />} />
            <Route path="/worker/feed" element={<WorkerFeedPage />} />
            <Route path="/worker/applications" element={<WorkerApplicationsPage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["EMPLOYER"]} />}>
            <Route path="/employer/profile" element={<EmployerProfilePage />} />
            <Route path="/employer/jobs" element={<EmployerJobsPage />} />
            <Route path="/employer/applicants" element={<EmployerApplicantsPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

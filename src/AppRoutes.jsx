// react router dom
import { Routes, Route } from 'react-router-dom';

// routers
import AuthRouter from '@routers/AuthRouter';
import NonAuthRouter from '@routers/NonAuthRouter';

// pages
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/HomePage';
import DefaultPage from '@pages/DefaultPage'; // This can be used for 404 or default content

// layout
import MainLayout from '@components/layout/MainLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Login route (outside MainLayout) */}
      <Route
        path="/login"
        element={
          <NonAuthRouter>
            <LoginPage />
          </NonAuthRouter>
        }
      />

      {/* Authenticated routes (inside MainLayout) */}
      <Route
        path="/"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<HomePage />} />
      </Route>
      
      {/* 404 fallback – must be outside layout */}
      <Route path="*" element={<DefaultPage />} />
    </Routes>
  );
}

export default AppRoutes;

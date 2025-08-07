// react router dom
import { Routes, Route } from 'react-router-dom';

// routers
import AuthRouter from '@routers/AuthRouter';
import NonAuthRouter from '@routers/NonAuthRouter';

// pages
import LoginPage from '@pages/LoginPage';
import HomePage from '@pages/HomePage';
import DefaultPage from '@pages/DefaultPage';
import ClientsPage from '@pages/ClientsPage';
import ClientDepartmentsPage from '@pages/ClientDepartmentsPage';
import PrintInvoicePage from '@pages/PrintInvoicePage';
import BillingsPage from '@pages/BillingsPage';
import ServicesPage from '@pages/ServicesPage';
import CollectionsPage from '@pages/CollectionsPage';
import PaymentsPage from '@pages/PaymentsPage';

// layout
import MainLayout from '@components/layout/MainLayout';

function AppRoutes() {
  return (
    <Routes>
      {/* Non Authenticated route (outside MainLayout) */}
      {/* LoginPage Route */}
      <Route
        path="/login"
        element={
          <NonAuthRouter>
            <LoginPage />
          </NonAuthRouter>
        }
      />

      {/* Authenticated routes (inside MainLayout) */}
      {/* HomePage Route */}
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

      {/* ClientsPage Route */}
      <Route
        path="/clients"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<ClientsPage />} />
      </Route>

      {/* ClientDepartmentsPage Route */}
      <Route
        path="/client/departments/:id"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<ClientDepartmentsPage />} />
      </Route>

      {/* PrintInvoicePage Route */}
      <Route
        path="/print-invoice"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<PrintInvoicePage />} />
      </Route>

      {/* BillingsPage Route */}
      <Route
        path="/billings"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<BillingsPage />} />
      </Route>

      {/* ServicesPage Route */}
      <Route
        path="/services"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<ServicesPage />} />
      </Route>

      {/* CollectionsPage Route */}
      <Route
        path="/collections"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<CollectionsPage />} />
      </Route>

      {/* PaymentsPage Route */}
      <Route
        path="/payments"
        element={
          <AuthRouter>
            <MainLayout />
          </AuthRouter>
        }
      >
        <Route index element={<PaymentsPage />} />
      </Route>

      {/* 404 fallback – must be outside layout */}
      <Route path="*" element={<DefaultPage />} />
    </Routes>
  );
}

export default AppRoutes;

import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { PageLoader } from './components/ui/Loader';

// Lazy loaded pages
const Welcome = React.lazy(() => import('./pages/auth/Welcome'));
const Landing = React.lazy(() => import('./pages/Landing'));
const RoleSelection = React.lazy(() => import('./pages/auth/RoleSelection'));
const RegisterChoice = React.lazy(() => import('./pages/auth/RegisterChoice'));
const Register = React.lazy(() => import('./pages/auth/Register'));
const LandlordLogin = React.lazy(() => import('./pages/auth/LandlordLogin'));
const TenantLogin = React.lazy(() => import('./pages/auth/TenantLogin'));
const LandlordRegister = React.lazy(() => import('./pages/auth/LandlordRegister'));
const TenantRegister = React.lazy(() => import('./pages/auth/TenantRegister'));
const JoinProperty = React.lazy(() => import('./pages/auth/JoinProperty'));
const IdentityVerification = React.lazy(() => import('./pages/auth/IdentityVerification'));

const TenantDashboard = React.lazy(() => import('./pages/tenant/Dashboard'));
const ManagerDashboard = React.lazy(() => import('./pages/manager/Dashboard'));
const Properties = React.lazy(() => import('./pages/manager/Properties'));
const ManagerTenants = React.lazy(() => import('./pages/manager/Tenants'));
const ManagerPayments = React.lazy(() => import('./pages/manager/Payments'));
const Analytics = React.lazy(() => import('./pages/manager/Analytics'));
const TenantPayments = React.lazy(() => import('./pages/tenant/Payments'));
const TenantProfile = React.lazy(() => import('./pages/tenant/Profile'));
const Messages = React.lazy(() => import('./pages/shared/Messages'));

function App() {
  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth-choice" element={<RoleSelection />} />
        <Route path="/register-choice" element={<RegisterChoice />} />
        <Route path="/login/landlord" element={<LandlordLogin />} />
        <Route path="/login/tenant" element={<TenantLogin />} />
        <Route path="/register/landlord" element={<LandlordRegister />} />
        <Route path="/register/tenant" element={<TenantRegister />} />
        <Route path="/join-property" element={<JoinProperty />} />
        <Route path="/verify-identity" element={<IdentityVerification />} />
        
        {/* Backward Compatibility or Generic Links */}
        <Route path="/login" element={<Navigate to="/auth-choice" replace />} />
        <Route path="/register" element={<Register />} />
        
        {/* Manager Routes */}
        <Route element={<ProtectedRoute allowedRoles={['manager']} />}>
          <Route path="/manager" element={<DashboardLayout type="manager" userName="Alex" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboard />} />
            <Route path="properties" element={<Properties />} />
            <Route path="tenants" element={<ManagerTenants />} />
            <Route path="payments" element={<ManagerPayments />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="messages" element={<Messages />} />
          </Route>
        </Route>
        
        {/* Tenant Routes */}
        <Route element={<ProtectedRoute allowedRoles={['tenant']} />}>
          <Route path="/tenant" element={<DashboardLayout type="tenant" userName="Sarah" />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<TenantDashboard />} />
            <Route path="payments" element={<TenantPayments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="profile" element={<TenantProfile />} />
          </Route>
        </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

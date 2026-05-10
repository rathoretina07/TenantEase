import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/auth/Welcome';
import Landing from './pages/Landing';
import RoleSelection from './pages/auth/RoleSelection';
import RegisterChoice from './pages/auth/RegisterChoice';
import Register from './pages/auth/Register';
import LandlordLogin from './pages/auth/LandlordLogin';
import TenantLogin from './pages/auth/TenantLogin';
import LandlordRegister from './pages/auth/LandlordRegister';
import TenantRegister from './pages/auth/TenantRegister';
import IdentityVerification from './pages/auth/IdentityVerification';
import { DashboardLayout } from './components/layout/DashboardLayout';
import TenantDashboard from './pages/tenant/Dashboard';
import ManagerDashboard from './pages/manager/Dashboard';
import Properties from './pages/manager/Properties';
import Analytics from './pages/manager/Analytics';
import TenantPayments from './pages/tenant/Payments';
import TenantProfile from './pages/tenant/Profile';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth-choice" element={<RoleSelection />} />
        <Route path="/register-choice" element={<RegisterChoice />} />
        <Route path="/login/landlord" element={<LandlordLogin />} />
        <Route path="/login/tenant" element={<TenantLogin />} />
        <Route path="/register/landlord" element={<LandlordRegister />} />
        <Route path="/register/tenant" element={<TenantRegister />} />
        <Route path="/verify-identity" element={<IdentityVerification />} />
        
        {/* Backward Compatibility or Generic Links */}
        <Route path="/login" element={<Navigate to="/auth-choice" replace />} />
        <Route path="/register" element={<Register />} />
        
        {/* Manager Routes */}
        <Route path="/manager" element={<DashboardLayout type="manager" userName="Alex" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ManagerDashboard />} />
          <Route path="properties" element={<Properties />} />
          <Route path="tenants" element={<div>Tenants (Work in Progress)</div>} />
          <Route path="payments" element={<div>Payments (Work in Progress)</div>} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="messages" element={<div>Messages (Work in Progress)</div>} />
        </Route>
        
        {/* Tenant Routes */}
        <Route path="/tenant" element={<DashboardLayout type="tenant" userName="Sarah" />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<TenantDashboard />} />
          <Route path="payments" element={<TenantPayments />} />
          <Route path="messages" element={<div>Messages (Work in Progress)</div>} />
          <Route path="profile" element={<TenantProfile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

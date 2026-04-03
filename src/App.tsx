import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useStore } from './hooks/useStore';
import Layout from './components/Layout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Orders from './pages/Orders';
import OrderDetail from './pages/OrderDetail';
import SpareParts from './pages/SpareParts';
import SparePartsConfigurator from './pages/SparePartsConfigurator';
import Cart from './pages/Cart';
import Documents from './pages/Documents';
import Messages from './pages/Messages';
import Tutorials from './pages/Tutorials';
import AIAssistant from './pages/AIAssistant';
import Machines from './pages/Machines';
import MachineDetail from './pages/MachineDetail';
import Admin from './pages/Admin';
import AdminOrders from './pages/AdminOrders';
import AdminCampaigns from './pages/AdminCampaigns';
import AdminCatalog from './pages/AdminCatalog';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const user = useStore((s) => s.user);
  if (!user) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter basename="/cmc-digital-ecosystem">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Dealer */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/parts" element={<SpareParts />} />
          <Route path="/parts/cart" element={<Cart />} />
          <Route path="/parts/:modelId" element={<SparePartsConfigurator />} />
          <Route path="/docs" element={<Documents />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/tutorial" element={<Tutorials />} />
          <Route path="/tutorial/assistant" element={<AIAssistant />} />

          {/* End User */}
          <Route path="/machines" element={<Machines />} />
          <Route path="/machines/:id" element={<MachineDetail />} />

          {/* Admin */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/campaigns" element={<AdminCampaigns />} />
          <Route path="/admin/catalog" element={<AdminCatalog />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

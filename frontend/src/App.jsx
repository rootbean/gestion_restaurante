import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import MainLayout from './layouts/MainLayout';

// Componente para redirigir si ya está autenticado
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div>Cargando...</div>;
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } />

          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/menu" element={<div style={{ padding: '2rem' }}><h1>Gestión de Menú</h1><p>Próximamente...</p></div>} />
              <Route path="/orders" element={<div style={{ padding: '2rem' }}><h1>Pedidos</h1><p>Próximamente...</p></div>} />
              <Route path="/reservations" element={<div style={{ padding: '2rem' }}><h1>Reservas</h1><p>Próximamente...</p></div>} />
              <Route path="/reports" element={<div style={{ padding: '2rem' }}><h1>Reportes</h1><p>Próximamente...</p></div>} />
              {/* Redirigir root a dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
    LayoutDashboard,
    UtensilsCrossed,
    ClipboardList,
    CalendarDays,
    BarChart3,
    LogOut,
    User
} from 'lucide-react';
import '../styles/Layout.css';

const MainLayout = ({ title = 'Dashboard' }) => { // Accept title prop, though often page specific
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
        { path: '/menu', label: 'Menú', icon: <UtensilsCrossed size={20} /> },
        { path: '/orders', label: 'Pedidos', icon: <ClipboardList size={20} /> },
        { path: '/reservations', label: 'Reservas', icon: <CalendarDays size={20} /> },
        { path: '/reports', label: 'Reportes', icon: <BarChart3 size={20} /> },
    ];

    return (
        <div className="layout">
            <aside className="sidebar">
                <div className="sidebar-header">
                    <h2>SIGR</h2>
                </div>
                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </NavLink>
                    ))}
                </nav>
                <div className="sidebar-footer">
                    <div className="user-avatar">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <p>{user?.name || 'Usuario'}</p>
                        <span className="user-role">{user?.role === 'admin' ? 'Administrador' : user?.role === 'waiter' ? 'Mesero' : 'Cliente'}</span>
                    </div>
                </div>
            </aside>
            <main className="main-content">
                <header className="top-header">
                    <h1 className="header-title">Panel de Control</h1>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={16} />
                        <span>Cerrar Sesión</span>
                    </button>
                </header>
                <div className="page-content">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default MainLayout;

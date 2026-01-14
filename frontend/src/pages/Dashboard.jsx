import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UtensilsCrossed, ClipboardList, CalendarDays, BarChart3 } from 'lucide-react';
import '../styles/Dashboard.css'; // We'll create this next

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    const stats = [
        { label: 'Pedidos Hoy', value: '0', color: '#3b82f6', icon: <ClipboardList size={24} /> },
        { label: 'Ingresos', value: '$0.00', color: '#10b981', icon: <BarChart3 size={24} /> },
        { label: 'Reservas', value: '0', color: '#f59e0b', icon: <CalendarDays size={24} /> },
        { label: 'Platos Activos', value: '0', color: '#ef4444', icon: <UtensilsCrossed size={24} /> },
    ];

    const actions = [
        { title: 'Gestionar Menú', path: '/menu', desc: 'Agregar o editar platos', icon: <UtensilsCrossed size={32} />, color: 'var(--primary)' },
        { title: 'Ver Pedidos', path: '/orders', desc: 'Seguimiento en tiempo real', icon: <ClipboardList size={32} />, color: 'var(--success)' },
        { title: 'Nueva Reserva', path: '/reservations', desc: 'Agendar cita', icon: <CalendarDays size={32} />, color: 'var(--warning)' },
    ];

    return (
        <div className="dashboard-container">
            <div className="welcome-section">
                <h2>Hola, {user?.name} 👋</h2>
                <p>Aquí tienes un resumen de la actividad de hoy.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
                        <div className="stat-icon" style={{ color: stat.color, background: `${stat.color}20` }}>
                            {stat.icon}
                        </div>
                        <div className="stat-info">
                            <h3>{stat.value}</h3>
                            <p>{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <h3 className="section-title">Accesos Rápidos</h3>
            <div className="actions-grid">
                {actions.map((action, index) => (
                    <div key={index} className="action-card" onClick={() => navigate(action.path)}>
                        <div className="action-icon">
                            {action.icon}
                        </div>
                        <h4>{action.title}</h4>
                        <p>{action.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;

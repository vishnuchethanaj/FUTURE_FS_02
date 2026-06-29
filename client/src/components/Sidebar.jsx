import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="brand">Mini CRM</div>
      <NavLink to="/dashboard" end>Dashboard</NavLink>
      <NavLink to="/dashboard/leads">Leads</NavLink>
      <NavLink to="/dashboard/analytics">Analytics</NavLink>
      <NavLink to="/dashboard/follow-ups">Follow-ups</NavLink>
      <NavLink to="/dashboard/settings">Settings</NavLink>
      <div className="spacer" />
      <button onClick={handleLogout}>Logout</button>
    </aside>
  );
}

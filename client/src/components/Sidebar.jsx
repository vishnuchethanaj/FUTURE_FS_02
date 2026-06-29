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
      <NavLink to="/" end>Dashboard</NavLink>
      <NavLink to="/analysis">Analysis</NavLink>
      <NavLink to="/leads">Leads</NavLink>
      <NavLink to="/profile">Profile</NavLink>
      <div className="spacer" />
      <button onClick={handleLogout}>Logout</button>
    </aside>
  );
}

import { NavLink, Outlet } from 'react-router-dom';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="public-header">
        <div className="public-brand">LeadFlow CRM</div>
        <nav className="public-nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/services">Features</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login" className="nav-cta">Admin Login</NavLink>
        </nav>
      </header>
      <main className="public-main">
        <Outlet />
      </main>
    </div>
  );
}

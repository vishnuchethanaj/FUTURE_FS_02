import { getCurrentUser } from '../services/auth';

export default function Profile() {
  const user = getCurrentUser();

  return (
    <>
      <div className="page-header">
        <h1>Profile</h1>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
        <div style={{ marginBottom: 14 }}>
          <div className="stat-label">Name</div>
          <div style={{ fontSize: 16, marginTop: 4 }}>{user?.name || '—'}</div>
        </div>
        <div>
          <div className="stat-label">Email</div>
          <div style={{ fontSize: 16, marginTop: 4 }}>{user?.email || '—'}</div>
        </div>
      </div>
    </>
  );
}

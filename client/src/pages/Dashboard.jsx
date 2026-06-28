import { useEffect, useState } from 'react';
import { fetchLeads } from '../services/leads';
import StatusBadge from '../components/StatusBadge';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString();
}

export default function Dashboard() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    converted: leads.filter((l) => l.status === 'Converted').length,
  };

  const recent = leads.slice(0, 5);

  const upcoming = leads
    .filter((l) => l.followUpDate && new Date(l.followUpDate) >= new Date(new Date().toDateString()))
    .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate))
    .slice(0, 5);

  return (
    <>
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="grid grid-4" style={{ marginBottom: 24 }}>
        <StatCard label="Total Leads" value={stats.total} />
        <StatCard label="New" value={stats.new} />
        <StatCard label="Contacted" value={stats.contacted} />
        <StatCard label="Converted" value={stats.converted} />
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Recent Leads</h2>
          {loading ? (
            <div className="muted">Loading…</div>
          ) : recent.length === 0 ? (
            <div className="empty">No leads yet</div>
          ) : (
            <table>
              <thead>
                <tr><th>Name</th><th>Company</th><th>Status</th></tr>
              </thead>
              <tbody>
                {recent.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.company || '—'}</td>
                    <td><StatusBadge status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="card">
          <h2>Upcoming Follow-Ups</h2>
          {loading ? (
            <div className="muted">Loading…</div>
          ) : upcoming.length === 0 ? (
            <div className="empty">No upcoming follow-ups</div>
          ) : (
            <table>
              <thead>
                <tr><th>Name</th><th>Date</th><th>Status</th></tr>
              </thead>
              <tbody>
                {upcoming.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{formatDate(l.followUpDate)}</td>
                    <td><StatusBadge status={l.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
    </div>
  );
}

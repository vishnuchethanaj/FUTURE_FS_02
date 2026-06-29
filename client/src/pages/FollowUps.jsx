import { useEffect, useState } from 'react';
import { fetchLeads } from '../services/leads';
import StatusBadge from '../components/StatusBadge';

function formatDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString();
}

export default function FollowUps() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads().then((data) => {
      setLeads(data);
      setLoading(false);
    });
  }, []);

  const upcoming = leads
    .filter((lead) => lead.followUpDate)
    .sort((a, b) => new Date(a.followUpDate) - new Date(b.followUpDate));

  return (
    <>
      <div className="page-header">
        <h1>Follow-ups</h1>
      </div>
      <div className="card">
        {loading ? (
          <div className="empty">Loading…</div>
        ) : upcoming.length === 0 ? (
          <div className="empty">No upcoming follow-ups</div>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Follow-Up</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {upcoming.map((lead) => (
                <tr key={lead._id}>
                  <td>{lead.name}</td>
                  <td>{lead.company || '—'}</td>
                  <td>{formatDate(lead.followUpDate)}</td>
                  <td><StatusBadge status={lead.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

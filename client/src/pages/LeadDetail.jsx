import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  fetchLead,
  updateLeadStatus,
  addLeadNote,
} from '../services/leads';
import StatusBadge from '../components/StatusBadge';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString();
}
function formatDateTime(d) {
  return new Date(d).toLocaleString();
}

export default function LeadDetail() {
  const { id } = useParams();
  const [lead, setLead] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetchLead(id)
      .then(setLead)
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const handleStatus = async (e) => {
    const updated = await updateLeadStatus(id, e.target.value);
    setLead(updated);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    const updated = await addLeadNote(id, noteText.trim());
    setLead(updated);
    setNoteText('');
  };

  if (loading) return <div className="muted">Loading…</div>;
  if (!lead) return <div className="empty">Lead not found</div>;

  return (
    <>
      <div className="page-header">
        <div>
          <Link to="/leads" className="muted">← Back to Leads</Link>
          <h1 style={{ marginTop: 6 }}>{lead.name}</h1>
        </div>
        <StatusBadge status={lead.status} />
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2>Details</h2>
          <Detail label="Email" value={lead.email} />
          <Detail label="Phone" value={lead.phone || '—'} />
          <Detail label="Company" value={lead.company || '—'} />
          <Detail label="Source" value={lead.source || '—'} />
          <Detail label="Follow-Up" value={formatDate(lead.followUpDate)} />
          <Detail label="Created" value={formatDateTime(lead.createdAt)} />

          <div className="form-row" style={{ marginTop: 16 }}>
            <label>Update Status</label>
            <select value={lead.status} onChange={handleStatus}>
              <option>New</option>
              <option>Contacted</option>
              <option>Converted</option>
            </select>
          </div>
        </div>

        <div className="card">
          <h2>Notes</h2>
          <form onSubmit={handleAddNote} style={{ marginBottom: 16 }}>
            <div className="form-row">
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add a follow-up note…"
              />
            </div>
            <button type="submit" className="btn btn-primary">Add Note</button>
          </form>

          {(!lead.notes || lead.notes.length === 0) ? (
            <div className="empty">No notes yet</div>
          ) : (
            [...lead.notes].reverse().map((n) => (
              <div key={n._id} className="note-item">
                <div>{n.text}</div>
                <div className="note-time">{formatDateTime(n.createdAt)}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div className="stat-label">{label}</div>
      <div style={{ marginTop: 2 }}>{value}</div>
    </div>
  );
}

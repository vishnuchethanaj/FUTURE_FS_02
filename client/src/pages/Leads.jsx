import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  fetchLeads,
  createLead,
  updateLead,
  deleteLead,
} from '../services/leads';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import LeadForm from '../components/LeadForm';

function formatDate(d) {
  if (!d) return '—';
  return new Date(d).toLocaleDateString();
}

export default function Leads() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    fetchLeads({ search, status })
      .then(setLeads)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, status]);

  const handleSubmit = async (data) => {
    if (editing) {
      await updateLead(editing._id, data);
    } else {
      await createLead(data);
    }
    setShowForm(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this lead?')) return;
    await deleteLead(id);
    load();
  };

  return (
    <>
      <div className="page-header">
        <h1>Leads</h1>
        <button
          className="btn btn-primary"
          onClick={() => { setEditing(null); setShowForm(true); }}
        >
          + Add Lead
        </button>
      </div>

      <div className="toolbar">
        <input
          placeholder="Search by name, email, or company…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>All</option>
          <option>New</option>
          <option>Contacted</option>
          <option>Converted</option>
        </select>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-wrap">
          {loading ? (
            <div className="empty">Loading…</div>
          ) : leads.length === 0 ? (
            <div className="empty">No leads found</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Follow-Up</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l._id}>
                    <td>{l.name}</td>
                    <td>{l.email}</td>
                    <td>{l.company || '—'}</td>
                    <td>{l.source || '—'}</td>
                    <td><StatusBadge status={l.status} /></td>
                    <td>{formatDate(l.followUpDate)}</td>
                    <td>
                      <div className="row-actions">
                        <Link to={`${l._id}`} className="btn btn-sm">View</Link>
                        <button
                          type="button"
                          className="btn btn-sm"
                          onClick={() => { setEditing(l); setShowForm(true); }}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(l._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showForm && (
        <Modal
          title={editing ? 'Edit Lead' : 'Add Lead'}
          onClose={() => { setShowForm(false); setEditing(null); }}
        >
          <LeadForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => { setShowForm(false); setEditing(null); }}
          />
        </Modal>
      )}
    </>
  );
}

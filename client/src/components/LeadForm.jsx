import { useState } from 'react';

const empty = {
  name: '',
  email: '',
  phone: '',
  company: '',
  source: '',
  status: 'New',
  followUpDate: '',
  notes: '',
};

export default function LeadForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(() => {
    if (!initial) return empty;
    return {
      ...empty,
      ...initial,
      followUpDate: initial.followUpDate
        ? new Date(initial.followUpDate).toISOString().slice(0, 10)
        : '',
      notes: '', // initial notes are managed separately
    };
  });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError('Name and email are required.');
      return;
    }
    setError('');
    setSaving(true);
    try {
      const payload = { ...form };
      delete payload._id;
      delete payload.id;
      delete payload.createdAt;
      delete payload.updatedAt;
      delete payload.__v;

      if (!payload.followUpDate) delete payload.followUpDate;
      // Only send notes as an initial note when creating
      if (!initial && payload.notes) {
        payload.notes = [{ text: payload.notes }];
      } else {
        delete payload.notes;
      }
      await onSubmit(payload);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save lead');
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit}>
      <div className="form-grid">
        <div className="form-row">
          <label>Name *</label>
          <input value={form.name} onChange={update('name')} required />
        </div>
        <div className="form-row">
          <label>Email *</label>
          <input type="email" value={form.email} onChange={update('email')} required />
        </div>
        <div className="form-row">
          <label>Phone</label>
          <input value={form.phone} onChange={update('phone')} />
        </div>
        <div className="form-row">
          <label>Company</label>
          <input value={form.company} onChange={update('company')} />
        </div>
        <div className="form-row">
          <label>Source</label>
          <input value={form.source} onChange={update('source')} placeholder="Website, Referral..." />
        </div>
        <div className="form-row">
          <label>Status</label>
          <select value={form.status} onChange={update('status')}>
            <option>New</option>
            <option>Contacted</option>
            <option>Converted</option>
          </select>
        </div>
        <div className="form-row">
          <label>Follow-Up Date</label>
          <input type="date" value={form.followUpDate} onChange={update('followUpDate')} />
        </div>
      </div>

      {!initial && (
        <div className="form-row">
          <label>Initial Note (optional)</label>
          <textarea value={form.notes} onChange={update('notes')} />
        </div>
      )}

      {error && <div className="error">{error}</div>}

      <div className="modal-actions">
        <button type="button" className="btn" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary" disabled={saving}>
          {saving ? 'Saving…' : initial ? 'Update Lead' : 'Create Lead'}
        </button>
      </div>
    </form>
  );
}

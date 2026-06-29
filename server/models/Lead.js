const { Query, find, findById, create, updateById, deleteById } = require('../lib/store');

function normalizeLead(data = {}) {
  const noteTimestamp = new Date().toISOString();
  const notes = Array.isArray(data.notes)
    ? data.notes.map((note) => ({
        _id: note._id || undefined,
        text: String(note.text || '').trim(),
        createdAt: note.createdAt || noteTimestamp,
        updatedAt: note.updatedAt || note.createdAt || noteTimestamp,
      }))
    : [];

  return {
    name: String(data.name || '').trim(),
    email: String(data.email || '').toLowerCase().trim(),
    phone: data.phone ? String(data.phone).trim() : '',
    company: data.company ? String(data.company).trim() : '',
    source: data.source ? String(data.source).trim() : '',
    status: ['New', 'Contacted', 'Converted'].includes(data.status) ? data.status : 'New',
    followUpDate: data.followUpDate || null,
    notes,
  };
}

function validateLeadUpdate(update = {}) {
  if (update.status && !['New', 'Contacted', 'Converted'].includes(update.status)) {
    throw Object.assign(new Error('Invalid status'), { status: 400 });
  }

  return {
    ...update,
    email: update.email != null ? String(update.email).toLowerCase().trim() : update.email,
    name: update.name != null ? String(update.name).trim() : update.name,
    phone: update.phone != null ? String(update.phone).trim() : update.phone,
    company: update.company != null ? String(update.company).trim() : update.company,
    source: update.source != null ? String(update.source).trim() : update.source,
  };
}

module.exports = {
  find(query = {}) {
    return new Query(() => find('leads', query));
  },

  findById(id) {
    return new Query(() => findById('leads', id));
  },

  create(data) {
    return create('leads', data, normalizeLead);
  },

  findByIdAndUpdate(id, update, options) {
    return new Query(() => updateById('leads', id, update, options, validateLeadUpdate));
  },

  findByIdAndDelete(id) {
    return new Query(() => deleteById('leads', id));
  },
};

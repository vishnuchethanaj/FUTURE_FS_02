const Lead = require('../models/Lead');

// GET /api/leads?search=&status=
exports.list = async (req, res) => {
  const { search, status } = req.query;
  const query = {};

  if (status && status !== 'All') query.status = status;
  if (search) {
    const re = new RegExp(search, 'i');
    query.$or = [{ name: re }, { email: re }, { company: re }];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 });
  res.json(leads);
};

// GET /api/leads/:id
exports.getOne = async (req, res) => {
  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

// POST /api/leads
exports.create = async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  const lead = await Lead.create(req.body);
  res.status(201).json(lead);
};

// PUT /api/leads/:id
exports.update = async (req, res) => {
  const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

// DELETE /api/leads/:id
exports.remove = async (req, res) => {
  const lead = await Lead.findByIdAndDelete(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json({ ok: true });
};

// PATCH /api/leads/:id/status
exports.updateStatus = async (req, res) => {
  const { status } = req.body || {};
  if (!['New', 'Contacted', 'Converted'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
  if (!lead) return res.status(404).json({ message: 'Lead not found' });
  res.json(lead);
};

// POST /api/leads/:id/notes
exports.addNote = async (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ message: 'Note text is required' });

  const lead = await Lead.findById(req.params.id);
  if (!lead) return res.status(404).json({ message: 'Lead not found' });

  lead.notes.push({ text });
  await lead.save();
  res.status(201).json(lead);
};

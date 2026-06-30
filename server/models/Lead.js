const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const leadSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true, default: '' },
    company: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
    source: { type: String, trim: true, default: '' },
    status: { type: String, trim: true, enum: ['New', 'Contacted', 'Converted'], default: 'New' },
    followUpDate: { type: String, default: null },
    notes: { type: [noteSchema], default: [] },
  },
  { timestamps: true }
);

leadSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(_, ret) {
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});

const Lead = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
module.exports = Lead;

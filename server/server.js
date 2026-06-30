// Entry point for the Mini CRM API server.
require('dotenv').config({ path: require('path').join(__dirname, '.env') });
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/', (_req, res) => res.json({ ok: true, name: 'Mini CRM API' }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Debug endpoint to inspect stored data during deploy troubleshooting
app.get('/__debug/store', async (_req, res) => {
  try {
    const store = await require('./lib/store').loadState();
    return res.json({ ok: true, storeFile: process.env.STORE_FILE || null, dataDir: process.env.DATA_DIR || null, store });
  } catch (err) {
    console.error('Failed to read store:', err.message);
    return res.status(500).json({ ok: false, message: 'Failed to read store', error: err.message });
  }
});

const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

// 404 + error handler
app.use((req, res) => res.status(404).json({ message: 'Not found' }));
app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  try {
    const store = require('./lib/store');
    console.log('Using store file:', store.STORE_FILE || process.env.STORE_FILE || 'not-set');
  } catch (e) {
    console.log('Store info unavailable:', e.message);
  }
  app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
}).catch((error) => {
  console.error('Failed to start API:', error.message);
  process.exit(1);
});

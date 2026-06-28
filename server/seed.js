// Seed an admin user. Run with: node seed.js
require('dotenv').config();
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');
const User = require('./models/User');

(async () => {
  await connectDB();
  const email = 'admin@crm.com';
  const password = 'admin123';

  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin already exists:', email);
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ name: 'Admin', email, password: hash });
  console.log('Admin created');
  console.log('Email:   ', email);
  console.log('Password:', password);
  process.exit(0);
})();

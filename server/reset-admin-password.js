const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const newPassword = process.argv[2];
if (!newPassword) {
  console.error('Usage: node reset-admin-password.js <newPassword>');
  process.exit(1);
}

const file = path.join(__dirname, 'data', 'store.json');
if (!fs.existsSync(file)) {
  console.error('data/store.json not found');
  process.exit(1);
}

const raw = fs.readFileSync(file, 'utf8');
const state = JSON.parse(raw || '{}');
state.users = Array.isArray(state.users) ? state.users : [];

const email = 'admin@crm.com';
let user = state.users.find(u => (u.email || '').toLowerCase() === email);
const hash = bcrypt.hashSync(newPassword, 10);

if (user) {
  user.password = hash;
  user.updatedAt = new Date().toISOString();
  console.log('Updated existing admin password');
} else {
  const { randomUUID } = require('crypto');
  const now = new Date().toISOString();
  user = {
    _id: randomUUID(),
    createdAt: now,
    updatedAt: now,
    name: 'Admin',
    email,
    password: hash
  };
  state.users.push(user);
  console.log('Created admin user with new password');
}

fs.writeFileSync(file, JSON.stringify(state, null, 2));
console.log('Done');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || '';
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || '';
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:8083';
const FALLBACK_GOOGLE_REDIRECT_URI = 'http://localhost:5000/api/auth/google/callback';

function signToken(user) {
  return jwt.sign({ id: user._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });
}

function buildClientRedirect({ token, user }) {
  const params = new URLSearchParams();
  params.set('token', token);
  params.set('user', JSON.stringify({ id: user._id, name: user.name, email: user.email }));
  return `${CLIENT_URL}/login?${params.toString()}`;
}

function buildGoogleAuthUrl() {
  const redirectUri = GOOGLE_REDIRECT_URI || FALLBACK_GOOGLE_REDIRECT_URI;
  const params = new URLSearchParams({
    client_id: GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'consent',
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

async function exchangeGoogleCode(code) {
  const redirectUri = GOOGLE_REDIRECT_URI || FALLBACK_GOOGLE_REDIRECT_URI;
  const body = new URLSearchParams({
    code,
    client_id: GOOGLE_CLIENT_ID,
    client_secret: GOOGLE_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  });

  const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!tokenResponse.ok) {
    const errorText = await tokenResponse.text();
    throw new Error(`Google token exchange failed: ${errorText}`);
  }

  const tokenData = await tokenResponse.json();
  const profileResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
    headers: { Authorization: `Bearer ${tokenData.access_token}` },
  });

  if (!profileResponse.ok) {
    const errorText = await profileResponse.text();
    throw new Error(`Google profile lookup failed: ${errorText}`);
  }

  const profile = await profileResponse.json();
  return {
    googleId: profile.sub,
    name: profile.name || profile.given_name || profile.email?.split('@')[0] || 'Google User',
    email: String(profile.email || '').toLowerCase(),
  };
}

// POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken(user);
  res.json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

// GET /api/auth/google
exports.googleStart = async (_req, res) => {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    return res.status(500).json({ message: 'Google OAuth is not configured' });
  }

  return res.redirect(buildGoogleAuthUrl());
};

// GET /api/auth/google/callback
exports.googleCallback = async (req, res) => {
  const { code, error } = req.query || {};

  if (error) {
    return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent(String(error))}`);
  }

  if (!code) {
    return res.status(400).json({ message: 'Missing Google authorization code' });
  }

  try {
    const googleUser = await exchangeGoogleCode(String(code));
    let user = await User.findOne({ googleId: googleUser.googleId });

    if (!user && googleUser.email) {
      user = await User.findOne({ email: googleUser.email });
      if (user && !user.googleId) {
        user.googleId = googleUser.googleId;
        if (!user.name) user.name = googleUser.name;
        await user.save();
      }
    }

    if (!user) {
      user = await User.create({
        name: googleUser.name,
        email: googleUser.email,
        password: '',
        googleId: googleUser.googleId,
      });
    }

    const token = signToken(user);
    return res.redirect(buildClientRedirect({ token, user }));
  } catch (err) {
    console.error('Google auth failed:', err.message);
    return res.redirect(`${CLIENT_URL}/login?error=${encodeURIComponent('Google sign-in failed')}`);
  }
};

// Optional: POST /api/auth/register (handy for first admin creation)
exports.register = async (req, res) => {
  const { name, email, password } = req.body || {};
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email: email.toLowerCase(), password: hash });
  const token = signToken(user);
  res.status(201).json({
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
};

// GET /api/auth/me
exports.me = async (req, res) => {
  const user = await User.findById(req.userId).select('name email');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

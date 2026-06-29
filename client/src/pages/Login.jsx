import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Chrome } from 'lucide-react';
import { login, register, saveSession, isAuthenticated, startGoogleLogin } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('admin@crm.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    const errorParam = searchParams.get('error');

    if (errorParam) {
      setError(decodeURIComponent(errorParam));
    }

    if (token && user) {
      try {
        saveSession({ token, user: JSON.parse(user) });
        navigate('/', { replace: true });
      } catch {
        setError('Google login returned invalid data');
      }
    }
  }, [navigate, searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = mode === 'signup'
        ? await register(name, email, password)
        : await login(email, password);
      saveSession(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setError('');
    setGoogleLoading(true);
    startGoogleLogin();
  };

  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1>Mini CRM</h1>
        <p className="subtitle">
          {mode === 'signup' ? 'Create your admin account' : 'Sign in to your admin account'}
        </p>
        <div className="auth-mode-switch" role="tablist" aria-label="Authentication mode">
          <button
            type="button"
            className={mode === 'login' ? 'auth-mode active' : 'auth-mode'}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button
            type="button"
            className={mode === 'signup' ? 'auth-mode active' : 'auth-mode'}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {mode === 'signup' && (
            <div className="form-row">
              <label>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}
          <div className="form-row">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-row">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="error">{error}</div>}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
            disabled={loading}
          >
            {loading ? 'Please wait…' : mode === 'signup' ? 'Create account' : 'Login'}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch-link"
          onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
        >
          {mode === 'signup'
            ? 'Already have an account? Login'
            : 'Need an account? Sign up'}
        </button>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button
          type="button"
          className="btn auth-google-btn"
          onClick={handleGoogleLogin}
          disabled={googleLoading}
        >
          <Chrome size={16} />
          {googleLoading ? 'Redirecting…' : 'Continue with Google'}
        </button>
      </div>
    </div>
  );
}

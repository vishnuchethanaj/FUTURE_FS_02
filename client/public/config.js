// Runtime config for the frontend.
// Default to same-origin /api so the deployed app can reach the backend on the same host.
// If your API is hosted on a different domain, replace the value below with that URL.
window.__API_URL__ = window.__API_URL__ || '/api';

// Example: if your backend is hosted separately, set this URL to the backend API origin.
// window.__API_URL__ = 'https://your-backend-host.com/api';
 
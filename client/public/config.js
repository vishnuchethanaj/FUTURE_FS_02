// Runtime config for the frontend.
// Default to same-origin /api so the deployed app can reach the backend on the same host.
// If your API is hosted on a different domain, replace the value below with that URL.
window.__API_URL__ = `${window.location.protocol}//${window.location.host}/api`;

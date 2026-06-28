import api from './api';

export const fetchLeads = (params = {}) =>
  api.get('/leads', { params }).then((r) => r.data);

export const fetchLead = (id) => api.get(`/leads/${id}`).then((r) => r.data);

export const createLead = (data) => api.post('/leads', data).then((r) => r.data);

export const updateLead = (id, data) =>
  api.put(`/leads/${id}`, data).then((r) => r.data);

export const deleteLead = (id) => api.delete(`/leads/${id}`).then((r) => r.data);

export const updateLeadStatus = (id, status) =>
  api.patch(`/leads/${id}/status`, { status }).then((r) => r.data);

export const addLeadNote = (id, text) =>
  api.post(`/leads/${id}/notes`, { text }).then((r) => r.data);

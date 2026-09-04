import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const projectApi = {
  getAll: () => api.get('/projects'),
  getById: (id) => api.get(`/projects/${id}`),
  create: (data) => api.post('/projects', data),
};

export const feedbackApi = {
  getByProject: (projectId) => api.get(`/feedback/project/${projectId}`),
  getStats: (projectId) => api.get(`/feedback/project/${projectId}/stats`),
  updateStatus: (id, status) => api.patch(`/feedback/${id}/status?status=${status}`),
  submit: (data) => api.post('/feedback/submit', data),
};

export default api;
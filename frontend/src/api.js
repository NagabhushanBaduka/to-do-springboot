import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8081/api/tasks',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getTasks = () => api.get('');
export const createTask = (task) => api.post('', task);
export const updateTaskStatus = (id, completed) => api.put(`/${id}/status`, null, { params: { completed } });
export const deleteTask = (id) => api.delete(`/${id}`);

export default api;

import axios from 'axios';

// La constante contiene la url de la API
const tasksApi = axios.create({
     baseURL: 'http://localhost:8000/tasks/api/v1/tasks/'
})
// GET ALL
export const getAllTask = () => tasksApi.get('/');
// GET ID
export const getTask = (id) => tasksApi.get(`/${id}/`);
// POST
export const createTask = (task) => tasksApi.post('/', task);
// DELETE
export const deleteTask = (id) => tasksApi.delete(`/${id}`);
// PUT
export const updateTask = (id,task) => tasksApi.put(`/${id}/`,task);
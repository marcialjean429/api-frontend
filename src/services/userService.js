
import api from '../api/api';

export const getUsers = async () => {
    const response = await api.get('/');
    return response.data.data;
};

export const getUserById = async (id) => {
    const res = await api.get(`/${id}`);
    return res.data.data;
};

export const addUser = async (user) => {
     await api.post('/', user);
};

export const updateUser = async (id, user) => {
    await api.put(`/${id}`, user);
};

export const deleteUser = async (id) => {
    if (!window.confirm('Vous voulez enlever Id')) return;
    await api.delete(`/${id}`);
};
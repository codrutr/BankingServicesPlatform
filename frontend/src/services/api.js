import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44327/api',
});

export const getUsers = async () => {
    const response = await api.get('/user');
    return response.data;
};

export const createUser = async (userData) => {
    await api.post('/user', userData);
};

export const simulateCredit = async (userId) => {
    const response = await api.post(`/user/${userId}/simulate`);
    return response.data;
};

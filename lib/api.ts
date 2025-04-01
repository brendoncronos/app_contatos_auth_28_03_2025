import axios from "axios";

const api = axios.create({
  baseURL: 'https://aula-27-03-5sqc.onrender.com',
});

export const setAuthToken = (token: string) => {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export default api;

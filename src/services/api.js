import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // URL base del backend
});

export default api;

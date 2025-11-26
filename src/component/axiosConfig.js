import axios from "axios";

const api = axios.create({
  baseURL: 'https://be.pindar.id/api', // Mengambil base URL dari .env
  // baseURL:"http://localhost:4000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

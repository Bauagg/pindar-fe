import axios from "axios";

const api = axios.create({
  baseURL: 'https://be.pindar.id/api', // Mengambil base URL dari .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;

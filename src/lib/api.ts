import axios from 'axios';
import config from "@/lib/config";

const apiClient = axios.create({
  baseURL: config.API_URL,
  withCredentials: true,
});

export default apiClient;
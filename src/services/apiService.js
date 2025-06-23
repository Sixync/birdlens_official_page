// birdlen_official_page/src/services/apiService.js
import axios from 'axios';
import { auth } from '../firebase-config';

// Create an axios instance with the backend base URL from environment variables.
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

// Use an interceptor to attach the Firebase ID token to every request.
apiClient.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      // Get the latest Firebase ID token. This automatically handles token refreshes.
      const token = await user.getIdToken();
      // Add the token to the Authorization header.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Define reusable API call functions.
export const get = (url, config = {}) => {
  return apiClient.get(url, config);
};

export const post = (url, data, config = {}) => {
  return apiClient.post(url, data, config);
};

export const put = (url, data, config = {}) => {
  return apiClient.put(url, data, config);
};

export const patch = (url, data, config = {}) => {
  return apiClient.patch(url, data, config);
};

export const del = (url, config = {}) => {
  return apiClient.delete(url, config);
};

export default apiClient;
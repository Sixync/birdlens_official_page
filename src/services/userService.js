// birdlen_official_page/src/services/userService.js
import { get, post } from './apiService';

/**
 * Fetches the profile of the currently authenticated user.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCurrentUserProfile = () => {
  return get('/users/me');
};

/**
 * Fetches the followers of a specific user.
 * @param {string|number} userId - The ID of the user.
 * @param {object} params - Query parameters like { limit, offset }.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getUserFollowers = (userId, params) => {
  return get(`/users/${userId}/followers`, { params });
};

/**
 * Creates a new user via the non-auth endpoint.
 * Note: The primary registration flow uses the authService.
 * @param {object} userData - The user data for creation.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createUser = (userData) => {
  return post('/users', userData);
};
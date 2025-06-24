// file: birdlen_official_page/src/services/authService.js
import { post } from './apiService';

/**
 * Logs a user in by sending their credentials to the backend.
 * Returns a custom Firebase token on success.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<AxiosResponse<any>>}
 */
export const login = (email, password) => {
  return post('/auth/login', { email, password });
};

/**
 * Registers a new user.
 * @param {object} userData - { username, password, email, firstName, lastName, age }
 * @returns {Promise<AxiosResponse<any>>}
 */
export const register = (userData) => {
  return post('/auth/register', userData);
};

/**
 * Sends a password reset link to the user's email.
 * @param {string} email
 * @returns {Promise<AxiosResponse<any>>}
 */
export const forgotPassword = (email) => {
  return post('/auth/forgot-password', { email });
};

/**
 * Resets the user's password using a token.
 * @param {string} token
 * @param {string} newPassword
 * @returns {Promise<AxiosResponse<any>>}
 */
export const resetPassword = (token, newPassword) => {
  return post('/auth/reset-password', { token, new_password: newPassword });
};

/**
 * Refreshes an access token.
 * Note: Firebase SDK usually handles this automatically. This is for manual use if needed.
 * @param {string} accessToken
 * @param {string} refreshToken
 * @returns {Promise<AxiosResponse<any>>}
 */
export const refreshToken = (accessToken, refreshToken) => {
  return post('/auth/refresh_token', { access_token: accessToken, refresh_token: refreshToken });
};
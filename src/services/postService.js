// birdlen_official_page/src/services/postService.js
import { get, post } from './apiService';

/**
 * Fetches a paginated list of posts.
 * @param {object} params - Query parameters like { limit, offset }.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPosts = (params) => {
  return get('/posts', { params });
};

/**
 * Creates a new post with optional media.
 * @param {FormData} formData - A FormData object containing post content and files.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createPost = (formData) => {
  // When sending FormData, axios sets the correct multipart header automatically.
  return post('/posts', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Fetches comments for a specific post.
 * @param {string|number} postId - The ID of the post.
 * @param {object} params - Query parameters like { limit, offset }.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getPostComments = (postId, params) => {
  return get(`/posts/${postId}/comments`, { params });
};

/**
 * Adds a reaction to a post.
 * @param {string|number} postId - The ID of the post.
 * @param {string} reactionType - The type of reaction (e.g., 'like').
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addUserReaction = (postId, reactionType) => {
  return post(`/posts/${postId}/reactions?reaction_type=${reactionType}`);
};

/**
 * Creates a new comment on a post.
 * @param {string|number} postId - The ID of the post.
 * @param {object} commentData - The comment content, e.g., { content: 'Nice shot!' }.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createComment = (postId, commentData) => {
  return post(`/posts/${postId}/comments`, commentData);
};
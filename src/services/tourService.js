// birdlen_official_page/src/services/tourService.js
import { get, post, put } from './apiService';

/**
 * Fetches a paginated list of tours.
 * @param {object} params - Query parameters like { limit, offset }.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTours = (params) => {
  return get('/tours', { params });
};

/**
 * Fetches a single tour by its ID.
 * @param {string|number} tourId
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getTour = (tourId) => {
  return get(`/tours/${tourId}`);
};

/**
 * Creates a new tour.
 * @param {object} tourData
 * @returns {Promise<AxiosResponse<any>>}
 */
export const createTour = (tourData) => {
  return post('/tours', tourData);
};

/**
 * Uploads images for a tour.
 * @param {string|number} tourId
 * @param {FormData} formData - Containing the image files.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addTourImages = (tourId, formData) => {
  return put(`/tours/${tourId}/images`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

/**
 * Uploads a thumbnail for a tour.
 * @param {string|number} tourId
 * @param {FormData} formData - Containing the thumbnail file.
 * @returns {Promise<AxiosResponse<any>>}
 */
export const addTourThumbnail = (tourId, formData) => {
  return put(`/tours/${tourId}/thumbnail`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
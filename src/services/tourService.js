// file: birdlen_official_page/src/services/tourService.js
import { get, post, put, del } from './apiService';

const tourService = {
  getTours: (params) => get('/tours', { params }),

  getTour: (tourId) => get(`/tours/${tourId}`),

  createTour: (tourData) => post('/tours', tourData),
  
  updateTour: (tourId, tourData) => put(`/tours/${tourId}`, tourData),

  addTourImages: (tourId, formData) => {
    return put(`/tours/${tourId}/images`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  addTourThumbnail: (tourId, formData) => {
    return put(`/tours/${tourId}/thumbnail`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  deleteTour: (tourId) => del(`/tours/${tourId}`),
};

export default tourService;
// birdlen_official_page/src/services/generalApiService.js
import { get, post, del } from './apiService';

// --- Events ---
export const getEvents = (params) => get('/events', { params });
export const createEvent = (eventData) => post('/events', eventData);
export const getEvent = (eventId) => get(`/events/${eventId}`);
export const deleteEvent = (eventId) => del(`/events/${eventId}`);

// --- Subscriptions ---
export const getSubscriptions = () => get('/subscriptions');
export const createSubscription = (subData) => post('/subscriptions', subData);

// --- AI Services ---
export const identifyBird = (formData) => post('/ai/identify-bird', formData, {
  headers: { 'Content-Type': 'multipart/form-data' },
});
export const askAiQuestion = (questionData) => post('/ai/ask-question', questionData);

// --- eBird / Species ---
export const getHotspotVisitingTimes = (locId, speciesCode) => {
  const params = speciesCode ? { speciesCode } : {};
  return get(`/hotspots/${locId}/visiting-times`, { params });
};
export const getSpeciesRange = (scientificName) => get('/species/range', {
  params: { scientific_name: scientificName }
});

// --- Payments ---
export const createPaymentIntent = (items) => post('/create-payment-intent', { items });
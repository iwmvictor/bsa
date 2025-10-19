const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const request = async (method, endpoint, data = null) => {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`${method} ${endpoint} failed: ${response.status} - ${errorText}`);
  }

  return await response.json();
};

export const api = {
  // Generic
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  patch: (endpoint, data) => request("PATCH", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),

  // --- Car ---
  getAllCars: () => api.get("/car"),
  getCarById: (id) => api.get(`/car/${id}`),
  createCar: (data) => api.post("/car", data),
  updateCar: (id, data) => api.patch(`/car/${id}`, data),
  deleteCar: (id) => api.delete(`/car/${id}`),

  // --- Booked Dates ---
  getAllBookedDates: () => api.get("/booked_date"),
  getBookedDateById: (id) => api.get(`/booked_date/${id}`),
  createBookedDate: (data) => api.post("/booked_date", data),
  updateBookedDate: (id, data) => api.patch(`/booked_date/${id}`, data),
  deleteBookedDate: (id) => api.delete(`/booked_date/${id}`),

  // --- Booking ---
  getAllBookings: () => api.get("/booking"),
  getBookingById: (id) => api.get(`/booking/${id}`),
  createBooking: (data) => api.post("/booking", data),
  updateBooking: (id, data) => api.patch(`/booking/${id}`, data),
  deleteBooking: (id) => api.delete(`/booking/${id}`),

  // --- Contact Message ---
  getAllMessages: () => api.get("/contact_message"),
  getMessageById: (id) => api.get(`/contact_message/${id}`),
  createMessage: (data) => api.post("/contact_message", data),
  updateMessage: (id, data) => api.patch(`/contact_message/${id}`, data),
  deleteMessage: (id) => api.delete(`/contact_message/${id}`),

  // --- Favorite Car ---
  getAllFavorites: () => api.get("/favorite_car"),
  getFavoriteById: (id) => api.get(`/favorite_car/${id}`),
  createFavorite: (data) => api.post("/favorite_car", data),
  updateFavorite: (id, data) => api.patch(`/favorite_car/${id}`, data),
  deleteFavorite: (id) => api.delete(`/favorite_car/${id}`),

  // --- Notification ---
  getAllNotifications: () => api.get("/notification"),
  getNotificationById: (id) => api.get(`/notification/${id}`),
  createNotification: (data) => api.post("/notification", data),
  updateNotification: (id, data) => api.patch(`/notification/${id}`, data),
  deleteNotification: (id) => api.delete(`/notification/${id}`),

  // --- Review ---
  getAllReviews: () => api.get("/review"),
  getReviewById: (id) => api.get(`/review/${id}`),
  createReview: (data) => api.post("/review", data),
  updateReview: (id, data) => api.patch(`/review/${id}`, data),
  deleteReview: (id) => api.delete(`/review/${id}`),
};

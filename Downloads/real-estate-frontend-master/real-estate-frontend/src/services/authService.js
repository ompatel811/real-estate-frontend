import axios from "axios";

const API_URL = "http://localhost:8080/api";

// =======================
// AXIOS INSTANCE
// =======================
const api = axios.create({
  baseURL: API_URL,
});

// =======================
// ATTACH JWT TOKEN
// =======================
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// =======================
// AUTH APIs
// =======================
export const signup = (data) =>
  api.post("/auth/signup", data);

export const verifyOtp = (data) =>
  api.post("/auth/verify-otp", data);

export const login = (data) =>
  api.post("/auth/login", data);

// =======================
// USER APIs (PROTECTED)
// =======================
export const getCurrentUser = () =>
  api.get("/user/me");

export default api;

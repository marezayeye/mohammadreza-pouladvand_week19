import axios from "axios";

const BASE_URL = "http://localhost:3000";

const registerURL = `${BASE_URL}/auth/register`;
const loginURL = `${BASE_URL}/auth/login`;

// Axios instance with baseURL and Authorization header from localStorage
const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) {
    config.headers = config.headers || {};
    // Try common auth header variants to satisfy different backends
    config.headers["Authorization"] = `Bearer ${token}`;
    config.headers["x-auth-token"] = token;
    config.headers["x-access-token"] = token;
  }
  return config;
});

const authRequest = (url, data) => axios.post(url, data);

export { authRequest, registerURL, loginURL, api };

import axios from "axios";

// Get CSRF token from cookies or meta tag
const getCsrfToken = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="));
  return csrfCookie ? csrfCookie.split("=")[1] : null;
};

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: "/api", // Set your API base URL here
  withCredentials: true, // Send cookies with requests
});

// Set CSRF token on each request
axiosInstance.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  }
  return config;
});

export default axiosInstance;

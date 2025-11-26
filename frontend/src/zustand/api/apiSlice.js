import axios from "axios";
axios.defaults.withCredentials = true;

// Allow overriding the backend host via VITE_BACKEND_URL (e.g. https://api.example.com)
const backendBaseUrl =
  import.meta.env.VITE_BACKEND_URL?.replace(/\/$/, "") ??
  (import.meta.env.MODE === "development" ? "http://localhost:5000" : "");

const buildBaseUrl = (path) => `${backendBaseUrl}/api${path}`;

const createInstance = (path) =>
  axios.create({
    baseURL: buildBaseUrl(path),
    withCredentials: true,
  });

export const axiosInstance = createInstance("/user");
export const axiosInstanceCategory = createInstance("/category");
export const axiosInstanceProduct = createInstance("/product");
export const axiosInstanceCart = createInstance("/order");

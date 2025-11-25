import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/user"
      : "/api",
  withCredentials: true,
});

export const axiosInstanceCategory = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/category"
      : "/api/category",
  withCredentials: true,
});

export const axiosInstanceProduct = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/product"
      : "/api/product",
  withCredentials: true,
});


export const axiosInstanceCart = axios.create({
  baseURL:
    import.meta.env.MODE === "development"
      ? "http://localhost:5000/api/order"
      : "/api/order",
  withCredentials: true,
});

import axios from "axios";
export const authApi = axios.create({
  baseURL: "https://reqres.in/api",
  headers: { "Content-Type": "application/json" }
});
export const productApi = axios.create({
  baseURL: "https://dummyjson.com",
});
export const api = productApi; 
authApi.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export const fetchElectronics = async () => {
  const { data } = await productApi.get("/products/category/smartphones");
  return data.products;
};
export const fetchProductById = async (id) => {
  const { data } = await productApi.get(`/products/${id}`);
  return data;
};
export const loginUser = async (credentials) => {
  const { data } = await authApi.post("/login", credentials);
  return data;
};
import axios from "axios";
const API = axios.create({ 
  baseURL: "https://reqres.in/api",
  headers: { "Content-Type": "application/json" }
});
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userData");
      window.location.href = "/login"; 
    }
    return Promise.reject(error);
  }
);
export const loginUser = async (credentials) => {
  const { data } = await API.post("/login", credentials);
  return data; 
};
export const registerUser = async (userData) => {
  const { data } = await API.post("/register", userData);
  return data;
};
export default API;
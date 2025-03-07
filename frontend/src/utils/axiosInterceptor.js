import axios from "axios";

const api = axios.create({
  baseURL: "https://amhsalumni.com/api",
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
        console.error("logging out...");
        localStorage.removeItem("userProfile");
        window.location.href = '/login';
        return [];
    }

    return Promise.reject(error);
  }
);

export default api;
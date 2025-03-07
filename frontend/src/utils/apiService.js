import api from "./axiosInterceptor";

export const fetchUserData = async () => {
    try {
      const response = await api.get("/auth/me");
      return await response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  
  export const fetchDB = async () => {
    try {
      const response = await api.get('/alumni');
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
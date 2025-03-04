export const fetchUserData = async () => {
    try {
      const response = await fetch("/api/auth/me", { credentials: "include" });
      return await response.json();
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };
  
  export const fetchDB = async () => {
    try {
      const response = await fetch("/api/alumni", { credentials: "include" });
      return await response.json();
    } catch (error) {
      console.error("Error fetching DB:", error);
      return [];
    }
  };
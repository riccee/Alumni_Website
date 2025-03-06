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
      const response = await fetch('/api/alumni', {
        credentials: 'include',  // Important for cookies
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
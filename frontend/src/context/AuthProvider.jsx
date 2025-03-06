import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    let userProfile = localStorage.getItem("userProfile")
    if(userProfile){
      return JSON.parse(userProfile);
    }
    return null;
  });
  const navigate = useNavigate();

  const logoutApiCall = async () => {
    try {
      await fetch("/api/auth/logout", { 
        method: "POST",
        credentials: "include"  // Add this
      });
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Always clear local state even if request fails
      localStorage.removeItem("userProfile");
      setUser(null);
      navigate("/login");
    }
  };

  const loginApiCall = async (payload) => {
    try {
      // Await the token request
      const tokenResponse = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: payload.toString(),
        credentials: "include",
      });

      if (!tokenResponse.ok) {
        throw new Error("Login failed");
      }

      // Await the user data request
      const userResponse = await fetch("/api/auth/me", { 
        credentials: "include" 
      });

      if (!userResponse.ok) {
        throw new Error("Failed to fetch user data");
      }

      const userData = await userResponse.json();
      setUser(userData);
      localStorage.setItem("userProfile", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      throw error; // Re-throw to handle in the component
    }
  };

  const signupApiCall = async (payload) => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const userResponse = await fetch("/api/auth/me", { 
        credentials: "include" 
      });

      const userData = await userResponse.json();
      setUser(userData);
      localStorage.setItem("userProfile", JSON.stringify(userData));
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
    } 
  };
  


  

  return (
    <AuthContext.Provider value={{ signupApiCall, loginApiCall, logoutApiCall, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
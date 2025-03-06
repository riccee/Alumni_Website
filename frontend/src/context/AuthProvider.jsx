import { createContext, useState, useEffect } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false
  });

  const verifyAuth = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include'
      });
      
      if (response.ok) {
        setAuth({
          isAuthenticated: true,
        });
      } else {
        setAuth({
          isAuthenticated: false,
        });
      }
    } catch (error) {
      console.error('Auth verification failed:', error);
      setAuth({
        isAuthenticated: false,
      });
    }
  };

  useEffect(() => {
    verifyAuth();
    const interval = setInterval(verifyAuth, 5 * 60 * 1000); // Check every 5 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, verifyAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
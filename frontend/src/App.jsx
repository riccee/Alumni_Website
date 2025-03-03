/** @format */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Header from "./components/Header.jsx";
import Directory from "./components/Directory.jsx";
import ForgotPasswordPage from "./components/ForgotPasswordPage.jsx";
import ResetPasswordPage from './ResetPasswordPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Not authenticated");
      setIsAuthenticated(true);
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setIsAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const fetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/me", {
        credentials: "include",
      });
      const data = await response.json();
      console.log("User data:", data);
      alert(`Welcome, ${data.full_name || data.username}!`);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchDB = async () => {
    try {
      const response = await fetch("/api/alumni", {
        credentials: "include",
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching DB:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BrowserRouter>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      {isAuthLoading ? (
        <div>Loading...</div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Directory onFetchUser={fetchUserData} onFetchDB={fetchDB} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Signup onSuccess={() => setIsAuthenticated(true)} />
              )
            }
          />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}
export default App;

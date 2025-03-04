import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider"; 
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";

const RoutesConfig = () => {
    const { isAuthenticated, isAuthLoading } = useAuthContext(); 
  
    if (isAuthLoading) return <div>Loading...</div>; 
  
    return (
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/login" element={!isAuthLoading && isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
        <Route path="/signup" element={!isAuthLoading && isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
      </Routes>
    );
  };

export default RoutesConfig;

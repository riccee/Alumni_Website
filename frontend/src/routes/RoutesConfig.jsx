import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import UniversititesPage from "../pages/UniverisitiesPage";
import ProfilePage from "../pages/ProfilePage";
import RequireAuth from "../components/auth/RequireAuth";

const RoutesConfig = () => {
  return (
    <Routes>
      {/* protected routes */}
      <Route element={<RequireAuth />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/universities" element={<UniversititesPage />} />
        <Route path="/profile" element={<ProfilePage />}  />
      </Route>

      {/* public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );

};
export default RoutesConfig;


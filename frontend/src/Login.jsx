// Login.js
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

const Login = ({ onSuccess, onToggleSignup }) => {
  return (
    <>
      {/* Remove default browser margins/padding */}
      <CssBaseline />

      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        {/* Main Content */}
        {/* Login Form */}
        <LoginForm onSuccess={onSuccess} onToggleSignup={onToggleSignup} />
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default Login;

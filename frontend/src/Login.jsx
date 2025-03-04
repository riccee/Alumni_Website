// Login.js
import React from "react";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/Footer";
import LoginForm from "./components/LoginForm";

const Login = ({ onSuccess }) => {
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
          backgroundColor: "#f5f5f5",
        }}
      >
        {/* Main Content */}
        {/* Login Form */}
        <LoginForm onSuccess={onSuccess}/>
        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default Login;

import React, { useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import Footer from "./components/Footer";
import SignupForm from "./components/SignupForm";

const Signup = ({ onSuccess, onToggleSignup }) => {
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

        <SignupForm onSuccess={onSuccess} onToggleSignup={onToggleSignup} />
        <Footer />
      </Box>
    </>
  );
};

export default Signup;

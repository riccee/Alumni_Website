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
                <Box
                    component="main"
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        py: 6,
                        width: "100%",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            maxWidth: 800,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            px: 2,
                        }}
                    >
                        <SignupForm
                            onSuccess={onSuccess}
                            onToggleSignup={onToggleSignup}
                        />
                    </Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default Signup;

import React, { useState } from "react";
import {
    Box,
    Stack,
    Typography,
    TextField,
    Link,
    Button,
    Divider,
} from "@mui/material";

const SignupForm = ({ onSuccess, onToggleSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [referralCode, setReferralCode] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            setIsLoading(false);
            return;
        }

        const payload = {
            username,
            password,
            referral_code: referralCode,
        };

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

            onSuccess();
        } catch (error) {
            console.error("Signup failed:", error);
            alert("Signup failed: " + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Typography
                variant="h1"
                component="h1"
                sx={{
                    fontSize: { xs: 36, md: 48 },
                    fontWeight: "bold",
                    mb: 2,
                    color: "#000000",
                    textAlign: "center",
                }}
            >
                SIGN UP
            </Typography>

            <Divider
                sx={{
                    bgcolor: "#14542c",
                    height: 4,
                    width: "100%",
                    mb: 6,
                }}
            />

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", maxWidth: 600 }}
            >
                {/* 
          Outer Stack controlling vertical spacing for each row.
          Each row is its own Stack with direction row (on sm+).
        */}
                <Stack spacing={3}>
                    {/* USERNAME row */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        {/* Label box */}
                        <Box sx={{ minWidth: { sm: "30%" } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    lineHeight: "48px",
                                    textAlign: { xs: "left", sm: "right" },
                                    pr: { sm: 2 },
                                    color: "#000000",
                                }}
                            >
                                Username:
                            </Typography>
                        </Box>

                        {/* Input box (grow in row mode) */}
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type..."
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                size="medium"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": { color: "#000000" },
                                        "& fieldset": {
                                            borderColor: "#14542c",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#14542c",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Stack>

                    {/* PASSWORD row */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        <Box sx={{ minWidth: { sm: "30%" } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    lineHeight: "48px",
                                    textAlign: { xs: "left", sm: "right" },
                                    pr: { sm: 2 },
                                    color: "#000000",
                                }}
                            >
                                Password:
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type..."
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                size="medium"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": { color: "#000000" },
                                        "& fieldset": {
                                            borderColor: "#14542c",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#14542c",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Stack>

                    {/* CONFIRM PASSWORD row */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        <Box sx={{ minWidth: { sm: "30%" } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    lineHeight: "48px",
                                    textAlign: { xs: "left", sm: "right" },
                                    pr: { sm: 1 },
                                    color: "#000000",
                                }}
                            >
                                Confirm Password:
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type..."
                                type="password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                size="medium"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": { color: "#000000" },
                                        "& fieldset": {
                                            borderColor: "#14542c",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#14542c",
                                        },
                                    },
                                }}
                            />
                            {passwordError && (
                                <Typography color="error" sx={{ mt: 1 }}>
                                    {passwordError}
                                </Typography>
                            )}
                        </Box>
                    </Stack>

                    {/* REFERRAL CODE row */}
                    <Stack
                        direction={{ xs: "column", sm: "row" }}
                        alignItems={{ xs: "flex-start", sm: "center" }}
                    >
                        <Box sx={{ minWidth: { sm: "30%" } }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    lineHeight: "48px",
                                    textAlign: { xs: "left", sm: "right" },
                                    pr: { sm: 2 },
                                    color: "#000000",
                                }}
                            >
                                Referral Code:
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="Type..."
                                value={referralCode}
                                onChange={(e) =>
                                    setReferralCode(e.target.value)
                                }
                                size="medium"
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        "& input": { color: "#000000" },
                                        "& fieldset": {
                                            borderColor: "#14542c",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#14542c",
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Stack>
                </Stack>

                {/* Already a member? + Button */}
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body1" sx={{ color: "#828282" }}>
                        Already a member?{" "}
                        <Link
                            component="button"
                            onClick={() => onToggleSignup(false)}
                            sx={{
                                color: "#828282",
                                textDecoration: "underline",
                                "&:hover": { color: "#14542c" },
                            }}
                        >
                            Login here.
                        </Link>
                    </Typography>
                </Box>

                <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={isLoading}
                        sx={{
                            bgcolor: "#c9a952",
                            width: "100%",
                            maxWidth: 400,
                            height: 56,
                            fontSize: 18,
                            fontWeight: "bold",
                            "&:hover": { bgcolor: "#b39345" },
                        }}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default SignupForm;

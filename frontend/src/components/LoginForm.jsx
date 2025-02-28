import React, { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    Link,
    Button,
    Divider,
    Stack,
} from "@mui/material";

const LoginForm = ({ onSuccess, onToggleSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Prepare form data according to OAuth2 spec (x-www-form-urlencoded)
        const formData = new URLSearchParams();
        formData.append("username", username);
        formData.append("password", password);

        try {
            const response = await fetch("/api/auth/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: formData.toString(),
                credentials: "include",
            });

            if (!response.ok) {
                throw new Error("Login failed");
            }

            onSuccess();
        } catch (error) {
            console.error("Error during login:", error);
            alert("Login failed. Please check your credentials.");
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
                LOGIN
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
                </Stack>

                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography variant="body1" sx={{ color: "#828282" }}>
                        Not a member?{" "}
                        <Link
                            component="button"
                            onClick={() => onToggleSignup(true)}
                            sx={{
                                color: "#828282",
                                textDecoration: "underline",
                                "&:hover": {
                                    color: "#14542c",
                                },
                            }}
                        >
                            Sign up here.
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
                            "&:hover": {
                                bgcolor: "#b39345",
                            },
                        }}
                    >
                        {isLoading ? "Loading..." : "Submit"}
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default LoginForm;

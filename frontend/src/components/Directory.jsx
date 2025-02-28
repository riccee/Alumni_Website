import React, { useState } from "react";
import { Box, Typography, Button, Divider, CssBaseline } from "@mui/material";

const Directory = ({ onLogout, onFetchUser, onFetchDB }) => {
    const [isLoading, setIsLoading] = useState(false);

    return (
        <>
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
                            DIRECTORY
                        </Typography>

                        <Divider
                            sx={{
                                bgcolor: "#14542c",
                                height: 4,
                                width: "100%",
                                mb: 6,
                            }}
                        />

                        <Box sx={{ mt: 3, textAlign: "center" }}>
                            <Button
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
                                onClick={onLogout}
                            >
                                {isLoading ? "Loading..." : "Log Out"}
                            </Button>

                            <Box sx={{ mt: 3, textAlign: "center" }}>
                                <Button
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
                                    onClick={onFetchUser}
                                >
                                    {isLoading ? "Loading..." : "Fetch User"}
                                </Button>

                                <Box sx={{ mt: 3, textAlign: "center" }}>
                                    <Button
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
                                        onClick={onFetchDB}
                                    >
                                        {isLoading ? "Loading..." : "Fetch DB"}
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default Directory;

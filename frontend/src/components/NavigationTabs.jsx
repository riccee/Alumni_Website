import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { NavLink, useLocation } from "react-router-dom";

const NavigationTabs = () => {
    const location = useLocation(); // Get the current route

    const tabs = [
        { name: "Directory", path: "/" },
        { name: "Universities", path: "/universities" }
    ];

    return (
        <Stack direction="row" spacing={4} sx={{ cursor: "pointer" }}>
            {tabs.map((tab) => (
                <Box
                    key={tab.path}
                    sx={{
                        position: "relative",
                        paddingBottom: "8px",
                        transition: "all 0.3s ease",
                    }}
                >
                    <NavLink
                        to={tab.path}
                        style={{ textDecoration: "none" }}
                    >
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: location.pathname === tab.path ? "bold" : "normal",
                                color: location.pathname === tab.path ? "#C9A952" : "black",
                                transition: "color 0.3s ease",
                            }}
                        >
                            {tab.name}
                        </Typography>
                    </NavLink>

                    {/* Bottom Border Indicator */}
                    {location.pathname === tab.path && (
                        <Box
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                width: "100%",
                                height: "3px",
                                backgroundColor: "#C9A952",
                                transition: "width 0.3s ease",
                            }}
                        />
                    )}
                </Box>
            ))}
        </Stack>
    );
};

export default NavigationTabs;

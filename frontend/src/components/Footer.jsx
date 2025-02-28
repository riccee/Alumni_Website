// src/components/Footer.jsx
import React from "react";
import {
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                width: "100%",
                bgcolor: "#f5f5f5",
                py: 4,
                px: 3,
                borderTop: "1px solid #e0e0e0",
            }}
        >
            <Box
                sx={{
                    maxWidth: "lg",
                    mx: "auto",
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" },
                    justifyContent: "space-between",
                    gap: 4,
                }}
            >
                {/* Left section: site name + social icons */}
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: "#000000" }}>
                        Amhs Alumni Website
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <IconButton sx={{ color: "#14542c" }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#14542c" }}>
                            <LinkedInIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#14542c" }}>
                            <YouTubeIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#14542c" }}>
                            <InstagramIcon />
                        </IconButton>
                    </Box>
                </Box>

                {/* Right section: Link lists */}
                <Box
                    sx={{
                        display: "flex",
                        gap: { xs: 2, md: 4 },
                        flexWrap: "wrap",
                    }}
                >
                    {["Topic A", "Topic B", "Topic C"].map((topic, index) => (
                        <List key={index} sx={{ minWidth: "120px" }}>
                            <ListItem>
                                <ListItemText
                                    primary={topic}
                                    primaryTypographyProps={{
                                        fontWeight: "bold",
                                        color: "#14542c",
                                    }}
                                />
                            </ListItem>
                            {["Page 1", "Page 2", "Page 3"].map((page, idx) => (
                                <ListItemButton
                                    key={idx}
                                    sx={{
                                        py: 0.5,
                                        "&:hover": {
                                            color: "#14542c",
                                        },
                                    }}
                                >
                                    <ListItemText
                                        primary={page}
                                        primaryTypographyProps={{
                                            color: "#000000",
                                        }}
                                    />
                                </ListItemButton>
                            ))}
                        </List>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;

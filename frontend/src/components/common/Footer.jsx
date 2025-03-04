// src/components/Footer.jsx
import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";

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
        </Box>

      </Box>
    </Box>
  );
};

export default Footer;

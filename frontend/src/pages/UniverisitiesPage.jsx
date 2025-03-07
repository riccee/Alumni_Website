import React, { useState, useEffect } from "react";
import { fetchDB } from "../utils/apiService.js";

import {
  Box,
  Container,
  Typography,
  Button,
  Divider,
  CssBaseline,
  Paper,
  Stack,
  Grid2,
  TextField,
} from "@mui/material";

const UniversititesPage = () => {
  return (
      <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flexGrow: 1,
          pt: { xs: 5, sm: 11 },
          pb: { xs: 8, sm: 12 },
          height: "100%",
          width: "100%",
        }}
      >

        <Stack
          spacing={2}
          useFlexGap
          sx={{ alignItems: "center", width: { xs: "100%", sm: "70%" } }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            textAlign="center"
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              alignItems: "center",
              fontSize: "clamp(3rem, 10vw, 3.5rem)",
              mb: -2,
              mt: -2,
            }}
          >
            Alumni's&nbsp;Top&nbsp;
            <Typography
              component="span"
              variant="h2"
              fontWeight="bold"
              textAlign="center"
              sx={(theme) => ({
                fontSize: "inherit",
                color: "#c9a952",
              })}
            >
              Universities
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            textAlign="center"
            sx={{ mt: 2, mb: -2, color: "gray" }}
          >
            WEEWOOWEEWOOWEEWOOWEEWOO See the top univerisities AMHS Alumni attend   
          </Typography>

          <Divider
            sx={{ bgcolor: "#14542c", height: 4, width: "100%", my: 4 }}
          />
        </Stack>
      </Container>
    </Box>
  );
};

export default UniversititesPage;

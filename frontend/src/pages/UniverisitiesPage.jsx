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

  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Clemson_Tigers_logo.svg/1071px-Clemson_Tigers_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/South_Carolina_Gamecocks_logo.svg/1200px-South_Carolina_Gamecocks_logo.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Yale_University_Shield_1.svg/640px-Yale_University_Shield_1.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png",
    "https://content.sportslogos.net/logos/30/637/full/college_of_charleston_cougars_logo_secondary_20131241.png",
    "https://1000logos.net/wp-content/uploads/2021/06/Furman-Paladins-logo.png",
    "https://seekvectors.com/files/download/16c84f546fbfd1d5d939f8d576864ece.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Cornell_University_seal.svg/1200px-Cornell_University_seal.svg.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Princeton_seal.svg/1200px-Princeton_seal.svg.png",
    "https://content.sportslogos.net/logos/30/637/full/college_of_charleston_cougars_logo_secondary_20131241.png",
  ]; 

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
          <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {logos.map((logo, index) => (
          <img
            key={index}
            src={logo}
            alt="Top University"
            style={{ width: 200, height: 200 }}
          />
        ))}
      </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default UniversititesPage;

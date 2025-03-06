import React, { useState, useEffect } from "react";
import { fetchDB } from "../utils/apiService.js"

import {
  Box,
  Typography,
  Button,
  Divider,
  CssBaseline,
  Paper,
  Stack,
  Grid,
  TextField,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [alumniData, setAlumniData] = useState([]); 
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchDB(); 
        if (data) setAlumniData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const filteredAlumni = alumniData?.filter((item) =>
    `${item.First_Name} ${item.Last_Name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  ) || [];

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
              variant="h3"
              component="h3"
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

            <TextField
              fullWidth
              variant="outlined"
              label="Search by Name"
              sx={{ mb: 3 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Grid container spacing={3} direction="column">
              {filteredAlumni.length > 0 ? (
                filteredAlumni.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.Alumni_Id}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <AccountCircleIcon sx={{ fontSize: 30 }} />
                        <Stack direction="row">
                          <Typography variant="h5" sx={{ pr: 1 }}>
                            {item.First_Name}
                          </Typography>
                          <Typography variant="h5">{item.Last_Name}</Typography>
                        </Stack>
                      </Stack>
                      <Stack spacing={1}>
                        <Typography variant="h6">
                          Location: {item.Location}
                        </Typography>
                        <Typography variant="body1">
                          Undergraduate Program: {item.Undergrad_School}
                        </Typography>
                        {item.grad?.trim() && (
                          <Typography variant="body1">
                            Graduate Program: {item.Graduate_Program}
                          </Typography>
                        )}
                        <Typography variant="body1">{item.Email}</Typography>
                      </Stack>
                    </Paper>
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" sx={{ textAlign: "center" }}>
                  Loading...
                </Typography>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;

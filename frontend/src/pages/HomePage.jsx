import React, { useState, useEffect } from "react";
import { fetchDB } from "../utils/apiService.js";

import {
  Box,
  Typography,
  Button,
  Divider,
  CssBaseline,
  Paper,
  Stack,
  Grid2,
  TextField,
  Container,
  InputLabel,
  Link,
  Skeleton,
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

  const filteredAlumni =
    alumniData?.filter((item) =>
      `${item.First_Name} ${item.Last_Name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()),
    ) || [];

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
            AMHS&nbsp;Alumni&nbsp;
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
              Directory
            </Typography>
          </Typography>

          <Typography
            variant="h5"
            textAlign="center"
            sx={{ mt: 2, mb: -2, color: "gray" }}
          >
            RAAAAAA ALUMNI BITCH
          </Typography>

          <Divider
            sx={{ bgcolor: "#14542c", height: 4, width: "100%", my: 4 }}
          />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            useFlexGap
            sx={{ pt: 0, width: "100%", maxWidth: 800 }}
          >
            <TextField
              fullWidth
              variant="outlined"
              label="Search by Name"
              sx={{ mb: 3 }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Stack>
          <Grid2 container spacing={3} direction="column">
            {filteredAlumni.length > 0
              ? filteredAlumni.map((item) => (
                  <Grid2 item xs={12} sm={6} md={4} key={item.Alumni_Id}>
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
                  </Grid2>
                ))
              : [1, 2, 3].map((item) => (
                  <Grid2 key={item}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2,
                        width: "100%",
                        height: "auto",
                      }}
                    >
                      <Stack direction="row" spacing={2}>
                        <Skeleton variant="circular" width={30} height={30} />{" "}
                        <Stack direction="row" spacing={1}>
                          <Skeleton width={100} height={32} />{" "}
                          <Skeleton width={100} height={32} />
                        </Stack>
                      </Stack>
                      <Stack spacing={1} sx={{ mt: 2 }}>
                        <Skeleton width={600} height={28} />
                        <Skeleton width="100%" height={24} />
                        <Skeleton width="100%" height={24} />
                        <Skeleton width="100%" height={24} />
                      </Stack>
                    </Paper>
                  </Grid2>
                ))}
          </Grid2>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomePage;

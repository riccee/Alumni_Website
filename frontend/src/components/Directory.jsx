import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Divider,
  CssBaseline,
  Paper,
  Stack,
  Grid,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const data = [
  {
    Alumni_Id: 1,
    firstName: "Abby",
    lastName: "Youmans",
    location: "Mt. Pleasant",
    undergrad: "Yale University",
    grad: " ",
    email: "blah@dumb.com",
  },
  {
    Alumni_Id: 2,
    firstName: "Bowen",
    lastName: "Gao",
    location: "James Island",
    undergrad: "Princeton University ",
    grad: "University of Michigan",
    email: "blah@dumb.com",
  },
  {
    Alumni_Id: 3,
    firstName: "Carolina",
    lastName: "Cararra",
    location: "Charleston",
    undergrad: "Winthrop University",
    grad: "Harvard Univesity",
    email: "blah@dumb.com",
  },
];

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

            <Grid container spacing={3} direction="column">
              {data.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.Alumni_Id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      width: "100%",
                      height: 200,
                    }}
                  >
                    <Stack direction="row" spacing={2}>
                      <AccountCircleIcon sx={{ fontSize: 30 }} />
                      <Stack direction="row">
                        <Typography variant="h5" sx={{ pr: 1 }}>
                          {item.firstName}
                        </Typography>
                        <Typography variant="h5">{item.lastName}</Typography>
                      </Stack>
                    </Stack>
                    <Stack spacing={2}>
                      <Typography variant="h6">{item.location}</Typography>
                      <Typography variant="body1">{item.undergrad}</Typography>
                      {item.grad.trim() && ( // Only render this if grad is not empty
                        <Typography variant="body1">{item.grad}</Typography>
                      )}
                      <Typography variant="body1">{item.email}</Typography>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>

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

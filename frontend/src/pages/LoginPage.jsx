import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/common/Footer";
import Login from "../components/auth/Login";

const LoginPage = () => {
  return (
    <>
      <CssBaseline />

      <Box
        sx={{
          width: "100vw",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#f5f5f5",
        }}
      >
        <Login />
        <Footer />
      </Box>
    </>
  );
};

export default LoginPage;

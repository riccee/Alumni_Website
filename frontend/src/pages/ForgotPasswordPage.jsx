import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/common/Footer";
import ForgotPassword from "../components/auth/ForgotPassword";

const ForgotPasswordPage = () => {
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
        <ForgotPassword />
        <Footer />
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/common/Footer";
import ResetPassword from "../components/auth/ResetPassword";

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
        <ResetPassword />
        <Footer />
      </Box>
    </>
  );
};

export default ForgotPasswordPage;
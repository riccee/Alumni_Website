import { Box, CssBaseline } from "@mui/material";
import Footer from "../components/common/Footer";
import Signup from "../components/auth/Signup";


const SignupPage = ({ onSuccess }) => {
  return (
    <>
      {/* Remove default browser margins/padding */}
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

        <Signup/>
        <Footer />
      </Box>
    </>
  );
};

export default SignupPage;

import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { Link } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Box, CssBaseline } from "@mui/material";
import Footer from "./Footer";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage(
          "If an account exists with this email, you will receive password reset instructions."
        );
        setEmail(""); // Clear the form
      } else {
        setMessageType("error");
        setMessage(data.detail || "An error occurred. Please try again.");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

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
    <MDBContainer fluid>
      <MDBRow>
        <MDBCol sm="6">
          <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
            <h3
              className="fw-normal mb-3 ps-5 pb-3"
              style={{ letterSpacing: "1px" }}
            >
              Forgot Password
            </h3>

            <form onSubmit={handleSubmit}>
              <MDBInput
                wrapperClass="mb-4 mx-5 w-100"
                label="Email"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              {message && (
                <div
                  className={`mx-5 mb-4 p-3 text-center ${
                    messageType === "success"
                      ? "text-success"
                      : "text-danger"
                  }`}
                  style={{
                    backgroundColor:
                      messageType === "success"
                        ? "rgba(25, 135, 84, 0.1)"
                        : "rgba(220, 53, 69, 0.1)",
                    borderRadius: "4px",
                  }}
                >
                  {message}
                </div>
              )}

              <MDBBtn
                className="mb-4 px-5 mx-5 w-100"
                style={{ backgroundColor: "#14542c" }}
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </MDBBtn>
            </form>

            <div className="text-center">
              <p className="mb-0">
                Remember your password?{" "}
                <Link
                  component="button"
                  onClick={() => navigate('/login')}
                  sx={{ textDecoration: "none" }}
                >
                  Login here
                </Link>
              </p>
              <p className="mt-2">
                Don't have an account?{" "}
                <Link
                  component="button"
                  onClick={() => navigate('/signup')}
                  sx={{ textDecoration: "none" }}
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </MDBCol>

        <MDBCol sm="6" className="d-none d-sm-block px-0">
          <img
            src="https://today.citadel.edu/wp-content/uploads/2021/06/Jacob-Perlmutter-CGC-09.jpg"
            alt="Login image"
            className="w-100"
            style={{ objectFit: "cover", objectPosition: "left" }}
          />
        </MDBCol>
      </MDBRow>
      </MDBContainer>
      <Footer />
    </Box>
    </>
  );
};

export default ForgotPasswordPage;
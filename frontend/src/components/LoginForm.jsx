import React, { useState } from "react";
import { Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

const LoginForm = ({ onSuccess = () => {} }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Prepare form data according to OAuth2 spec (x-www-form-urlencoded)
    const formData = new URLSearchParams();
    if (email == "test") {
      formData.append("username", "test@gmail.com");
    } else {
      formData.append("username", email);
    }
    formData.append("password", password);

    try {
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData.toString(),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      onSuccess();
      navigate("/");
    } catch (error) {
      console.error("Error during login:", error);
      setPasswordError("Incorrect Email or Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            AMHS Alumni Directory <br />
          </h1>

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            The AMHS Alumni Club website serves as a bridge between alumni and
            current students, fostering ongoing connections and support. It
            provides a platform for alumni to stay engaged with the current AMHS
            community, share experiences, and offer guidance to current
            students. The website's goal is to strengthen the AMHS community,
            creating a network that benefits both past and present students.
          </p>
        </MDBCol>

        <MDBCol md="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
              <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                <h3
                  className="fw-normal mb-3 ps-5 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Log in
                </h3>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Email"
                    id="formControlLg"
                    type="username"
                    size="lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Password"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />

                  {passwordError && (
                    <Alert
                      severity="error"
                      sx={{
                        mt: -1,
                        mb: 2,
                        mx: 6,
                        mr: -6,
                        fontSize: "0.8rem",
                        p: 0.5,
                      }}
                    >
                      {passwordError}
                    </Alert>
                  )}

                  <div className="mb-4 mx-5 ms-5">
                    <Link
                      href="/forgot-password"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/forgot-password");
                      }}
                      sx={{ textDecoration: "none", fontSize: "0.9rem" }}
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <MDBBtn
                    className="mb-4 px-5 mx-5 w-100"
                    style={{ backgroundColor: "#c9a952" }}
                    size="lg"
                    type="submit"
                  >
                    Login
                  </MDBBtn>
                </form>
                <p className="ms-5">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate("/signup");
                    }}
                  >
                    Register here
                  </Link>
                </p>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginForm;

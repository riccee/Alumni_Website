import React, { useState } from "react";
import { Link, Alert } from "@mui/material";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

const LoginForm = ({ onSuccess, onToggleSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    } catch (error) {
      console.error("Error during login:", error);
      setPasswordError("Incorrect Email or Password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <MDBContainer fluid>
        <MDBRow>
          <MDBCol sm="6">
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
                    sx={{ mt: -1, mb: 2, mx: 6, mr: -6, fontSize: "0.8rem", p: 0.5 }}
                  >
                    {passwordError}
                  </Alert>
                )}

                <MDBBtn
                  className="mb-4 px-5 mx-5 w-100"
                  style={{ backgroundColor: "#c9a952" }}
                  size="lg"
                >
                  Login
                </MDBBtn>
              </form>
              {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p> */}
              <p className="ms-5">
                Don't have an account?{" "}
                <Link component="button" onClick={() => onToggleSignup(true)}>
                  Register here
                </Link>
              </p>
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
    </>
  );
};

export default LoginForm;

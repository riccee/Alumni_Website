import React, { useState } from "react";
import { Link, Alert } from "@mui/material";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";

const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters long.");
  if (!/\d/.test(password))
    errors.push("Password must contain at least one digit.");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter.");
  return errors;
};

const SignupForm = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));

    if (confirmPassword && newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  // Handle Confirm Password Change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    if (password !== e.target.value) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (passwordErrors.length > 0) {
      alert("Please fix password errors before submitting.");
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const payload = {
      firstname,
      lastname,
      email,
      password,
      referral_code: referralCode,
    };

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        credentials: "include",
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      onSuccess();
      navigate("/");
    } catch (error) {
      console.error("Signup failed:", error);
      alert("Signup failed: " + error.message);
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
                Sign Up
              </h3>

              <form onSubmit={handleSubmit}>
                <MDBRow>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="First Name"
                      id="formControlLg"
                      type="firstname"
                      size="lg"
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </MDBCol>
                  <MDBCol col="6">
                    <MDBInput
                      wrapperClass="mb-4 mx-5 w-100"
                      label="Last Name"
                      id="formControlLg"
                      type="lastname"
                      size="lg"
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </MDBCol>
                </MDBRow>

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

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />

                {passwordErrors.length > 0 && (
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
                    {passwordErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </Alert>
                )}

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Confirm Password"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  required
                />

                {confirmPasswordError && (
                  <Alert
                    severity="error"
                    sx={{ mt: -1, mb: 2, mx: 6, fontSize: "0.8rem", p: 0.5 }}
                  >
                    {confirmPasswordError}
                  </Alert>
                )}

                <MDBInput
                  wrapperClass="mb-4 mx-5 w-100"
                  label="Referral Code"
                  id="formControlLg"
                  type="password"
                  size="lg"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  required
                />

                <MDBBtn
                  className="mb-4 px-5 mx-5 w-100"
                  style={{ backgroundColor: "#c9a952" }}
                  size="lg"
                  type="submit"
                  disabled={passwordErrors.length > 0 || confirmPasswordError || isLoading}
                >
                  Sign Up
                </MDBBtn>
              </form>
              {/* <p className="small mb-5 pb-lg-3 ms-5"><a class="text-muted" href="#!">Forgot password?</a></p> */}
              <p className="ms-5">
                Already have an account?{" "}
                <Link component="button" onClick={() => navigate("/login")}>
                  Login here
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

export default SignupForm;

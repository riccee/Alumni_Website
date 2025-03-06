import React, { useState, useContext } from "react";
import { Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthProvider"; 

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

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

const Signup = ({ onSuccess }) => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [passwordErrors, setPasswordErrors] = useState([]);
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuth } = useContext(AuthContext);

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

      setAuth({ isAuthenticated: true });

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
      <MDBContainer fluid className="p-4">
        <MDBRow>
          <MDBCol md="6" className="text-center text-md-start d-flex flex-column justify-content-center">

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
          </MDBCardBody>
          </MDBCard>
        </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Signup;

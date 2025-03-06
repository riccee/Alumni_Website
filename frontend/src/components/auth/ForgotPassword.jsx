import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
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
          "If an account exists with this email, you will receive password reset instructions.",
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
    <MDBContainer fluid>
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
        <MDBCol sm="6">
          <MDBCard className="my-5">
            <MDBCardBody className="p-5">
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
                    type="submit"
                  >
                    {isLoading ? "Sending..." : "Reset Password"}
                  </MDBBtn>
                </form>

                <div className="text-center">
                  <p className="mb-0">
                    Remember your password?{" "}
                    <Link
                      component="button"
                      onClick={() => navigate("/login")}
                      sx={{ textDecoration: "none" }}
                    >
                      Login here
                    </Link>
                  </p>
                  <p className="mt-2">
                    Don't have an account?{" "}
                    <Link
                      component="button"
                      onClick={() => navigate("/signup")}
                      sx={{ textDecoration: "none" }}
                    >
                      Register here
                    </Link>
                  </p>
                </div>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ForgotPassword;

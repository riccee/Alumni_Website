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
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          new_password: newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessageType("success");
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/"); // Redirect to login page after 2 seconds
        }, 2000);
      } else {
        setMessageType("error");
        setMessage(data.detail || "Failed to reset password");
      }
    } catch (error) {
      setMessageType("error");
      setMessage("An error occurred. Please try again.");
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
                  Reset Password
                </h3>

                <form onSubmit={handleSubmit}>
                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="New Password"
                    id="newPassword"
                    type="password"
                    size="lg"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />

                  <MDBInput
                    wrapperClass="mb-4 mx-5 w-100"
                    label="Confirm New Password"
                    id="confirmPassword"
                    type="password"
                    size="lg"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                    {isLoading ? "Resetting..." : "Reset Password"}
                  </MDBBtn>
                </form>
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default ResetPassword;

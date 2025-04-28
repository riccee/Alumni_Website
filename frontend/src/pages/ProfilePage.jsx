import React, { useState, useContext } from "react";
import { Link, Alert, CssBaseline, Box } from "@mui/material";
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
import Footer from "../components/common/Footer";
import AuthContext from "../context/AuthProvider";

const ProfilePage = () => {
  const { editProfileApiCall } = useContext(AuthContext);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState(""); 
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      await editProfileApiCall(payload);
    } catch (error) {
      console.error("Error during edit:", error);
    }
  };

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
          backgroundColor: "#f5f5f5",
        }}
      >
        <MDBContainer fluid className="p-4">
          <MDBRow>
            <MDBCol>

              <MDBCard className="my-5">
                <MDBCardBody className="p-5">
                  <div className="d-flex flex-column justify-content-center h-custom-2 w-75 pt-4">
                    <h3
                      className="fw-normal mb-3 ps-5 pb-3"
                      style={{ letterSpacing: "1px" }}
                    >
                      User Profile
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

                      <h3
                        className="fw-normal mb-3 ps-5 pb-3"
                        style={{ letterSpacing: "1px" }}
                      >
                        Edit Personal Information
                      </h3>

                      <MDBRow>
                        <MDBCol col="6">
                          <MDBInput
                            wrapperClass="mb-4 mx-5 w-100"
                            label="New First Name"
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
                            label="New Last Name"
                            id="formControlLg"
                            type="lastname"
                            size="lg"
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBBtn
                        className="mb-4 px-5 mx-5 w-100"
                        style={{ backgroundColor: "#c9a952" }}
                        size="lg"
                        type="submit"
                      >
                        Submit
                      </MDBBtn>
                    </form>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <Footer />
      </Box>
    </>
  );
};

export default ProfilePage;

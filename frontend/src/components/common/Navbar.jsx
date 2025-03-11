import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link } from "@mui/material";
import { useNavigate } from "react-router";

const settings = ["Logout"];

const Navbar = () => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, logoutApiCall } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#14542c" }}>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: "space-between",
          height: 80,
          width: "100vw",
        }}
      >
        <Box
          sx={{
            top: 0,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
          }}
        >
          <img
            src="https://c.animaapp.com/lWfAepnV/img/image-4@2x.png"
            alt="Logo"
            style={{ width: 58, height: 58 }}
          />
        </Box>

        {user && (
          <>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                marginLeft: "auto",
                marginRight: "2rem",
              }}
            >
              <Link
                sx={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  position: "relative",
                  "&:hover": {
                    color: "white",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: -4,
                    left: 0,
                    backgroundColor: "#c9a952",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/");
                }}
              >
                Directory
              </Link>

              <Link
                sx={{
                  textDecoration: "none",
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  position: "relative",
                  "&:hover": {
                    color: "white",
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: -4,
                    left: 0,
                    backgroundColor: "#c9a952",
                    transition: "width 0.3s ease",
                  },
                  "&:hover::after": {
                    width: "100%",
                  },
                }}
                href="/universities"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/universities");
                }}
              >
                Universities
              </Link>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "60px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleCloseUserMenu();
                      logoutApiCall();
                    }}
                  >
                    <Typography sx={{ textAlign: "center" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;

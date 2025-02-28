import React from "react";
import { Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Header = ({ isAuthenticated }) => {
    return (
        <Box
            component="header"
            sx={{
                position: "sticky",
                top: 0,
                zIndex: 9999,
                width: "100%",
                bgcolor: "#14542c",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
            }}
        >
            <img
                src="https://c.animaapp.com/lWfAepnV/img/image-4@2x.png"
                alt="Logo"
                style={{ width: 58, height: 58 }}
            />
            {isAuthenticated && (
                <AccountCircleIcon sx={{ color: "white", fontSize: 58 }} />
            )}
        </Box>
    );
};

export default Header;

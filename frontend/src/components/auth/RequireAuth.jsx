import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import { CircularProgress, Box } from "@mui/material";

const RequireAuth = () => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    // Add loading state if needed
    if (user === undefined) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return user ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth;
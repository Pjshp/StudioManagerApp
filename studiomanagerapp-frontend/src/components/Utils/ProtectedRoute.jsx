import {Navigate, Outlet} from "react-router-dom";
import {getAuthToken, getUserData} from "./axios_helper.jsx";

const ProtectedRoute = ({ children }) => {
    const authToken = getAuthToken();

    if (authToken) {
        const userData = getUserData();
        const role = userData?.role;

        // Redirect based on role
        if (role === "ADMIN") {
            return <Navigate to="/admin/home" replace />;
        } else if (role === "USER") {
            return <Navigate to="/user/home" replace />;
        } else {
            return <Navigate to="/home" replace />; // Default route
        }
    }

    return children || <Outlet />;
};

export default ProtectedRoute;
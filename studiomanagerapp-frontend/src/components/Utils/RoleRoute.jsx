import { Navigate, Outlet } from "react-router-dom";
import { getUserData } from "../Utils/axios_helper.jsx";

/**
 * Komponent do ochrony ścieżek pod względem roli.
 * @param {Array<string>} allowedRoles - np. ["ADMIN"], ["USER"]
 * @param {string} redirectPath - gdzie przekierować jeśli brak dostępu
 */
const RoleRoute = ({ allowedRoles, redirectPath = "/unauthorized" }) => {
    const user = getUserData();

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default RoleRoute;

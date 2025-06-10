import {Navigate, Outlet} from "react-router-dom";
import {getAuthToken} from "./axios_helper.jsx";

const ProtectedRoute = ({ redirectPath = "/dashboard", childeren }) => {
    const authToken = getAuthToken();

    if (authToken) {
        return <Navigate to={redirectPath} replace/>;
    }

    return childeren || <Outlet/>;
}

export default ProtectedRoute;
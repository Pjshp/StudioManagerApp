import {getAuthToken} from "./axios_helper.jsx";
import {Navigate, Outlet} from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
    const token = getAuthToken();

    return token ? (children || <Outlet />) : <Navigate to="/login" replace />;
};


PrivateRoute.propTypes = {
    children: PropTypes.node,
};

export default PrivateRoute;
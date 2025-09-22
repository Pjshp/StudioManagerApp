import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AdminHome from "./pages/Home/AdminHome.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/SignUp/SignUp.jsx";
import Massages from "./pages/Massages/Massages.jsx";
import PrivateRoute from "./components/Utils/PrivateRoute.jsx";
import ProtectedRoute from "./components/Utils/ProtectedRoute.jsx";
import UserHome from "./pages/Home/UserHome.jsx";

const routes = (
    <Router>
        <Routes>
            <Route element={<ProtectedRoute redirectPath="/dashboard" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/masaze" element={<Massages />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
);

const App = () =>{
    return <div>{routes}</div>;
}

export default App;
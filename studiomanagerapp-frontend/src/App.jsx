import './index.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/SignUp/SignUp.jsx";
import PrivateRoute from "./components/Utils/PrivateRoute.jsx";
import ProtectedRoute from "./components/Utils/ProtectedRoute.jsx";

const routes = (
    <Router>
        <Routes>
            <Route element={<ProtectedRoute redirectPath="/dashboard" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Home />} />
            </Route>

            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
);

const App = () =>{
    return <div>{routes}</div>;
}

export default App;
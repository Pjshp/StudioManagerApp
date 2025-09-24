import './index.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminHome from "./pages/Home/AdminHome.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/SignUp/SignUp.jsx";
import Massages from "./pages/Massages/Massages.jsx";
import PrivateRoute from "./components/Utils/PrivateRoute.jsx";
import ProtectedRoute from "./components/Utils/ProtectedRoute.jsx";
import UserHome from "./pages/Home/UserHome.jsx";
import RoleRoute from "./components/Utils/RoleRoute.jsx";
import UnauthorizedPage from "./pages/Unauthorized/UnauthorizedPage.jsx";
import { UserProvider } from "./components/Context/UserContext.jsx";

const routes = (
    <Router>
        <Routes>
            {/* Publiczne strony (login/signup) */}
            <Route element={<ProtectedRoute redirectPath="/dashboard" />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Prywatne strony, wymagające zalogowania */}
            <Route element={<PrivateRoute />}>
                {/* Strony admina */}
                <Route element={<RoleRoute allowedRoles={["ADMIN"]} />}>
                    <Route path="/admin/home" element={<AdminHome />} />
                </Route>

                {/* Strony zwykłego użytkownika */}
                <Route element={<RoleRoute allowedRoles={["USER", "ADMIN"]} />}>
                    <Route path="/user/home" element={<UserHome />} />
                </Route>
            </Route>

            {/* Strona brak dostępu */}
            <Route path="/unauthorized" element={<UnauthorizedPage />} />

            {/* Wszystko inne → login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    </Router>
);

const App = () => (
    <UserProvider>
        {routes}
    </UserProvider>
);

export default App;

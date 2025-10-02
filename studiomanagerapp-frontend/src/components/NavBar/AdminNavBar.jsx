import { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import {
    getAuthToken,
    setAuthToken,
    setUserData,
    getUserData,
} from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

const AdminNavBar = ({
                         onManageUsers = () => {},
                         onManagePasses = () => {},
                         onManageAvailability = () => {},
                         onManageActivities = () => {},
                         onManageEvents = () => {},
                         onManageRooms = () => {},
                     }) => {
    const [loggedUser, setUser] = useState(null);
    const navigate = useNavigate();
    const token = getAuthToken();

    useEffect(() => {
        let user = getUserData();
        if (user?.data) user = user.data;
        setUser(user);
    }, []);

    const onLogout = () => {
        setAuthToken(null);
        setUserData(null);
        navigate("/login", { replace: true });
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2
                className="text-xl font-medium text-black py-2 cursor-pointer"
                onClick={() => navigate("/")}
            >
                Tu i Teraz Studio
            </h2>

            {token && (
                <>
                    <div className="flex items-center gap-4">
                        <button className="btn-primary" onClick={onManageUsers}>Użytkownicy</button>
                        <button className="btn-primary" onClick={onManagePasses}>Karnety</button>
                        <button className="btn-primary" onClick={onManageAvailability}>Dostępność kadry</button>
                        <button className="btn-primary" onClick={onManageActivities}>Aktywności</button>
                        <button className="btn-primary" onClick={onManageEvents}>Wydarzenia</button>
                        <button className="btn-primary" onClick={onManageRooms}>Pomieszczenia</button>
                    </div>

                    <div className="flex flex-col items-end ml-4">
                        {loggedUser ? (
                            <p className="text-sm text-gray-500">
                                Zalogowany jako: {loggedUser.firstName || ""} {loggedUser.lastName || ""}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">Brak zalogowanego użytkownika</p>
                        )}
                        <ProfileInfo onLogout={onLogout} />
                    </div>
                </>
            )}
        </div>
    );
};

AdminNavBar.propTypes = {
    onManageUsers: PropTypes.func,
    onManagePasses: PropTypes.func,
    onManageAvailability: PropTypes.func,
    onManageActivities: PropTypes.func,
    onManageEvents: PropTypes.func,
    onManageRooms: PropTypes.func,
};

export default AdminNavBar;

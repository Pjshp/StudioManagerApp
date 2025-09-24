import { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import MassagesDropdown from "./MassagesDropdown";
import UsersDropdown from "./UsersDropdown";
import { getAuthToken, request, setAuthToken, setUserData, getUserData } from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

const AdminNavBar = ({
                         onSearch,
                         onSortChange,
                         sortOrder,
                         onManageReservations,
                         onManageUsers,
                         onOpenAddEditModal,
                         onManagePasses,
                         onManageAvailability,
                         onManageActivities,
                         onManageEvents,
                         onManageRooms,
                     }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const token = getAuthToken();

    useEffect(() => {
        const loggedUser = getUserData();
        setUser(loggedUser);
    }, []);

    const onLogout = () => {
        setAuthToken(null);
        setUserData(null);
        navigate("/login", { replace: true });
    };

    const handleSearch = async () => {
        try {
            const response = await request("get", `/api/notes/user/search?query=${searchQuery}`);
            const sortedNotes = response.data.sort((a, b) => b.pinned - a.pinned);
            onSearch(sortedNotes);
        } catch (err) {
            console.error("Error during note search", err.response || err);
        }
    };

    const onClearSearch = async () => {
        setSearchQuery("");
        try {
            const response = await request("get", "/api/notes/user");
            const sortedNotes = response.data.sort((a, b) => b.pinned - a.pinned);
            onSearch(sortedNotes);
        } catch (err) {
            console.error("Error fetching notes", err.response || err);
        }
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Tu i Teraz Studio</h2>

            {token && (
                <>
                    <div className="flex items-center gap-4">
                        <MassagesDropdown
                            onOpenAddEditMassage={() =>
                                onOpenAddEditModal({
                                    isShown: true,
                                    type: "add",
                                    data: null,
                                })
                            }
                            onManageReservations={onManageReservations}
                        />

                        <button className="btn-primary" onClick={onManageUsers}>
                            Użytkownicy
                        </button>
                        <button className="btn-primary" onClick={onManagePasses}>
                            Karnety
                        </button>
                        <button className="btn-primary" onClick={onManageAvailability}>
                            Dostępność kadry
                        </button>
                        <button className="btn-primary" onClick={onManageActivities}>
                            Aktywności
                        </button>
                        <button className="btn-primary" onClick={onManageEvents}>
                            Wydarzenia
                        </button>
                        <button className="btn-primary" onClick={onManageRooms}>
                            Pomieszczenia
                        </button>
                    </div>

                    <div className="flex flex-col items-end ml-4">
                        {user && (
                            <p className="text-sm text-gray-500">
                                Zalogowany jako: {user.firstName} {user.lastName}
                            </p>
                        )}
                        <ProfileInfo onLogout={onLogout} />
                    </div>
                </>
            )}
        </div>
    );
};

AdminNavBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onManageReservations: PropTypes.func.isRequired,
    onManageUsers: PropTypes.func.isRequired,
    onOpenAddEditModal: PropTypes.func.isRequired,
    onManagePasses: PropTypes.func,
    onManageAvailability: PropTypes.func,
    onManageActivities: PropTypes.func,
    onManageEvents: PropTypes.func,
    onManageRooms: PropTypes.func,
};

export default AdminNavBar;

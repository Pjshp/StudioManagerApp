import { useState } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar.jsx";
import MassagesDropdown from "./MassagesDropdown";
import UsersDropdown from "./UsersDropdown";
import { getAuthToken, request, setAuthToken, setUserData } from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

const NavBar = ({ onSearch, onSortChange, sortOrder, onManageReservations, onManageUsers, onOpenAddEditModal }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const token = getAuthToken();

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
                            onOpenAddEditMassage={() => onOpenAddEditModal({
                                isShown: true,
                                type: "add",
                                data: null,
                            })}
                            onManageReservations={onManageReservations}
                        />
                        <button
                            className="btn-primary"
                            disabled
                        >
                            Pilates
                        </button>
                        <button
                            className="btn-primary"
                            disabled
                        >
                            Taniec
                        </button>
                        <UsersDropdown
                            onManageUsers={onManageUsers}
                        />
                    </div>

                    <ProfileInfo onLogout={onLogout} />
                </>
            )}
        </div>
    );
};

NavBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onManageReservations: PropTypes.func.isRequired,
    onManageUsers: PropTypes.func.isRequired,
    onOpenAddEditModal: PropTypes.func.isRequired,
};

export default NavBar;
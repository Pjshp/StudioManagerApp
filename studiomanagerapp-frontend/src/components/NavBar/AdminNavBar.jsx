import { useState, useEffect } from "react";
import ProfileInfo from "../Cards/ProfileInfo";
import Modal from "react-modal";
import ManageActivitiesModal from "../Modals/Activities/ManageActivitiesModal.jsx";
import { useNavigate } from "react-router-dom";
import {
    getAuthToken,
    setAuthToken,
    setUserData,
    getUserData,
} from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

Modal.setAppElement("#root");

const AdminNavBar = ({
                         onManageUsers,
                         onManagePasses,
                         onManageAvailability,
                         onManageRooms,
                         onManageEvents,
                     }) => {
    const [loggedUser, setUser] = useState(null);
    const [isActivitiesModalOpen, setIsActivitiesModalOpen] = useState(false);

    const navigate = useNavigate();
    const token = getAuthToken();

    // Pobranie danych zalogowanego użytkownika
    useEffect(() => {
        let user = getUserData();
        console.log("Logged user data from localStorage:", user);

        if (user?.data) {
            user = user.data;
        }
        setUser(user);
    }, []);

    // Wylogowanie
    const onLogout = () => {
        setAuthToken(null);
        setUserData(null);
        navigate("/login", { replace: true });
    };

    const openActivitiesModal = () => setIsActivitiesModalOpen(true);
    const closeActivitiesModal = () => setIsActivitiesModalOpen(false);

    return (
        <>
            <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
                <h2
                    className="text-xl font-medium text-black py-2 cursor-pointer"
                    onClick={() => navigate("/")}
                >
                    Tu i Teraz Studio
                </h2>

                {token && (
                    <>
                        {/* Nawigacja admina */}
                        <div className="flex items-center gap-4">
                            <button className="btn-primary" onClick={onManageUsers}>
                                Użytkownicy
                            </button>
                            <button className="btn-primary" onClick={onManagePasses}>
                                Karnety
                            </button>
                            <button className="btn-primary" onClick={onManageAvailability}>
                                Dostępność kadry
                            </button>
                            <button className="btn-primary" onClick={openActivitiesModal}>
                                Aktywności
                            </button>
                            <button className="btn-primary" onClick={onManageEvents}>
                                Wydarzenia
                            </button>
                            <button className="btn-primary" onClick={onManageRooms}>
                                Pomieszczenia
                            </button>
                        </div>

                        {/* Informacje o użytkowniku */}
                        <div className="flex flex-col items-end ml-4">
                            {loggedUser ? (
                                <p className="text-sm text-gray-500">
                                    Zalogowany jako: {loggedUser.firstName || ""}{" "}
                                    {loggedUser.lastName || ""}
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Brak zalogowanego użytkownika
                                </p>
                            )}
                            <ProfileInfo onLogout={onLogout} />
                        </div>
                    </>
                )}
            </div>

            {/* Modal zarządzania aktywnościami */}
            <Modal
                isOpen={isActivitiesModalOpen}
                onRequestClose={closeActivitiesModal}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                    content: {
                        width: "60%",
                        maxHeight: "80%",
                        margin: "auto",
                        padding: "20px",
                    },
                }}
                contentLabel="Manage Activities"
            >
                <ManageActivitiesModal onClose={closeActivitiesModal} />
            </Modal>
        </>
    );
};

AdminNavBar.propTypes = {
    onManageUsers: PropTypes.func.isRequired,
    onManagePasses: PropTypes.func,
    onManageAvailability: PropTypes.func,
    onManageRooms: PropTypes.func,
    onManageEvents: PropTypes.func,
};

export default AdminNavBar;

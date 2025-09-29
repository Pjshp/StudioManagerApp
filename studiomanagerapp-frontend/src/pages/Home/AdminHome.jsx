import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import AdminNavBar from "../../components/NavBar/AdminNavBar.jsx";
import ManageUsersModal from "../../components/Modals/Users/ManageUsersModal.jsx";
import ManagePassesModal from "../../components/Modals/Passes/ManagePassesModal.jsx";

Modal.setAppElement("#root");

const AdminHome = () => {
    const [openManageUsersModal, setOpenManageUsersModal] = useState({
        isShown: false,
    });

    const [openManagePassesModal, setOpenManagePassesModal] = useState({
        isShown: false,
    });

    const navigate = useNavigate();

    return (
        <>
            {/* 🔹 Pasek nawigacyjny admina */}
            <AdminNavBar
                onManageUsers={() => setOpenManageUsersModal({ isShown: true })}
                onManagePasses={() => setOpenManagePassesModal({ isShown: true })}
                onManageAvailability={() => console.log("Kliknięto: Dostępność kadry")}
                onManageActivities={() => console.log("Kliknięto: Aktywności")}
                onManageEvents={() => navigate("/admin/events")}
                onManageRooms={() => console.log("Kliknięto: Pomieszczenia")}
            />

            {/* 🔹 Modal zarządzania użytkownikami */}
            <Modal
                isOpen={openManageUsersModal.isShown}
                onRequestClose={() => setOpenManageUsersModal({ isShown: false })}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                    content: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "90%",
                        maxWidth: "600px",
                        minWidth: "300px",
                        maxHeight: "90vh",
                        margin: "auto",
                        padding: "20px",
                        borderRadius: "0.5rem",
                        overflow: "auto",
                    },
                }}
                contentLabel="Manage Users"
            >
                <ManageUsersModal
                    onClose={() => setOpenManageUsersModal({ isShown: false })}
                />
            </Modal>

            {/* 🔹 Modal zarządzania karnetami */}
            <Modal
                isOpen={openManagePassesModal.isShown}
                onRequestClose={() => setOpenManagePassesModal({ isShown: false })}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                    content: {
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        width: "90%",
                        maxWidth: "600px",
                        minWidth: "300px",
                        maxHeight: "90vh",
                        margin: "auto",
                        padding: "20px",
                        borderRadius: "0.5rem",
                        overflow: "auto",
                    },
                }}
                contentLabel="Manage Passes"
            >
                <ManagePassesModal
                    onClose={() => setOpenManagePassesModal({ isShown: false })}
                />
            </Modal>
        </>
    );
};

export default AdminHome;

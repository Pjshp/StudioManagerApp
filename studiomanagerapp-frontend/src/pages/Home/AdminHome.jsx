import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import AdminNavBar from "../../components/NavBar/AdminNavBar.jsx";
import ManageUsersModal from "../../components/Modals/Users/ManageUsersModal.jsx";
import ManagePassesModal from "../../components/Modals/Passes/ManagePassesModal.jsx";
import ManageActivitiesModal from "../../components/Modals/Activities/ManageActivitiesModal.jsx";
import ManageRoomsModal from "../../components/Modals/Rooms/ManageRoomsModal.jsx";

const AdminHome = () => {
    const [openManageUsersModal, setOpenManageUsersModal] = useState(false);
    const [openManagePassesModal, setOpenManagePassesModal] = useState(false);
    const [openManageActivitiesModal, setOpenManageActivitiesModal] = useState(false);
    const [openManageRoomsModal, setOpenManageRoomsModal] = useState(false);

    const navigate = useNavigate();

    const modalStyle = {
        overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        content: {
            width: "60%",
            maxHeight: "80%",
            margin: "auto",
            padding: "20px",
            borderRadius: "0.5rem",
            overflow: "auto",
        },
    };

    const renderModal = (Component, isOpen, setIsOpen, extraProps = {}) => (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => setIsOpen(false)}
            style={modalStyle}
        >
            <Component onClose={() => setIsOpen(false)} {...extraProps} />
        </Modal>
    );

    return (
        <>
            <AdminNavBar
                onManageUsers={() => setOpenManageUsersModal(true)}
                onManagePasses={() => setOpenManagePassesModal(true)}
                onManageAvailability={() => console.log("Kliknięto: Dostępność kadry")}
                onManageActivities={() => setOpenManageActivitiesModal(true)}
                onManageEvents={() => navigate("/admin/events")}
                onManageRooms={() => setOpenManageRoomsModal(true)}
            />

            {/* Renderowanie modalów */}
            {renderModal(ManageUsersModal, openManageUsersModal, setOpenManageUsersModal)}
            {renderModal(ManagePassesModal, openManagePassesModal, setOpenManagePassesModal)}
            {renderModal(ManageActivitiesModal, openManageActivitiesModal, setOpenManageActivitiesModal)}
            {renderModal(ManageRoomsModal, openManageRoomsModal, setOpenManageRoomsModal)}
        </>
    );
};

export default AdminHome;

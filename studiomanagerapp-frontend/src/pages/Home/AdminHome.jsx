import NavBar from "../../components/NavBar/NavBar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import AddEditMassageModal from "../../components/Modals/AddEditMassageModal.jsx";
import ManageUsersModal from "../../components/Modals/ManageUsersModal.jsx";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { request } from "../../components/Utils/axios_helper.jsx";
import dayjs from "dayjs";

Modal.setAppElement('#root');

const AdminHome = () => {
    const [massages, setMassages] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });
    const [openManageUsersModal, setOpenManageUsersModal] = useState({
        isShown: false,
    });

    useEffect(() => {
        fetchMassages();
    }, [sortOrder]);

    const fetchMassages = async () => {
        try {
            const response = await request("get", "api/massages");
            sortAndSetMassages(response.data, sortOrder);
        } catch (err) {
            console.error("Error fetching massages", err.response || err);
        }
    };

    const handleDeleteMassage = async (id) => {
        try {
            await request("delete", `api/massages/${id}`);
            setMassages((prevMassages) => prevMassages.filter((massage) => massage.id !== id));
        } catch (err) {
            console.error("Error deleting massage", err.response || err);
        }
    };

    const parseDate = (date) => {
        return dayjs(date).format("D MMMM YYYY, HH:mm");
    };

    const sortAndSetMassages = (massagesArray, order = "desc") => {
        const sortedMassages = massagesArray.sort((a, b) => {
            const dateA = dayjs(a.createdAt);
            const dateB = dayjs(b.createdAt);
            return order === "desc" ? dateB - dateA : dateA - dateB;
        });
        setMassages(sortedMassages);
    };

    const handleSortChange = () => {
        setSortOrder((prevOrder) => (prevOrder === "desc" ? "asc" : "desc"));
    };

    return (
        <>
            <NavBar
                onSearch={setMassages}
                onSortChange={handleSortChange}
                sortOrder={sortOrder}
                onManageReservations={() => {}} // Placeholder
                onManageUsers={() => setOpenManageUsersModal({ isShown: true })}
                onOpenAddEditModal={setOpenAddEditModal}
            />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-0">
                    {massages.map((massage) => (
                        <NoteCard
                            key={massage.id}
                            title={massage.name}
                            date={parseDate(massage.createdAt)}
                            content={massage.description}
                            mood={massage.type}
                            pinned={false}
                            onEdit={() => {
                                setOpenAddEditModal({
                                    isShown: true,
                                    type: "edit",
                                    data: massage,
                                });
                            }}
                            onDelete={() => handleDeleteMassage(massage.id)}
                        />
                    ))}
                </div>
            </div>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                }}
                contentLabel="Add/Edit Massage"
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditMassageModal
                    type={openAddEditModal.type}
                    massage={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                        fetchMassages();
                    }}
                />
            </Modal>

            <Modal
                isOpen={openManageUsersModal.isShown}
                onRequestClose={() => setOpenManageUsersModal({ isShown: false })}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                }}
                contentLabel="Manage Users"
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <ManageUsersModal
                    onClose={() => setOpenManageUsersModal({ isShown: false })}
                />
            </Modal>
        </>
    );
};

export default AdminHome;
import UserNavBar from "../../components/NavBar/UserNavBar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import AddEditMassageModal from "../../components/Modals/AddEditMassageModal.jsx";
import ManageUsersModal from "../../components/Modals/ManageUsersModal.jsx";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { request } from "../../components/Utils/axios_helper.jsx";
import dayjs from "dayjs";

Modal.setAppElement('#root');

const Home = () => {
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

    const parseDate = (date) => dayjs(date).format("D MMMM YYYY, HH:mm");

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

    // Przykładowe callbacki dla przycisków UserNavBar
    const handleOpenCalendar = () => {
        console.log("Otwórz Kalendarz zajęć");
    };
    const handleSendMessage = () => {
        console.log("Wyślij wiadomość");
    };
    const handleMyPasses = () => {
        console.log("Moje karnety");
    };
    const handleGiveFeedback = () => {
        console.log("Wystaw opinię");
    };

    return (
        <>
            <UserNavBar
                onOpenCalendar={handleOpenCalendar}
                onSendMessage={handleSendMessage}
                onMyPasses={handleMyPasses}
                onGiveFeedback={handleGiveFeedback}
            />
        </>
    );
};

export default Home;

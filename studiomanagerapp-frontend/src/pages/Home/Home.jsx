import NavBar from "../../components/NavBar/NavBar.jsx";
import NoteCard from "../../components/Cards/NoteCard.jsx";
import { MdAdd } from "react-icons/md";
import AddEditNotes from "../../components/AddEditNotes/AddEditNotes.jsx";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { request } from "../../components/Utils/axios_helper.jsx";

import dayjs from "dayjs";

Modal.setAppElement('#root')

const Home = () => {
    const [notes, setNotes] = useState([]);
    const [sortOrder, setSortOrder] = useState("desc");
    const [openAddEditModal, setOpenAddEditModal] = useState({
        isShown: false,
        type: "add",
        data: null,
    });

    useEffect(() => {
        fetchNotes();
    }, [sortOrder]); // Pobieramy notatki po zmianie sortowania

    const fetchNotes = async () => {
        try {
            const response = await request("get", "api/notes/user");
            sortAndSetNotes(response.data, sortOrder);
        } catch (err) {
            console.error("Błąd podczas pobierania notatek", err.response || err);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            await request("delete", `api/notes/${id}`);
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
        } catch (err) {
            console.error("Błąd podczas usuwania notatki", err.response || err);
        }
    };

    const handlePinNote = async (id, pinned) => {
        try {
            await request("put", `api/notes/${id}/pin?pinned=${pinned}`);

            // Pobieramy zaktualizowane notatki po zmianie przypięcia
            fetchNotes();
        } catch (err) {
            console.error("Błąd podczas przypinania notatki", err.response || err);
        }
    };

    const formatDate = (dateArray) => {
        if (!Array.isArray(dateArray) || dateArray.length < 6) return "Brak daty";
        return dayjs(new Date(dateArray[0], dateArray[1] - 1, dateArray[2], dateArray[3], dateArray[4], dateArray[5]))
            .format("D MMMM YYYY, HH:mm");
    };


    const parseDate = (date) => {
        if (Array.isArray(date) && date.length >= 6) {
            // Tworzymy obiekt Date na podstawie wartości w tablicy
            return new Date(date[0], date[1] - 1, date[2], date[3], date[4], date[5]);
        }
        return new Date(date); // Dla innych przypadków
    };


    const sortAndSetNotes = (notesArray, order = "desc") => {
        console.log("Przed sortowaniem:", notesArray.map(n => ({ id: n.id, date: n.noteDate })));

        const pinnedNotes = notesArray.filter(note => note.pinned);
        const unpinnedNotes = notesArray
            .filter(note => !note.pinned)
            .sort((a, b) => {
                const dateA = parseDate(a.noteDate);
                const dateB = parseDate(b.noteDate);
                return order === "desc" ? dateB - dateA : dateA - dateB;
            });

        console.log("Po sortowaniu:", unpinnedNotes.map(n => ({ id: n.id, date: n.noteDate })));

        setNotes([...pinnedNotes, ...unpinnedNotes]);
    };


    const handleSortChange = () => {
        setSortOrder(prevOrder => (prevOrder === "desc" ? "asc" : "desc"));
    };

    return (
        <>
            <NavBar onSearch={setNotes} onSortChange={handleSortChange} sortOrder={sortOrder} />
            <div className="container mx-auto">
                <div className="grid grid-cols-3 gap-4 mt-0">
                    {notes.map((note) => (
                        <NoteCard
                            key={note.id}
                            title={note.title}
                            date={formatDate(note.noteDate)}
                            content={note.content}
                            mood={note.mood}
                            pinned={note.pinned || false}
                            onEdit={() => {
                                setOpenAddEditModal({
                                    isShown: true,
                                    type: "edit",
                                    data: note,
                                });
                            }}
                            onDelete={() => handleDeleteNote(note.id)}
                            onPinNote={() => handlePinNote(note.id, !note.pinned)}
                        />
                    ))}
                </div>
            </div>

            <button
                className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 bottom-10"
                onClick={() => setOpenAddEditModal({
                    isShown: true,
                    type: "add",
                    data: null,
                })}
            >
                <MdAdd className="text-[32px] text-white" />
            </button>

            <Modal
                isOpen={openAddEditModal.isShown}
                onRequestClose={() => setOpenAddEditModal({ isShown: false, type: "add", data: null })}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" }
                }}
                contentLabel=""
                className="w-[40%] max-h-3/4 bg-white rounded-mg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddEditNotes
                    type={openAddEditModal.type}
                    note={openAddEditModal.data}
                    onClose={() => {
                        setOpenAddEditModal({ isShown: false, type: "add", data: null });
                    }}
                />
            </Modal>
        </>
    );
}

export default Home;

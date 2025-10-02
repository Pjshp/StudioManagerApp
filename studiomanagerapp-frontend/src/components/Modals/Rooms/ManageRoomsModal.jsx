import { useState, useEffect } from "react";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";
import Modal from "react-modal";
import AddRoomModal from "./AddRoomModal.jsx";
import EditRoomModal from "./EditRoomModal.jsx";

const ManageRoomsModal = ({ onClose }) => {
    const [rooms, setRooms] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [openAddRoomModal, setOpenAddRoomModal] = useState(false);
    const [editRoom, setEditRoom] = useState(null);

    const fetchRooms = async () => {
        try {
            const response = await request("get", "/api/rooms");
            setRooms(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Błąd podczas pobierania pokoi", err.response || err);
            setError("Nie udało się pobrać listy pokoi. Spróbuj ponownie.");
        }
    };

    useEffect(() => {
        fetchRooms();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (roomId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten pokój?")) return;
        try {
            await request("delete", `/api/rooms/${roomId}`);
            await fetchRooms();
        } catch (err) {
            console.error("Błąd podczas usuwania pokoju", err.response || err);
            setError("Nie udało się usunąć pokoju. Spróbuj ponownie.");
        }
    };

    const filteredRooms = rooms.filter(
        (room) =>
            room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            room.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Zamknięcie */}
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400" />
            </button>

            <h2 className="text-xl font-bold mb-4">Zarządzaj pokojami</h2>

            {/* Dodawanie pokoju */}
            <button
                className="btn-primary mb-4"
                onClick={() => setOpenAddRoomModal(true)}
            >
                Dodaj pokój
            </button>

            {/* Wyszukiwarka */}
            <div className="flex flex-col gap-2 mb-4">
                <label className="input-label">Szukaj po nazwie lub lokalizacji</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź nazwę lub lokalizację"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            {/* Tabela pokoi */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-100 text-left text-sm">
                        <th className="p-2 border-b">Nazwa</th>
                        <th className="p-2 border-b">Lokalizacja</th>
                        <th className="p-2 border-b">Typ pokoju</th>
                        <th className="p-2 border-b text-center">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredRooms.map((room) => (
                        <tr key={room.id} className="text-sm hover:bg-slate-50">
                            <td className="p-2 border-b">{room.name}</td>
                            <td className="p-2 border-b">{room.location}</td>
                            <td className="p-2 border-b">{room.roomType}</td>
                            <td className="p-2 border-b text-center flex justify-center gap-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => setEditRoom(room)}
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(room.id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Dodawania */}
            <Modal
                isOpen={openAddRoomModal}
                onRequestClose={() => setOpenAddRoomModal(false)}
                style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddRoomModal
                    onClose={() => setOpenAddRoomModal(false)}
                    onRoomAdded={fetchRooms}
                />
            </Modal>

            {/* Modal Edycji */}
            <Modal
                isOpen={!!editRoom}
                onRequestClose={() => setEditRoom(null)}
                style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                {editRoom && (
                    <EditRoomModal
                        roomData={editRoom}
                        onClose={() => setEditRoom(null)}
                        onRoomUpdated={fetchRooms}
                    />
                )}
            </Modal>
        </div>
    );
};

ManageRoomsModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManageRoomsModal;

import { useState, useEffect } from "react";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";
import dayjs from "dayjs";
import AddPassModal from "./AddPassModal.jsx";
import EditPassModal from "./EditPassesModal.jsx";
import Modal from "react-modal";

const ManagePassesModal = ({ onClose }) => {
    const [passes, setPasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [openAddPassModal, setOpenAddPassModal] = useState(false);
    const [editPass, setEditPass] = useState(null);

    // Pobieranie karnetów
    const fetchPasses = async () => {
        try {
            const response = await request("get", "/api/passes");
            setPasses(response.data);
        } catch (err) {
            console.error("Błąd podczas pobierania karnetów", err.response || err);
            setError("Nie udało się pobrać karnetów. Spróbuj ponownie.");
        }
    };

    useEffect(() => {
        fetchPasses();
    }, []);

    // Obsługa wyszukiwania
    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    // Usuwanie karnetu
    const handleDelete = async (passId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć ten karnet?")) return;

        try {
            await request("delete", `/api/passes/${passId}`);
            await fetchPasses();
        } catch (err) {
            console.error("Błąd podczas usuwania karnetu", err.response || err);
            setError("Nie udało się usunąć karnetu. Spróbuj ponownie.");
        }
    };

    // Filtrowanie karnetów
    const filteredPasses = passes.filter((pass) =>
        `${pass.user.firstName} ${pass.user.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
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

            <h2 className="text-xl font-bold mb-4">Zarządzaj karnetami</h2>

            {/* Dodawanie karnetu */}
            <button
                className="btn-primary mb-4"
                onClick={() => setOpenAddPassModal(true)}
            >
                Dodaj karnet
            </button>

            {/* Wyszukiwanie */}
            <div className="flex flex-col gap-2 mb-4">
                <label className="input-label">Szukaj po imieniu lub nazwisku</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź imię lub nazwisko"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            {/* Tabela */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-100 text-left text-sm">
                        <th className="p-2 border-b">Imię</th>
                        <th className="p-2 border-b">Nazwisko</th>
                        <th className="p-2 border-b">Rodzaj karnetu</th>
                        <th className="p-2 border-b">Pozostało</th>
                        <th className="p-2 border-b">Data kupna</th>
                        <th className="p-2 border-b">Data ważności</th>
                        <th className="p-2 border-b text-center">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredPasses.map((pass) => (
                        <tr key={pass.id} className="text-sm hover:bg-slate-50">
                            <td className="p-2 border-b">{pass.user.firstName}</td>
                            <td className="p-2 border-b">{pass.user.lastName}</td>
                            <td className="p-2 border-b">{pass.passType}</td>
                            <td className="p-2 border-b">{pass.classesLeft}</td>
                            <td className="p-2 border-b">
                                {dayjs(pass.purchaseDate).format("DD.MM.YYYY")}
                            </td>
                            <td className="p-2 border-b">
                                {dayjs(pass.expiryDate).format("DD.MM.YYYY")}
                            </td>
                            <td className="p-2 border-b text-center flex justify-center gap-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => setEditPass(pass)}
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(pass.id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Dodawania Karnetu */}
            <Modal
                isOpen={openAddPassModal}
                onRequestClose={() => setOpenAddPassModal(false)}
                style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddPassModal
                    onClose={() => setOpenAddPassModal(false)}
                    onPassAdded={fetchPasses}
                />
            </Modal>

            {/* Modal Edycji Karnetu */}
            <Modal
                isOpen={!!editPass}
                onRequestClose={() => setEditPass(null)}
                style={{ overlay: { backgroundColor: "rgba(0,0,0,0.2)" } }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                {editPass && (
                    <EditPassModal
                        passData={editPass}
                        onClose={() => setEditPass(null)}
                        onPassUpdated={fetchPasses}
                    />
                )}
            </Modal>
        </div>
    );
};

ManagePassesModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManagePassesModal;

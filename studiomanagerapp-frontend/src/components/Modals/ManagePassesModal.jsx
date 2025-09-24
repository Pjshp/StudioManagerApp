import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../Utils/axios_helper.jsx";
import dayjs from "dayjs";
import AddPassModal from "./AddPassModal.jsx";
import Modal from "react-modal";

const ManagePassesModal = ({ onClose }) => {
    const [passes, setPasses] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);
    const [openAddPassModal, setOpenAddPassModal] = useState(false);

    const fetchPasses = async () => {
        try {
            const response = await request("get", "api/passes");
            setPasses(response.data);
        } catch (err) {
            console.error("Błąd podczas pobierania karnetów", err.response || err);
            setError("Nie udało się pobrać karnetów. Spróbuj ponownie.");
        }
    };

    useEffect(() => {
        fetchPasses();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredPasses = passes.filter((pass) =>
        `${pass.user.firstName} ${pass.user.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400" />
            </button>

            <h2 className="text-xl font-bold mb-4">Zarządzaj karnetami</h2>

            {/* Przycisk Dodaj karnet */}
            <button
                className="btn-primary mb-4"
                onClick={() => setOpenAddPassModal(true)}
            >
                Dodaj karnet
            </button>

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
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal Dodawania Karnetu */}
            <Modal
                isOpen={openAddPassModal}
                onRequestClose={() => setOpenAddPassModal(false)}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddPassModal
                    onClose={() => setOpenAddPassModal(false)}
                    onPassAdded={fetchPasses}
                />
            </Modal>
        </div>
    );
};

ManagePassesModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManagePassesModal;

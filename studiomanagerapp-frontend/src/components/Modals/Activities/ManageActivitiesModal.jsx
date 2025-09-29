import { useState, useEffect } from "react";
import { MdClose, MdEdit, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";
import AddActivityModal from "./AddActivityModal.jsx";
import Modal from "react-modal";

const ManageActivitiesModal = ({ onClose }) => {
    const [activities, setActivities] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    const [openAddActivityModal, setOpenAddActivityModal] = useState(false);
    const [editActivity, setEditActivity] = useState(null);

    const fetchActivities = async () => {
        try {
            const response = await request("get", "api/activities");
            setActivities(response.data);
        } catch (err) {
            console.error(
                "Błąd podczas pobierania aktywności",
                err.response || err
            );
            setError("Nie udało się pobrać aktywności. Spróbuj ponownie.");
        }
    };

    useEffect(() => {
        fetchActivities();
    }, []);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = async (activityId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tę aktywność?")) return;

        try {
            await request("delete", `api/activities/${activityId}`);
            await fetchActivities();
        } catch (err) {
            console.error(
                "Błąd podczas usuwania aktywności",
                err.response || err
            );
            setError("Nie udało się usunąć aktywności. Spróbuj ponownie.");
        }
    };

    const filteredActivities = activities.filter((activity) =>
        activity.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            {/* Zamknięcie modala */}
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400" />
            </button>

            <h2 className="text-xl font-bold mb-4">Zarządzaj aktywnościami</h2>

            {/* Przycisk Dodaj aktywność */}
            <button
                className="btn-primary mb-4"
                onClick={() => setOpenAddActivityModal(true)}
            >
                Dodaj aktywność
            </button>

            {/* Pole wyszukiwania */}
            <div className="flex flex-col gap-2 mb-4">
                <label className="input-label">Szukaj po nazwie</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź nazwę aktywności"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            {/* Lista aktywności */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-100 text-left text-sm">
                        <th className="p-2 border-b">Nazwa</th>
                        <th className="p-2 border-b">Opis</th>
                        <th className="p-2 border-b">Limit uczestników</th>
                        <th className="p-2 border-b">Typ pokoju</th>
                        <th className="p-2 border-b text-center">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredActivities.map((activity) => (
                        <tr
                            key={activity.id}
                            className="text-sm hover:bg-slate-50"
                        >
                            <td className="p-2 border-b">{activity.name}</td>
                            <td className="p-2 border-b">{activity.description}</td>
                            <td className="p-2 border-b">{activity.participantLimit}</td>
                            <td className="p-2 border-b">{activity.roomType}</td>
                            <td className="p-2 border-b text-center flex justify-center gap-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => setEditActivity(activity)}
                                >
                                    <MdEdit size={20} />
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(activity.id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Modal dodawania / edycji aktywności */}
            <Modal
                isOpen={openAddActivityModal || !!editActivity}
                onRequestClose={() => {
                    setOpenAddActivityModal(false);
                    setEditActivity(null);
                }}
                style={{
                    overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                }}
                className="w-[40%] max-h-3/4 bg-white rounded-lg mx-auto mt-14 p-5 overflow-scroll"
            >
                <AddActivityModal
                    onClose={() => {
                        setOpenAddActivityModal(false);
                        setEditActivity(null);
                    }}
                    onActivityAdded={fetchActivities}
                    activityData={editActivity} // dane do edycji
                />
            </Modal>
        </div>
    );
};

ManageActivitiesModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManageActivitiesModal;

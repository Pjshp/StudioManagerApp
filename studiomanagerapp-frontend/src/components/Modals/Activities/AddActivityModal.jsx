import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";

const AddActivityModal = ({ onClose, onActivityAdded, activityData }) => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        participantLimit: "",
        roomType: "",
    });

    const [roomTypes, setRoomTypes] = useState([]);
    const [error, setError] = useState(null);

    // Pobierz enum RoomType z backendu
    useEffect(() => {
        const fetchRoomTypes = async () => {
            try {
                const res = await request("get", "/api/roomtypes"); // np. ["MASSAGE_ROOM","SPORT_ROOM"]
                setRoomTypes(res.data);
            } catch (err) {
                console.error("Błąd podczas pobierania typów pokoi", err.response || err);
                setRoomTypes(["MASSAGE_ROOM", "SPORT_ROOM"]); // fallback
            }
        };
        fetchRoomTypes();
    }, []);

    // Wczytaj dane aktywności przy edycji
    useEffect(() => {
        if (activityData) {
            setFormData({
                name: activityData.name || "",
                description: activityData.description || "",
                participantLimit: activityData.participantLimit || "",
                roomType: activityData.roomType || "",
            });
        }
    }, [activityData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.name || !formData.participantLimit || !formData.roomType) {
            setError("Wypełnij wszystkie wymagane pola.");
            return;
        }

        try {
            if (activityData) {
                await request("put", `/api/activities/${activityData.id}`, formData);
            } else {
                await request("post", "/api/activities", formData);
            }

            if (onActivityAdded) onActivityAdded();
            onClose();
        } catch (err) {
            console.error(
                "Błąd podczas zapisywania aktywności",
                err.response || err
            );
            setError("Nie udało się zapisać aktywności. Spróbuj ponownie.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">
                {activityData ? "Edytuj aktywność" : "Dodaj aktywność"}
            </h2>

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Nazwa */}
                <label className="block text-sm font-medium text-gray-700">
                    Nazwa aktywności *
                </label>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />

                {/* Opis */}
                <label className="block text-sm font-medium text-gray-700">Opis</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                />

                {/* Limit */}
                <label className="block text-sm font-medium text-gray-700">
                    Limit uczestników *
                </label>
                <input
                    type="number"
                    name="participantLimit"
                    value={formData.participantLimit}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    min="1"
                    required
                />

                {/* Typ pokoju */}
                <label className="block text-sm font-medium text-gray-700">
                    Typ pokoju *
                </label>
                <select
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="" disabled>
                        Wybierz typ pokoju
                    </option>
                    {roomTypes.map((type) => (
                        <option key={type} value={type}>
                            {type.replace("_", " ")}
                        </option>
                    ))}
                </select>

                {/* Przyciski */}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Anuluj
                    </button>
                    <button className="btn-primary">
                        {activityData ? "Zapisz" : "Dodaj"}
                    </button>
                </div>
            </form>
        </div>
    );
};

AddActivityModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onActivityAdded: PropTypes.func,
    activityData: PropTypes.object,
};

export default AddActivityModal;

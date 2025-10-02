import { useState } from "react";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";

const EditRoomModal = ({ roomData, onClose, onRoomUpdated }) => {
    const [name, setName] = useState(roomData.name || "");
    const [location, setLocation] = useState(roomData.location || "");
    const [roomType, setRoomType] = useState(roomData.roomType || "");
    const [error, setError] = useState(null);

    // 🔹 Te same enumy co w AddRoomModal
    const LOCATIONS = [
        { value: "WOJSKA_POLSKIEGO_23_BDG", label: "ul. Wojska Polskiego 23, Bydgoszcz" },
        { value: "DWORCOWA_15_BDG", label: "ul. Dworcowa 15, Bydgoszcz" }
    ];

    const ROOM_TYPES = [
        { value: "MASSAGE_ROOM", label: "Pokój masażu" },
        { value: "SPORT_ROOM", label: "Sala sportowa" }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await request("put", `api/rooms/${roomData.id}`, {
                name,
                location,  // np. "WOJSKA_POLSKIEGO_23_BDG"
                roomType,
            });
            onRoomUpdated();
            onClose();
        } catch (err) {
            setError("Nie udało się zaktualizować pokoju");
            console.error(err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Edytuj pokój</h2>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Nazwa */}
                <div>
                    <label className="input-label">Nazwa pokoju</label>
                    <input
                        type="text"
                        className="input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                {/* Lokalizacja */}
                <div>
                    <label className="input-label">Lokalizacja</label>
                    <select
                        className="input"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    >
                        <option value="">-- wybierz lokalizację --</option>
                        {LOCATIONS.map((loc) => (
                            <option key={loc.value} value={loc.value}>
                                {loc.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Typ pokoju */}
                <div>
                    <label className="input-label">Typ pokoju</label>
                    <select
                        className="input"
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        required
                    >
                        <option value="">-- wybierz typ --</option>
                        {ROOM_TYPES.map((rt) => (
                            <option key={rt.value} value={rt.value}>
                                {rt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Przyciski */}
                <div className="flex justify-end gap-2">
                    <button type="button" className="btn-secondary" onClick={onClose}>
                        Anuluj
                    </button>
                    <button type="submit" className="btn-primary">
                        Zapisz zmiany
                    </button>
                </div>
            </form>
        </div>
    );
};

EditRoomModal.propTypes = {
    roomData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string,
        location: PropTypes.string,
        roomType: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onRoomUpdated: PropTypes.func.isRequired,
};

export default EditRoomModal;

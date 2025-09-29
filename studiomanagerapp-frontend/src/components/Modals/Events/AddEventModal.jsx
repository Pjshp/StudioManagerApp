import { useState, useEffect } from "react";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";

const AddEventModal = ({ isOpen, onClose, onEventAdded }) => {
    const [formData, setFormData] = useState({
        eventDate: "",
        startTime: "",
        endTime: "",
        isLoud: false,
        activityId: "",
        roomId: "",
    });

    const [activities, setActivities] = useState([]);
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);

    // Pobierz dane potrzebne do formularza
    useEffect(() => {
        const fetchData = async () => {
            try {
                const activitiesRes = await request("get", "/api/activities");
                setActivities(Array.isArray(activitiesRes.data) ? activitiesRes.data : []);

                const roomsRes = await request("get", "/api/rooms");
                setRooms(Array.isArray(roomsRes.data) ? roomsRes.data : []);
            } catch (err) {
                console.error("Error fetching activities or rooms", err);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await request("post", "/api/events", {
                ...formData,
                activity: { id: formData.activityId },
                room: { id: formData.roomId },
            });

            if (onEventAdded) onEventAdded();
            onClose();
        } catch (err) {
            console.error("Error adding event", err.response || err);
            setError("Nie udało się dodać wydarzenia. Spróbuj ponownie.");
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            style={{
                overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
                content: {
                    width: "50%",
                    margin: "auto",
                    padding: "20px",
                },
            }}
            contentLabel="Add Event"
        >
            <h2 className="text-xl font-bold mb-4">Dodaj wydarzenie</h2>

            {error && <p className="text-red-500 mb-2">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Data wydarzenia */}
                <label>
                    Data wydarzenia:
                    <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </label>

                {/* Godzina rozpoczęcia */}
                <label>
                    Godzina rozpoczęcia:
                    <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </label>

                {/* Godzina zakończenia */}
                <label>
                    Godzina zakończenia:
                    <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    />
                </label>

                {/* Checkbox */}
                <label className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="isLoud"
                        checked={formData.isLoud}
                        onChange={handleChange}
                    />
                    Wydarzenie głośne
                </label>

                {/* Aktywność */}
                <label>
                    Aktywność:
                    <select
                        name="activityId"
                        value={formData.activityId}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="" disabled>
                            Wybierz aktywność
                        </option>
                        {activities.map((a) => (
                            <option key={a.id} value={a.id}>
                                {a.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Pomieszczenie */}
                <label>
                    Pomieszczenie:
                    <select
                        name="roomId"
                        value={formData.roomId}
                        onChange={handleChange}
                        required
                        className="w-full border p-2 rounded"
                    >
                        <option value="" disabled>
                            Wybierz pokój
                        </option>
                        {rooms.map((r) => (
                            <option key={r.id} value={r.id}>
                                {r.name}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Przyciski */}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Anuluj
                    </button>
                    <button type="submit" className="btn-primary">
                        Dodaj
                    </button>
                </div>
            </form>
        </Modal>
    );
};

AddEventModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onEventAdded: PropTypes.func,
};

export default AddEventModal;

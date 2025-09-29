import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";

const EditPassModal = ({ passData, onClose, onPassUpdated }) => {
    const [formData, setFormData] = useState({
        userId: "",
        passType: "",
        classesLeft: "",
        purchaseDate: "",
        expiryDate: "",
    });

    const [users, setUsers] = useState([]);
    const [passTypes, setPassTypes] = useState([]);

    // Załaduj dane początkowe do formularza
    useEffect(() => {
        if (passData) {
            setFormData({
                userId: passData.user?.id || "",
                passType: passData.passType || "",
                classesLeft: passData.classesLeft || "",
                purchaseDate: passData.purchaseDate || "",
                expiryDate: passData.expiryDate || "",
            });
        }
    }, [passData]);

    // Pobierz użytkowników
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await request("get", "/api/users");
                setUsers(res.data);
            } catch (err) {
                console.error("Error fetching users", err);
            }
        };

        fetchUsers();
    }, []);

    // Pobierz typy karnetów
    useEffect(() => {
        const fetchPassTypes = async () => {
            try {
                const res = await request("get", "/api/passtypes");
                setPassTypes(res.data);
            } catch (err) {
                console.error("Error fetching pass types", err);
            }
        };

        fetchPassTypes();
    }, []);

    // Obsługa zmian w formularzu
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({ ...prev, [name]: value }));

        // Jeśli wybieramy typ karnetu → ustaw liczbę wejść
        if (name === "passType") {
            const selectedType = passTypes.find((pt) => pt.name === value);
            if (selectedType) {
                setFormData((prev) => ({
                    ...prev,
                    passType: selectedType.name,
                    classesLeft: selectedType.numberOfClasses,
                }));
            }
        }

        // Jeśli ustawiamy datę rozpoczęcia → wylicz datę końcową
        if (name === "purchaseDate" && formData.passType) {
            const selectedType = passTypes.find((pt) => pt.name === formData.passType);
            if (selectedType) {
                const start = new Date(value);
                const end = new Date(start);
                end.setDate(start.getDate() + selectedType.validityInDays);

                setFormData((prev) => ({
                    ...prev,
                    purchaseDate: value,
                    expiryDate: end.toISOString().split("T")[0],
                }));
            }
        }
    };

    // Obsługa zapisu zmian
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await request("put", `/api/passes/${passData.id}`, formData);

            if (onPassUpdated) onPassUpdated(); // odśwież listę
            onClose(); // zamknij modal
        } catch (err) {
            console.error("Error updating pass", err.response || err);
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Edytuj karnet</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Użytkownik */}
                <label className="block text-sm font-medium text-gray-700">
                    Użytkownik
                </label>
                <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="" disabled>
                        Wybierz użytkownika
                    </option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName} ({user.email})
                        </option>
                    ))}
                </select>

                {/* Typ karnetu */}
                <label className="block text-sm font-medium text-gray-700">
                    Rodzaj karnetu
                </label>
                <select
                    name="passType"
                    value={formData.passType}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="" disabled>
                        Wybierz typ karnetu
                    </option>
                    {passTypes.map((pt) => (
                        <option key={pt.name} value={pt.name}>
                            {pt.name}
                        </option>
                    ))}
                </select>

                {/* Liczba wejść */}
                <label className="block text-sm font-medium text-gray-700">
                    Liczba wejść
                </label>
                <input
                    type="number"
                    name="classesLeft"
                    placeholder="Liczba wejść"
                    value={formData.classesLeft}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    readOnly
                />

                {/* Data rozpoczęcia */}
                <label className="block text-sm font-medium text-gray-700">
                    Data rozpoczęcia
                </label>
                <input
                    type="date"
                    name="purchaseDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />

                {/* Data ważności */}
                <label className="block text-sm font-medium text-gray-700">
                    Data ważności
                </label>
                <input
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />

                {/* Przyciski */}
                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Anuluj
                    </button>
                    <button className="btn-primary">Zapisz</button>
                </div>
            </form>
        </div>
    );
};

EditPassModal.propTypes = {
    passData: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onPassUpdated: PropTypes.func,
};

export default EditPassModal;

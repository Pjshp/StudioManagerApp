import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { request } from "../Utils/axios_helper.jsx";
import dayjs from "dayjs";

const AddPassModal = ({ onClose, onPassAdded }) => {
    const [formData, setFormData] = useState({
        userId: "",
        passType: "",
        classesLeft: "",
        purchaseDate: "",
        expiryDate: "",
    });

    const [users, setUsers] = useState([]);
    const [passTypes, setPassTypes] = useState([]);
    const [error, setError] = useState(null);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (name === "type") {
            const selectedType = passTypes.find((pt) => pt.name === value);
            if (selectedType) {
                setFormData((prev) => ({
                    ...prev,
                    passType: selectedType.name,
                    classesLeft: selectedType.numberOfClasses,
                }));
            }
        }

        if (name === "startDate" && formData.type) {
            const selectedType = passTypes.find((pt) => pt.name === formData.type);
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.passType || !formData.userId) {
            setError("Wybierz użytkownika i typ karnetu");
            return;
        }

        try {
            // Sprawdź istniejące karnety użytkownika
            const res = await request("get", `/api/passes?userId=${formData.userId}`);
            const activePass = res.data.find((pass) =>
                pass.classesLeft > 0 || dayjs(pass.expiryDate).isAfter(dayjs())
            );

            if (activePass) {
                setError(
                    "Użytkownik ma już aktywny karnet (pozostałe wejścia > 0 lub ważność nie minęła)"
                );
                return;
            }

            // Dodaj nowy karnet
            await request("post", "/api/passes", formData);
            if (onPassAdded) onPassAdded();
            onClose();
        } catch (err) {
            console.error("Error adding pass", err.response || err);
            setError("Nie udało się dodać karnetu. Spróbuj ponownie.");
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Dodaj karnet</h2>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Użytkownik</label>
                <select
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="" disabled>Wybierz użytkownika</option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.firstName} {user.lastName} ({user.email})
                        </option>
                    ))}
                </select>

                <label className="block text-sm font-medium text-gray-700">Rodzaj karnetu</label>
                <select
                    name="type"
                    value={formData.passType}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                >
                    <option value="" disabled>Wybierz typ karnetu</option>
                    {passTypes.map((pt) => (
                        <option key={pt.name} value={pt.name}>{pt.name}</option>
                    ))}
                </select>

                <label className="block text-sm font-medium text-gray-700">Liczba wejść</label>
                <input
                    type="number"
                    name="entries"
                    value={formData.classesLeft}
                    className="w-full border rounded p-2"
                    readOnly
                />

                <label className="block text-sm font-medium text-gray-700">Data rozpoczęcia</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.purchaseDate}
                    onChange={handleChange}
                    className="w-full border rounded p-2"
                    required
                />

                <label className="block text-sm font-medium text-gray-700">Data ważności</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.expiryDate}
                    className="w-full border rounded p-2"
                    readOnly
                />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Anuluj
                    </button>
                    <button className="btn-primary">Dodaj</button>
                </div>
            </form>
        </div>
    );
};

AddPassModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    onPassAdded: PropTypes.func,
};

export default AddPassModal;

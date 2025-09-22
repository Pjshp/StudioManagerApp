import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { request } from "../Utils/axios_helper.jsx";

const AddEditMassageModal = ({ type, massage, onClose }) => {
    const [price, setPrice] = useState("");
    const [duration, setDuration] = useState("");
    const [typeMassage, setTypeMassage] = useState("");
    const [workerId, setWorkerId] = useState("");
    const [workers, setWorkers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWorkers = async () => {
            try {
                const response = await request("get", "/api/users");
                const filteredWorkers = response.data.filter(
                    (user) => user.role === "MODERATOR" || user.role === "ADMIN"
                );
                setWorkers(filteredWorkers);
            } catch (err) {
                console.error("Błąd podczas pobierania pracowników", err.response || err);
            }
        };

        fetchWorkers();

        if (type === "edit" && massage) {
            setPrice(massage.price || "");
            setDuration(massage.duration || "");
            setTypeMassage(massage.type || "");
            setWorkerId(massage.workerId || "");
        }
    }, [type, massage]);

    const addNewMassage = async () => {
        try {
            await request("post", "/api/massages", {
                price,
                duration,
                type: typeMassage,
                workerId,
            });
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas dodawania masażu", err.response || err);
            setError("Nie udało się dodać masażu. Spróbuj ponownie.");
        }
    };

    const editMassage = async () => {
        try {
            await request("put", `/api/massages/${massage.id}`, {
                price,
                duration,
                type: typeMassage,
                workerId,
            });
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas edytowania masażu", err.response || err);
            setError("Nie udało się edytować masażu. Spróbuj ponownie.");
        }
    };

    const handleAddEditMassage = () => {
        if (!price || !duration || !typeMassage || !workerId) {
            setError("Wszystkie pola są wymagane!");
            return;
        }

        setError(null);

        if (type === "edit") {
            editMassage();
        } else {
            addNewMassage();
        }
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400" />
            </button>

            <h2 className="text-xl font-bold mb-4">{type === "edit" ? "Edytuj masaż" : "Dodaj masaż"}</h2>

            <div className="flex flex-col gap-2">
                <label className="input-label">Cena</label>
                <input
                    type="number"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź cenę"
                    value={price}
                    onChange={({ target }) => setPrice(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Czas trwania (minuty)</label>
                <input
                    type="number"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź czas trwania"
                    value={duration}
                    onChange={({ target }) => setDuration(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Typ</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź typ masażu"
                    value={typeMassage}
                    onChange={({ target }) => setTypeMassage(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Osoba wykonująca</label>
                <select
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    value={workerId}
                    onChange={({ target }) => setWorkerId(target.value)}
                >
                    <option value="" disabled>
                        Wybierz pracownika
                    </option>
                    {workers.map((worker) => (
                        <option key={worker.id} value={worker.id}>
                            {worker.firstName} {worker.lastName}
                        </option>
                    ))}
                </select>
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddEditMassage}
            >
                {type === "edit" ? "EDYTUJ" : "DODAJ"}
            </button>
        </div>
    );
};

export default AddEditMassageModal;
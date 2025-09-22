import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../Utils/axios_helper.jsx";

const ManageUsersModal = ({ onClose }) => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await request("get", "api/users");
            setUsers(response.data);
        } catch (err) {
            console.error("Błąd podczas pobierania użytkowników", err.response || err);
            setError("Nie udało się pobrać użytkowników. Spróbuj ponownie.");
        }
    };

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleRoleChange = async (userId, newRole) => {
        // Map dropdown values to enum values
        const roleMapping = {
            user: "USER",
            mod: "MODERATOR",
            admin: "ADMIN",
        };

        const mappedRole = roleMapping[newRole];

        if (!mappedRole) {
            setError("Nieprawidłowa rola wybrana.");
            return;
        }

        try {
            await request("put", `api/users/${userId}/role`, mappedRole); // Send mappedRole to the backend
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: mappedRole } : user
                )
            );
        } catch (err) {
            console.error("Błąd podczas aktualizacji roli użytkownika", err.response?.data || err.message);
            setError("Nie udało się zaktualizować roli użytkownika. Spróbuj ponownie.");
        }
    };

    const filteredUsers = users.filter((user) =>
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400" />
            </button>

            <h2 className="text-xl font-bold mb-4">Zarządzaj użytkownikami</h2>

            <div className="flex flex-col gap-2">
                <label className="input-label">Szukaj po email</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź email"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            <div className="flex flex-col gap-2 mt-4">
                {filteredUsers.map((user) => (
                    <div
                        key={user.id}
                        className="flex justify-between items-center p-2 border-b"
                    >
                        <div>
                            <p className="text-sm font-medium">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                        </div>
                        <select
                            className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                            onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            defaultValue="" // Set default value to an empty string
                        >
                            <option value="" disabled>
                                Wybierz rolę
                            </option>
                            <option value="user">User</option>
                            <option value="mod">Moderator</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                ))}
            </div>
        </div>
    );
};

ManageUsersModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManageUsersModal;
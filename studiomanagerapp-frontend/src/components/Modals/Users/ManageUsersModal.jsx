import { useState, useEffect } from "react";
import { MdClose, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import { request } from "../../Utils/axios_helper.jsx";

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
            await request("put", `api/users/${userId}/role`, mappedRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, role: mappedRole } : user
                )
            );
        } catch (err) {
            console.error(
                "Błąd podczas aktualizacji roli użytkownika",
                err.response?.data || err.message
            );
            setError("Nie udało się zaktualizować roli użytkownika. Spróbuj ponownie.");
        }
    };

    const handleDelete = async (userId) => {
        if (!window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) return;

        try {
            await request("delete", `api/users/${userId}`);
            setUsers((prevUsers) => prevUsers.filter((u) => u.id !== userId));
        } catch (err) {
            console.error(
                "Błąd podczas usuwania użytkownika",
                err.response?.data || err.message
            );
            setError("Nie udało się usunąć użytkownika. Spróbuj ponownie.");
        }
    };

    const filteredUsers = users.filter(
        (user) =>
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
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

            <h2 className="text-xl font-bold mb-4">Zarządzaj użytkownikami</h2>

            {/* Wyszukiwarka */}
            <div className="flex flex-col gap-2">
                <label className="input-label">Szukaj po email, imieniu lub nazwisku</label>
                <input
                    type="text"
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Wprowadź email, imię lub nazwisko"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>

            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            {/* Tabela użytkowników */}
            <div className="mt-4 overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                    <tr className="bg-slate-100 text-left text-sm">
                        <th className="p-2 border-b">ID</th>
                        <th className="p-2 border-b">Imię</th>
                        <th className="p-2 border-b">Nazwisko</th>
                        <th className="p-2 border-b">Email</th>
                        <th className="p-2 border-b">Telefon</th>
                        <th className="p-2 border-b">Data urodzenia</th>
                        <th className="p-2 border-b">Rola</th>
                        <th className="p-2 border-b text-center">Akcje</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id} className="text-sm hover:bg-slate-50">
                            <td className="p-2 border-b">{user.id}</td>
                            <td className="p-2 border-b">{user.firstName}</td>
                            <td className="p-2 border-b">{user.lastName}</td>
                            <td className="p-2 border-b">{user.email}</td>
                            <td className="p-2 border-b">{user.phoneNumber}</td>
                            <td className="p-2 border-b">{user.birthDate}</td>
                            <td className="p-2 border-b">
                                <select
                                    className="text-sm text-slate-800 outline-none bg-slate-50 p-1 rounded"
                                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    defaultValue=""
                                >
                                    <option value="" disabled>
                                        {user.role}
                                    </option>
                                    <option value="user">User</option>
                                    <option value="mod">Moderator</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </td>
                            <td className="p-2 border-b text-center">
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(user.id)}
                                >
                                    <MdDelete size={20} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

ManageUsersModal.propTypes = {
    onClose: PropTypes.func.isRequired,
};

export default ManageUsersModal;

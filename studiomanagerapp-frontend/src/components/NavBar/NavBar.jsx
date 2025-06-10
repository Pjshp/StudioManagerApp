import {useState} from 'react';
import ProfileInfo from '../Cards/ProfileInfo';
import {useNavigate} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar.jsx";
import {getAuthToken, request, setAuthToken, setUserData} from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";

const NavBar = ({ onSearch, onSortChange, sortOrder }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();
    const token = getAuthToken();

    const onLogout = () => {
        setAuthToken(null);
        setUserData(null);
        navigate('/login', { replace: true });
    };

    const handleSearch = async () => {
        try {
            const response = await request("get", `/api/notes/user/search?query=${searchQuery}`);
            const sortedNotes = response.data.sort((a, b) => b.pinned - a.pinned);

            onSearch(sortedNotes);

        } catch (err) {
            console.error("Błąd podczas wyszukiwania notatek", err.response || err);
        }
    };



    const onClearSearch = async () => {
        setSearchQuery(""); // Resetuj wartość pola wyszukiwania

        try {
            // Pobierz wszystkie notatki z backendu
            const response = await request("get", "/api/notes/user");

            // Posortuj notatki według pinned
            const sortedNotes = response.data.sort((a, b) => b.pinned - a.pinned);

            onSearch(sortedNotes); // Przekaż posortowane notatki do Home
        } catch (err) {
            console.error("Błąd podczas pobierania notatek", err.response || err);
        }
    };


    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Notes</h2>

            {token && (
                <>
                    <SearchBar
                        value={searchQuery}
                        onChange={({ target }) => {
                            setSearchQuery(target.value);
                        }}
                        handleSearch={handleSearch}
                        onClearSearch={onClearSearch}
                        sortOrder={sortOrder} // Przekaż stan sortowania
                        onSortChange={onSortChange} // Przekaż funkcję do zmiany sortowania
                    />

                    <ProfileInfo onLogout={onLogout}/>
                </>
            )}
        </div>
    );
};

NavBar.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
};
export default NavBar;

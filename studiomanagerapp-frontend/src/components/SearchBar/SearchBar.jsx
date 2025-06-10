import "react";
import { FaMagnifyingGlass} from "react-icons/fa6";
import PropTypes from "prop-types";
import {IoMdClose} from "react-icons/io";
import { MdArrowUpward, MdArrowDownward } from "react-icons/md";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch, sortOrder, onSortChange }) => {
    return (
        <div className="w-88 flex items-center px-4 bg-slate-100 rounded-md">
            <input
                type="text"
                placeholder={"Szukaj notatek"}
                className="w-full text-xs bg-transparent py-[11px] outline-none"
                value={value}
                onChange={onChange}
                />

            {value && (
                <IoMdClose
                    className="text-xl text-slate-500 cursor-pointer hover:text-black mr-3"
                    onClick={onClearSearch}
                />
            )}

            <FaMagnifyingGlass className="text-slate-400 cursor-pointer hover:text-black" onClick={handleSearch}/>

            {/* Przycisk sortowania */}
            {sortOrder === "desc" ? (
                <MdArrowDownward
                    className="text-xl text-slate-500 cursor-pointer hover:text-black"
                    onClick={onSortChange} // Po kliknięciu zmienia sortowanie
                />
            ) : (
                <MdArrowUpward
                    className="text-xl text-slate-500 cursor-pointer hover:text-black"
                    onClick={onSortChange} // Po kliknięciu zmienia sortowanie
                />
            )}

        </div>
    );
};

SearchBar.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    handleSearch: PropTypes.func.isRequired,
    onClearSearch: PropTypes.func.isRequired,
    sortOrder: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired,
};

export default SearchBar;
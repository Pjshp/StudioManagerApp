import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

const MassagesDropdown = ({ onOpenAddEditMassage, onManageReservations }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false); // Zamknij dropdown, jeśli kliknięto poza nim
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                className="btn-primary"
                onClick={() => setIsOpen((prev) => !prev)}
            >
                Masaże
            </button>
            {isOpen && (
                <div className="absolute bg-white shadow-md rounded mt-2 w-48">
                    <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={onOpenAddEditMassage}
                    >
                        Dodaj/edytuj masaż
                    </button>
                    <button
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={onManageReservations}
                    >
                        Zarządzaj rezerwacjami
                    </button>
                </div>
            )}
        </div>
    );
};

MassagesDropdown.propTypes = {
    onOpenAddEditMassage: PropTypes.func.isRequired,
    onManageReservations: PropTypes.func.isRequired,
};

export default MassagesDropdown;
import { MdDelete, MdOutlinePushPin } from "react-icons/md";
import PropTypes from "prop-types";

const NoteCard = ({ title, date, content, mood, pinned, onEdit, onDelete, onPinNote }) => {
    return (
        <div
            className="border rounded-lg p-4 bg-white hover:shadow-lg transition-all ease-in-out cursor-pointer"
            onClick={onEdit} // Kliknięcie na kartę uruchomi edycję
        >
            <div className="flex items-start justify-between">
                <div>
                    <h6 className="text-sm font-semibold">{title}</h6>
                    {date && (
                        <p className="text-[11px] text-gray-400 mt-0.5">{date}</p>
                    )}
                </div>

                <MdOutlinePushPin
                    className={`text-lg cursor-pointer transition-colors duration-200 ${pinned ? "text-blue-500" : "text-gray-300 hover:text-blue-500"}`}
                    onClick={(e) => {
                        e.stopPropagation(); // Zapobiega edycji po kliknięciu ikony
                        onPinNote();
                    }}
                />

            </div>

            <p className="text-xs text-gray-600 mt-2 line-clamp-3">{content}</p>

            <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                <span className="text-xs">Nastrój: {mood}</span>

                <MdDelete
                    className="text-lg cursor-pointer hover:text-red-600"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                />
            </div>
        </div>
    );
};

NoteCard.propTypes = {
    title: PropTypes.string.isRequired,
    date: PropTypes.string,
    content: PropTypes.string,
    mood: PropTypes.number,
    pinned: PropTypes.bool,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onPinNote: PropTypes.func,
};

export default NoteCard;

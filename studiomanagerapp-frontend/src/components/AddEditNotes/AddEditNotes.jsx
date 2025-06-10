import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { request } from "../Utils/axios_helper.jsx";
import MoodSelector from "./MoodSelector.jsx";

const AddEditNotes = ({ type, note, onClose }) => {
    const [title, setTitle] = useState("");  // Inicjalizacja wartości tytułu
    const [content, setContent] = useState("");  // Inicjalizacja wartości treści
    const [mood, setMood] = useState(5);  // Inicjalizacja wartości nastroju
    const [noteDate, setNoteDate] = useState("");  // Inicjalizacja daty
    const [error, setError] = useState(null);

    // Effect hook, który ustawia dane notatki, jeśli typ to "edit"
    useEffect(() => {
        if (type === "edit" && note) {
            setTitle(note.title || "");
            setContent(note.content || "");
            setMood(note.mood);
            setNoteDate(note.noteDate || "");
        }
    }, [type, note]);  // Uruchamia się, gdy zmienia się `type` lub `note`

    // Add Note
    const addNewNote = async () => {
        try {
            const currentDate = new Date(); // Pobiera lokalny czas
            const offsetDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
            await request("post", "api/notes", {
                title,
                content,
                mood,
                noteDate: offsetDate.toISOString() // Zapisuje jako UTC
            });
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas dodawania notatki", err.response || err);
            setError("Nie udało się dodać notatki. Spróbuj ponownie.");
        }
    };


    // Edit Note
    const editNote = async () => {
        try {
            await request("put", `api/notes/${note.id}`, { title, content, mood, noteDate });
            onClose();
            window.location.reload();
        } catch (err) {
            console.error("Błąd podczas edytowania notatki", err.response || err);
            setError("Nie udało się edytować notatki. Spróbuj ponownie.");
        }
    };

    // Handle submission
    const handleAddEditNote = () => {
        if (!title.trim()) {
            setError("Wprowadź tytuł notatki!");
            return;
        }

        if (!content.trim()) {
            setError("Wprowadź treść notatki!");
            return;
        }

        setError(null);

        if (type === "edit") {
            editNote();
        } else {
            addNewNote();
        }
    };

    const handleMoodChange = (newMood) => {
        setMood(newMood);
    };

    return (
        <div className="relative">
            <button
                className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
                onClick={onClose}
            >
                <MdClose className="text-2xl text-slate-400"/>
            </button>

            <div className="flex flex-col gap-2">
                <label className="input-label">Tytuł</label>
                <input
                    type="text"
                    className="text-2xl text-slate-850 outline-none"
                    placeholder="Wpisz tytuł..."
                    value={title}
                    onChange={({target}) => setTitle(target.value)}
                />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label className="input-label">Treść notatki</label>
                <textarea
                    className="text-sm text-slate-800 outline-none bg-slate-50 p-2 rounded"
                    placeholder="Zacznij pisać..."
                    rows={10}
                    value={content}
                    onChange={({target}) => setContent(target.value)}
                />
            </div>

            <div className="mt-3">
                <label className="input-label"></label>
                <MoodSelector
                    initialMood={mood}
                    onMoodChange={handleMoodChange}  // Przekazywanie zmienionego nastroju
                />
            </div>


            {error && <p className="text-red-500 text-sm pt-4">{error}</p>}

            <button
                className="btn-primary font-medium mt-5 p-3"
                onClick={handleAddEditNote}
            >
                {type === "edit" ? "EDYTUJ" : "DODAJ"}
            </button>
        </div>
    );
};

export default AddEditNotes;

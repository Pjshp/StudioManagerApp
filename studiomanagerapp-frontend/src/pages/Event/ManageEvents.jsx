import { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AdminNavBar from "../../components/NavBar/AdminNavBar";
import AddEventModal from "../../components/Modals/Events/AddEventModal.jsx";

const localizer = momentLocalizer(moment);

const ManageEvents = () => {
    const [date, setDate] = useState(new Date());
    const [isAddEventOpen, setIsAddEventOpen] = useState(false);

    const events = [
        { id: 1, title: "Trening personalny", start: new Date(2025,8,30,10,0), end: new Date(2025,8,30,11,0) },
        { id: 2, title: "Zajęcia grupowe", start: new Date(2025,8,28,18,0), end: new Date(2025,8,28,19,30) },
    ];

    const handlePrevWeek = () => setDate(moment(date).subtract(1, "week").toDate());
    const handleNextWeek = () => setDate(moment(date).add(1, "week").toDate());

    return (
        <div className="min-h-screen flex flex-col">
            <AdminNavBar onManageEvents={() => {}} /> {/* reszta propsów jak w AdminHome */}

            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Zarządzanie wydarzeniami</h1>

                <div className="flex gap-4 mb-4 justify-between">
                    {/* Dodaj wydarzenie po lewej */}
                    <button
                        onClick={() => setIsAddEventOpen(true)}
                        className="btn-primary"
                    >
                        Dodaj wydarzenie
                    </button>

                    {/* Przewijanie tygodnia po prawej */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrevWeek}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Poprzedni tydzień
                        </button>
                        <button
                            onClick={handleNextWeek}
                            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        >
                            Następny tydzień
                        </button>
                    </div>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="week"
                        views={["week"]}
                        date={date}
                        onNavigate={setDate}
                        style={{ height: 600 }}
                    />
                </div>
            </div>

            {/* Modal dodawania wydarzenia */}
            <AddEventModal
                isOpen={isAddEventOpen}
                onClose={() => setIsAddEventOpen(false)}
                onEventAdded={() => console.log("Nowe wydarzenie dodane!")}
            />
        </div>
    );
};

export default ManageEvents;

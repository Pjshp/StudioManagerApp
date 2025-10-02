import { useState, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import pl from "date-fns/locale/pl"; // 🇵🇱 polska lokalizacja
import "react-big-calendar/lib/css/react-big-calendar.css";

import AdminNavBar from "../../components/NavBar/AdminNavBar";
import AddEventModal from "../../components/Modals/Events/AddEventModal.jsx";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import ManageUsersModal from "../../components/Modals/Users/ManageUsersModal.jsx";
import ManagePassesModal from "../../components/Modals/Passes/ManagePassesModal.jsx";
import ManageActivitiesModal from "../../components/Modals/Activities/ManageActivitiesModal.jsx";
import ManageRoomsModal from "../../components/Modals/Rooms/ManageRoomsModal.jsx";

import PropTypes from "prop-types";
import { request } from "../../components/Utils/axios_helper.jsx";

// --- konfiguracja lokalizera date-fns ---
const locales = { pl };
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: (date) => startOfWeek(date, { weekStartsOn: 1 }), // poniedziałek
    getDay,
    locales,
});

const ManageEvents = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    const [openManageUsersModal, setOpenManageUsersModal] = useState(false);
    const [openManagePassesModal, setOpenManagePassesModal] = useState(false);
    const [openManageActivitiesModal, setOpenManageActivitiesModal] = useState(false);
    const [openManageRoomsModal, setOpenManageRoomsModal] = useState(false);
    const [openAddEventModal, setOpenAddEventModal] = useState(false);

    const navigate = useNavigate();

    // --- parsowanie daty/godziny (dostosowane do formatu z backendu) ---
    const parseLocalDate = (val) => {
        if (!val) return null;
        if (Array.isArray(val)) return { year: val[0], month: val[1], day: val[2] };
        if (typeof val === "string") {
            const [y, m, d] = val.split("-").map(Number);
            return { year: y, month: m, day: d };
        }
        if (typeof val === "object") {
            return { year: +val.year, month: +(val.month ?? val.monthValue), day: +(val.day ?? val.dayOfMonth) };
        }
        return null;
    };

    const parseLocalTime = (val) => {
        if (!val) return { hour: 0, minute: 0, second: 0 };
        if (Array.isArray(val)) return { hour: val[0] ?? 0, minute: val[1] ?? 0, second: val[2] ?? 0 };
        if (typeof val === "string") {
            const [h, m, s] = val.split(":").map(Number);
            return { hour: h ?? 0, minute: m ?? 0, second: s ?? 0 };
        }
        if (typeof val === "object") return { hour: +val.hour, minute: +val.minute, second: +val.second };
        return { hour: 0, minute: 0, second: 0 };
    };

    const buildDateFromParts = (dateVal, timeVal) => {
        const d = parseLocalDate(dateVal);
        if (!d) return null;
        const t = parseLocalTime(timeVal);
        return new Date(d.year, d.month - 1, d.day, t.hour, t.minute, t.second);
    };

    // --- pobieranie eventów z backendu i mapowanie na format react-big-calendar ---
    const fetchEvents = async () => {
        try {
            const res = await request("get", "/api/events");
            const data = Array.isArray(res.data) ? res.data : [];

            const mapped = data
                .map((ev) => {
                    const start = buildDateFromParts(ev.eventDate, ev.startTime);
                    const end = buildDateFromParts(ev.eventDate, ev.endTime);
                    if (!start || !end) return null;

                    return {
                        id: ev.id,
                        title: ev.activity?.name ?? ev.activityName ?? "Wydarzenie",
                        start,
                        end,
                        raw: ev,
                    };
                })
                .filter(Boolean);

            setEvents(mapped);
        } catch (err) {
            console.error("Błąd przy pobieraniu eventów:", err);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    // --- customowy kafelek eventu (godzina + nazwa) ---
    const CustomEvent = ({ event }) => (
        <div className="w-full h-full flex flex-col text-white px-2 py-1 rounded">
      <span className="text-sm font-semibold">
        {format(event.start, "HH:mm")} - {format(event.end, "HH:mm")}
      </span>
            <span className="text-sm">{event.title}</span>
        </div>
    );

    CustomEvent.propTypes = {
        event: PropTypes.shape({
            start: PropTypes.instanceOf(Date).isRequired,
            end: PropTypes.instanceOf(Date).isRequired,
            title: PropTypes.string.isRequired,
        }).isRequired,
    };

    // --- helper do renderowania modali ---
    const modalStyle = {
        overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
        content: {
            width: "60%",
            maxHeight: "80%",
            margin: "auto",
            padding: "20px",
            borderRadius: "0.5rem",
            overflow: "auto",
        },
    };

    const renderModal = (Component, isOpen, setIsOpen, extraProps = {}) => (
        <Modal isOpen={isOpen} onRequestClose={() => setIsOpen(false)} style={modalStyle}>
            <Component onClose={() => setIsOpen(false)} {...extraProps} />
        </Modal>
    );

    return (
        <div className="min-h-screen flex flex-col">
            <AdminNavBar
                onManageUsers={() => setOpenManageUsersModal(true)}
                onManagePasses={() => setOpenManagePassesModal(true)}
                onManageAvailability={() => console.log("Kliknięto: Dostępność kadry")}
                onManageActivities={() => setOpenManageActivitiesModal(true)}
                onManageEvents={() => navigate("/admin/events")}
                onManageRooms={() => setOpenManageRoomsModal(true)}
            />

            <div className="p-6 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Zarządzanie wydarzeniami</h1>

                <div className="flex mb-4">
                    <button onClick={() => setOpenAddEventModal(true)} className="btn-primary">
                        Dodaj wydarzenie
                    </button>
                </div>

                <div className="bg-white p-4 rounded shadow">
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        defaultView="week"
                        views={["week", "month", "day"]}
                        date={date}
                        onNavigate={setDate}
                        culture="pl"
                        style={{ height: 600 }}
                        components={{ event: CustomEvent }}
                        formats={{
                            timeGutterFormat: "HH:mm",
                            dayFormat: "EEE dd.MM", // np. "pon. 02.10"
                            weekdayFormat: "EEE",   // skróty dni: "pon."
                            monthHeaderFormat: "LLLL yyyy", // miesiąc: "październik 2025"
                            // ✅ poprawny header dla tygodnia
                            dayRangeHeaderFormat: ({ start, end }) =>
                                `${format(start, "dd MMMM", { locale: pl })} - ${format(end, "dd MMMM", { locale: pl })}`,
                            eventTimeRangeFormat: () => "", // nie pokazuj godzin poza CustomEvent
                        }}

                        messages={{
                            today: "Dziś",
                            previous: "Poprzedni",
                            next: "Następny",
                            month: "Miesiąc",
                            week: "Tydzień",
                            day: "Dzień",
                            agenda: "Agenda",
                        }}
                        min={new Date(1970, 0, 1, 6, 0)} // godzina 6:00
                        max={new Date(1970, 0, 1, 23, 59)} // godzina 24:00
                        eventPropGetter={() => ({
                            style: {
                                backgroundColor: "#2563eb",
                                borderRadius: "0.375rem",
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                            },
                        })}
                    />
                </div>
            </div>

            {/* Modale */}
            {renderModal(ManageUsersModal, openManageUsersModal, setOpenManageUsersModal)}
            {renderModal(ManagePassesModal, openManagePassesModal, setOpenManagePassesModal)}
            {renderModal(ManageActivitiesModal, openManageActivitiesModal, setOpenManageActivitiesModal)}
            {renderModal(AddEventModal, openAddEventModal, setOpenAddEventModal, {
                isOpen: openAddEventModal,
                onEventAdded: fetchEvents,
            })}
            {renderModal(ManageRoomsModal, openManageRoomsModal, setOpenManageRoomsModal)}
        </div>
    );
};

export default ManageEvents;

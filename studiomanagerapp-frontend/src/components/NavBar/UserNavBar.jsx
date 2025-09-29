import ProfileInfo from "../Cards/ProfileInfo";
import { useNavigate } from "react-router-dom";
import {getAuthToken, getUserData, setAuthToken, setUserData} from "../Utils/axios_helper.jsx";
import PropTypes from "prop-types";
import {useEffect, useState} from "react";

const UserNavBar = ({
                        onOpenCalendar,
                        onSendMessage,
                        onMyPasses,
                        onGiveFeedback,
                    }) => {
    const navigate = useNavigate();
    const token = getAuthToken();
    const [loggedUser, setUser] = useState(null);

    useEffect(() => {
        let loggedUser = getUserData();
        if (loggedUser?.data) { // jeśli zapisano { data: {...}, token: ... }
            loggedUser = loggedUser.data;
        }
        setUser(loggedUser);
    }, []);

    const onLogout = () => {
        setAuthToken(null);
        setUserData(null);
        navigate("/login", { replace: true });
    };

    return (
        <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow">
            <h2 className="text-xl font-medium text-black py-2">Tu i Teraz Studio</h2>

            {token && (
                <>
                    <div className="flex items-center gap-4">
                        <button className="btn-primary" onClick={onOpenCalendar}>
                            Kalendarz zajęć
                        </button>
                        <button className="btn-primary" onClick={onSendMessage}>
                            Wyślij wiadomość
                        </button>
                        <button className="btn-primary" onClick={onMyPasses}>
                            Moje karnety
                        </button>
                        <button className="btn-primary" onClick={onGiveFeedback}>
                            Wystaw opinię
                        </button>
                    </div>

                    <div className="flex flex-col items-end ml-4">
                        {loggedUser ? (
                            <p className="text-sm text-gray-500">
                                Zalogowany jako: {loggedUser.firstName || ""} {loggedUser.lastName || ""}
                            </p>
                        ) : (
                            <p className="text-sm text-gray-500">Brak zalogowanego użytkownika</p>
                        )}
                        <ProfileInfo onLogout={onLogout} />
                    </div>
                </>
            )}
        </div>
    );
};

UserNavBar.propTypes = {
    onOpenCalendar: PropTypes.func.isRequired,
    onSendMessage: PropTypes.func.isRequired,
    onMyPasses: PropTypes.func.isRequired,
    onGiveFeedback: PropTypes.func.isRequired,
};

export default UserNavBar;

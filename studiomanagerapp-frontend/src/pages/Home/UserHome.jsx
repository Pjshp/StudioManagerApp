import UserNavBar from "../../components/NavBar/UserNavBar.jsx";

const UserHome = () => {
    // Przykładowe callbacki dla przycisków UserNavBar
    const handleOpenCalendar = () => {
        console.log("Otwórz Kalendarz zajęć");
    };
    const handleSendMessage = () => {
        console.log("Wyślij wiadomość");
    };
    const handleMyPasses = () => {
        console.log("Moje karnety");
    };
    const handleGiveFeedback = () => {
        console.log("Wystaw opinię");
    };

    return (
        <UserNavBar
            onOpenCalendar={handleOpenCalendar}
            onSendMessage={handleSendMessage}
            onMyPasses={handleMyPasses}
            onGiveFeedback={handleGiveFeedback}
        />
    );
};

export default UserHome;

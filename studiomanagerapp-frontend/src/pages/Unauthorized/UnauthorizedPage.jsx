const UnauthorizedPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white p-10 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">Brak dostępu</h1>
                <p className="text-gray-600">
                    Nie masz uprawnień do przeglądania tej strony.
                </p>
            </div>
        </div>
    );
};

export default UnauthorizedPage;

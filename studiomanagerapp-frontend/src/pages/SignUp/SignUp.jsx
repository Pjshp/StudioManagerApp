import {useState} from "react";
import Navbar from "../../components/NavBar/AdminNavBar.jsx";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../components/Utils/helper.jsx";
import {request, setAuthToken, setUserData} from "../../components/Utils/axios_helper.jsx";

const SignUp = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        if (!firstName) {
            setError("Wprowadź swoje imię!");
            return;
        }

        if (!lastName) {
            setError("Wprowadź swoje nazwisko!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Wprowadź poprawny adres e-mail!");
            return;
        }

        if (!password) {
            setError("Wprowadź hasło!");
            return;
        }

        if (password.length < 8) {
            setError("Hasło musi mieć co najmniej 8 znaków!");
            return;
        }

        if (!phoneNumber) {
            setError("Wprowadź swój numer telefonu!");
            return;
        } else if (!/^\d{9}$/.test(phoneNumber)) {
            setError("Numer telefonu musi składać się z 9 cyfr!");
            return;
        }

        if (!birthDate) {
            setError("Wprowadź swoją datę urodzenia!");
            return;
        } else if (birthDate.length !== 5 || birthDate[2] !== '-') {
            setError("Data urodzenia musi być w formacie DD-MM!");
            return;
        }

        setError("");

        try {
            const response = await request('POST', '/register', { firstName, lastName, email, password, phoneNumber, birthDate});
            const { token, id, firstName: fName, lastName: lName, email: mail, role} = response.data;

            if (token) {
                setAuthToken(token);
                setUserData({ id, fName, lName, mail, role});

                // Redirect based on role
                if (role === "ADMIN") {
                    navigate('/admin/home');
                } else if (role === "USER") {
                    navigate('/user/home');
                } else {
                    navigate('/home'); // Default route
                }
            }
        } catch (err) {
            console.error("Błąd podczas rejestracji", err.response || err);
            setError("Rejestracja nie powiodła się. Spróbuj ponownie.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7">Stwórz konto</h4>

                        <input
                            type="text"
                            placeholder="Imię"
                            className="input-box"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Nazwisko"
                            className="input-box"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Adres e-mail"
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Numer telefonu"
                            className="input-box"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder="Data urodzin (DD-MM)"
                            className="input-box"
                            value={birthDate}
                            onChange={(e) => setBirthDate(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                        <button type="submit" className="btn-primary">
                            Stwórz konto
                        </button>

                        <p className="text-sm text-center mt-4">
                            Masz już konto?{" "}
                            <Link to="/login" className="font-medium text-primary underline">
                                Zaloguj się
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
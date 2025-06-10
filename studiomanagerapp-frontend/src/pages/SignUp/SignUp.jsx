import {useState} from "react";
import Navbar from "../../components/NavBar/NavBar.jsx";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import {validateEmail} from "../../components/Utils/helper.jsx";
import {request, setAuthToken, setUserData} from "../../components/Utils/axios_helper.jsx";

const SignUp = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const[error, setError] = useState(null);
    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (!username) {
            setError("Wprowadź nazwę użytkownika!");
            return;
        }

        if (!/^[a-zA-Z](?!.* {2})[a-zA-Z0-9_.\- ]{2,14}$/.test(username) || /^[a-zA-Z0-9_.\-]* $/.test(username)) {
            setError("Wprowadź poprawną nazwę użytkownika! Długość od 3 do 15 znaków, w tym cyfry oraz jednen ze znaków specjalnych: '.' '-' '_', pierwszy znak musi być literą, niedozwolone są dwie spacje pod rząd!");
            return;
        }

        if (!validateEmail(email)) {
            setError("Wprowadź poprawny adres email!");
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

        setError("")

        try {
            const response = await request('POST', '/register', { username, email, password });
            const { token, id, username:name, email:mail } = response.data;
            if(token) {
                setAuthToken(token);
                setUserData({ id, name, mail });
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Błąd podczas rejestracji",  err.response || err);
            setError("Nie udało się zarejestrować. Spróbuj ponownie.");
        }
    }

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleSignUp}>
                        <h4 className="text-2xl mb-7">Stwórz konto</h4>

                        <input
                            type="text"
                            placeholder={"Nazwa użytkownika"}
                            className="input-box"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <input
                            type="text"
                            placeholder={"Email"}
                            className="input-box"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                        <button type="submit" className={"btn-primary"}>
                            Utwórz konto
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
}

export default SignUp;
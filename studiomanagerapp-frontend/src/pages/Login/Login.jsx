import Navbar from '../../components/NavBar/AdminNavBar.jsx';
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import {useState} from "react";
import {request, setAuthToken, setUserData} from "../../components/Utils/axios_helper.jsx";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Wprowadź adres e-mail!");
            return;
        }

        if (!password) {
            setError("Wprowadź hasło!");
            return;
        }

        setError("");

        try {
            const response = await request('POST', '/login', { email, password });
            console.log("Otrzymano dane użytkownika:", response.data);
            const { token, id, firstName, lastName, role } = response.data;

            if (token) {
                setAuthToken(token);
                setUserData({ id, firstName, lastName, email, role });

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
            console.error("Błąd podczas logowania", err.response || err);
            setError("Logowanie nie powiodło się. Spróbuj ponownie.");
        }
    };

    return (
        <>
            <Navbar />

            <div className="flex items-center justify-center mt-28">
                <div className="w-96 border rounded bg-white px-7 py-10">
                    <form onSubmit={handleLogin}>
                        <h4 className="text-2xl mb-7">Zaloguj się</h4>

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

                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                        <button type="submit" className="btn-primary">
                            Zaloguj się
                        </button>

                        <p className="text-sm text-center mt-4">
                            Nie masz konta?{" "}
                            <Link to="/signup" className="font-medium text-primary underline">
                                Stwórz konto
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Login;
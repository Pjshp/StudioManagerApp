import Navbar from '../../components/Navbar/NavBar.jsx';
import {Link, useNavigate} from "react-router-dom";
import PasswordInput from "../../components/Input/PasswordInput.jsx";
import {useState} from "react";
import {request, setAuthToken, setUserData} from "../../components/Utils/axios_helper.jsx";

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username) {
            setError("Wprowadź nazwę użytkownika!");
            return;
        }

        if (!password) {
            setError("Wprowadź hasło!");
            return;
        }

        setError("")

        try {
            const response = await request('POST', '/login', { username, password });
            console.log("Received user data:", response.data);
            const { token, id, username:name, email } = response.data;

            if(token) {
                setAuthToken(token);
                setUserData({ id, name, email });
                navigate('/dashboard');
            }
        } catch (err) {
            console.error("Błąd podczas logowania",  err.response || err);
            setError("Nie udało się zalogować. Spróbuj ponownie.");
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
                            placeholder={"Nazwa użytkownika"}
                            className="input-box"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        <PasswordInput
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className="text-red-500 text-sm pb-1">{error}</p>}

                        <button type="submit" className={"btn-primary"}>
                            Zaloguj
                        </button>

                        <p className="text-sm text-center mt-4">
                            Nie posiadasz konta?{" "}
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
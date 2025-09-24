import { createContext, useContext, useState, useEffect } from "react";
import { getUserData } from "../Utils/axios_helper.jsx";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUserData());

    useEffect(() => {
        const storedUser = getUserData();
        setUser(storedUser);
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);

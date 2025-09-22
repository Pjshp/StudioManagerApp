import { useEffect, useState } from "react";
import {request} from "../../components/Utils/axios_helper.jsx";

const Massages = () => {
    const [massages, setMassages] = useState([]);

    useEffect(() => {
        const fetchMassages = async () => {
            try {
                const response = await request("get", "/api/massages");
                setMassages(response.data);
            } catch (err) {
                console.error("Błąd podczas pobierania masaży", err.response || err);
            }
        };

        fetchMassages();
    }, []);

    return (
        <div className="container mx-auto mt-4">
            <h1 className="text-2xl font-bold mb-4">Lista Masaży</h1>
            <ul className="list-disc pl-5">
                {massages.map((massage) => (
                    <li key={massage.id} className="mb-2">
                        <strong>{massage.name}</strong>: {massage.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Massages;
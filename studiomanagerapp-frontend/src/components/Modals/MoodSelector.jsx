import {useEffect, useState} from "react";
import PropTypes from "prop-types";

const MoodSelector = ({ initialMood, onMoodChange }) => {
    const [mood, setMood] = useState(initialMood);
    const maxMood = 10;
    const minMood = 0;

    useEffect(() => {
        setMood(initialMood);
    }, [initialMood]);

    const handleMoodChange = (e) => {
        const newMood = parseInt(e.target.value, 10);
        setMood(newMood);
        onMoodChange(newMood);
    };

    // Funkcja generująca styl dla buźki na podstawie nastroju
    const getFaceStyle = () => {
        const rotation = (mood - 5) * 8; // Obliczanie kąta obrotu (8° na każdą jednostkę zmiany, z 0° dla mood 5)
        return {
            transition: "transform 0.4s ease-in-out",
            transform: `scale(${1 + (mood - 5) * 0.01}) rotate(${rotation}deg)`, // Skalowanie i obrót
        };
    };

    // Funkcja do rysowania ust
    const getMouthPath = () => {
        if (mood > 5) {
            return `M30,60 Q50,${60 + (mood - 5) * 4} 70,60`; // Uśmiech - im wyższy mood, tym większy uśmiech
        } else {
            return `M30,60 Q50,${60 - (5 - mood) * 4} 70,60`; // Smutek - im niższy mood, tym bardziej smutne usta
        }
    };

    return (
        <div className="flex flex-col items-center">
            <svg
                className="w-24 h-24 mb-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 100 100"
                fill="none"
                style={getFaceStyle()} // Stosowanie animacji
            >
                {/* SVG buźki */}
                <circle cx="50" cy="50" r="40" stroke="#CDD2D4" strokeWidth="3" fill="white" />
                <circle cx="35" cy="40" r="5" fill="#CDD2D4" />
                <circle cx="65" cy="40" r="5" fill="#CDD2D4" />
                {/* Dynamika ust */}
                <path
                    d={getMouthPath()}  // Zmieniany kształt ust w zależności od moodu
                    stroke="#CDD2D4"
                    strokeWidth="2.5"
                    fill="transparent"
                />
            </svg>

            <input
                type="range"
                min={minMood}
                max={maxMood}
                value={mood}
                onChange={handleMoodChange}
                className="w-72 mt-2"
            />
            <div className="input-label">Mood: {mood}</div> {/* Wyświetlanie numeru nastroju */}
        </div>
    );
};

MoodSelector.propTypes = {
    initialMood: PropTypes.number,
    onMoodChange: PropTypes.func.isRequired,
};

export default MoodSelector;

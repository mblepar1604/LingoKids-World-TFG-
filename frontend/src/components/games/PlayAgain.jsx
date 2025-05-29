import React from "react";
import '../../styles/games/PlayAgain.css';

const PlayAgain = ({ onClick }) => {
    return (
        <button className="play-again-btn" onClick={onClick}>
            🔁 Volver a jugar
        </button>
    );
};

export default PlayAgain;
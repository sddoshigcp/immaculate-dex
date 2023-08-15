import React from "react";
import "./EndGame.css";

export const EndGame = ({guesses}) => {
    console.log("Guesses: ", JSON.stringify(guesses));
    console.log("Guesses 0: ", guesses[0]);
    console.log("Guesses 1: ", guesses[1]);
    console.log("Guesses 2: ", guesses[2]);

    let count = 0;
    for (let i = 0; i < guesses.length; i++) {
        if (guesses[i] === 2) {
            count++;
        }
    }

    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <div className="final-box">
            <p className="final-header">SUMMARY</p>
            <p className="final-text">CORRECT: {count}</p>
            <div className="final-grid">
                <div
                    className={
                        guesses[0] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[1] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[2] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[3] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[4] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[5] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[6] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[7] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
                <div
                    className={
                        guesses[8] === 0 ? "grid-box" : "grid-box correct"
                    }
                ></div>
            </div>
            <button onClick={refreshPage} className="play-again-button">
                Play Again
            </button>
        </div>
    );
};

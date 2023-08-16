import React from "react";
import "./StartGame.css";
import { FaRegCircleQuestion } from "react-icons/fa6";
import { VscChromeClose } from "react-icons/vsc";

export const StartGame = ({ close }) => {
    return (
            <div className="start-box">
            <VscChromeClose
                size={20}
                onClick={() => close()}
                className="close-button"
            />
            <p className="start-header">
                ABOUT<br></br>IMMACULATE DEX
            </p>
            <p className="start-text">
                Immaculate Grid is a randomly-generated pokemon trivia game
                based on <a>Immaculate Grid</a>.
            </p>
            <p className="start-header">
                HOW TO PLAY<br></br>IMMACULATE DEX
            </p>
            <p className="start-text">
                Select a pokemon for each cell that matches the criteria for that
                cell's row and column. <br></br><br></br>You have nine guesses to fill
                out the grid.
                <br></br><br></br>Each guess, whether correct or incorrect, counts as a
                guess. <br></br><br></br>
                Unlike the original Immaculate Grid, you can play Immaculate Dex
                as many times as you would like each day. <br></br>
            </p>
        </div>
        
    );
};

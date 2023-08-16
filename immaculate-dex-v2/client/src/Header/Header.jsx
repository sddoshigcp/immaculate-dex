import React, { useEffect, useState } from "react";
import "./Header.css";

import { FaRegCircleQuestion } from "react-icons/fa6";
export const Header = ({open}) => {
    return (
        <div className="header-immaculate">
            <img
                className="header-logo"
                src={"./immaculate-dex-grid-logo.png"}
                alt="immaculate logo"
            />
            <p className="header-text">IMMACULATE DEX</p>{" "}
            <p className="header-subtext">powered by PokeAPI</p>
            <FaRegCircleQuestion
                onClick={() => open()}
                size={25}
                className="header-icon"
            />
        </div>
    );
};

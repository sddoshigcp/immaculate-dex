import React, { useEffect, useState } from "react";
import "./Header.css";

export const Header = () => {

    // const [logo, setLogo] = useState("");
    
    // useEffect(() => {
    //   async function getLogo() {
    //     let sprite = "";
  
    //     try {
    //         const response = await fetch(
    //             "https://pokeapi.co/api/v2/item/poke-ball"
    //         );
    //         const data = await response.json();
    //         sprite = data.sprites.default;
    //     } catch (error) {
    //         console.error("Error fetching data:", error.message);
    //     }
  
    //     setLogo(sprite);
    //   };

    //   getLogo();
    // }, []);

    

    return (
        <div className="header-immaculate">
            <img
                className="header-logo"
                src={"./immaculate-dex-grid-logo.png"}
                alt="immaculate logo"
            />
            <p className="header-text">IMMACULATE DEX</p> <p className="header-subtext">powered by PokeAPI</p>
        </div>
    );
};

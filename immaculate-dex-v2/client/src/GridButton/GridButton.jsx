import React, { useState, useEffect } from 'react';
import "./GridButton.css";
import { getSprite } from '../Grid/Pokemon'; 


export const GridButton = ({ state, func, image, name }) => {  // Destructure props
  
  const [sprite, setSprite] = useState(null);

  useEffect(() => {
    if (name) {
      const fetchSprite = async () => {
        const spriteData = await getSprite(name);
        setSprite(spriteData);
      };
      fetchSprite();
    }
  }, [name]);
  
  return (
    <div
      className={
        state === 0 ? "grid-button-div"
        : state === 1 ? "grid-button-div selected"
        : state === 2 ? "grid-button-div completed"
        : "grid-button-div"
      }
      onClick={func}  // Pass the function reference without invoking it
    >
      <img className="grid-button-image" alt={name} src={sprite}></img>
      <p className="grid-button-text">{name.toUpperCase()}</p>
    </div>
  );
};

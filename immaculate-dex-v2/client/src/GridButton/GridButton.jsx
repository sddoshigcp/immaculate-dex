import React from 'react'
import "./GridButton.css";
import { getSprite } from '../Grid/Pokemon'; 

// export default function GridButton(state) {
//   return (
//     <div className={
//       state === 0 ? "grid-button-div"
//       : state === 1
//       ? "grid-button-div selected"
//       : "grid-button-div correct"}>
//         <img className="grid-button-image"></img>
//         <p className="grid-button-text"></p>
//     </div>
//   )
// }

export const GridButton = ({ state, func, image, name }) => {  // Destructure props
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
      <img className="grid-button-image" alt=""></img>
      <p className="grid-button-text"></p>
    </div>
  );
};

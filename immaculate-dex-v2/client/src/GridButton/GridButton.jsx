import React from 'react'
import "./GridButton.css";

export default function GridButton(state) {
  return (
    <div className={
      state === 0 ? "grid-button-div"
      : state === 1
      ? "grid-button-div selected"
      : "grid-button-div correct"}>
        <img className="grid-button-image"></img>
        <p className="grid-button-text"></p>
    </div>
  )
}

import React from "react";
import "../../styles/components/Input.scss";

export default function Input({ label, change, name }) {
  return (
    <div className="input-container">
      <label>
        {label}
        <input type="text" onChange={change} name={name}></input>
      </label>
    </div>
  );
}

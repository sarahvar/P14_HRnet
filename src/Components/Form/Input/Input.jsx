// src/components/Form/Input/Input.jsx
import React from "react";

const Input = ({ type, id, name, labelTitle, value, setInput }) => {
  return (
    <div className="input-group">
      <label htmlFor={id}>{labelTitle}</label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default Input;

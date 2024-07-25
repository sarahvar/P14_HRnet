import React from "react";

const Dropdown = ({ id, name, labelTitle, value, setDrop, datas }) => {
  return (
    <div className="dropdown-group">
      <label htmlFor={id}>{labelTitle}</label>
      <select id={id} name={name} value={value} onChange={(e) => setDrop(e.target.value)}>
        {datas.map((data) => (
          <option key={data.id} value={data.name}>
            {data.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;


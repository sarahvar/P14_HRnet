import React from "react";

const Dropdown = ({ id, name, labelTitle, value, setDrop, datas, placeholder }) => {
  return (
    <div className="dropdown-group">
      <label htmlFor={id}>{labelTitle}</label>
      <select id={id} name={name} value={value} onChange={(e) => setDrop(e.target.value)}>
        <option value="" disabled>
          {placeholder}
        </option>
        {datas.map((data) => (
          <option key={data.id} value={data.label}>
            {data.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;


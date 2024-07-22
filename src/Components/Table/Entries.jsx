import React from "react";
import PropTypes from "prop-types";

const Entries = ({ value, handleChange }) => {
  return (
    <div className="entries">
      <label htmlFor="entries">Show</label>
      <select id="entries" value={value} onChange={handleChange}>
        <option value="10">10</option>
        <option value="25">25</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
      <span>entries</span>
    </div>
  );
};

Entries.propTypes = {
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Entries;

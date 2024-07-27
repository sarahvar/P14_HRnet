import React from "react";
import PropTypes from "prop-types";
import "./Table.css";

const Table = ({ labels, data, minRows, maxRows, handleSort, sort }) => {
  return (
    <table className="table">
      <thead>
        <tr>
          {labels.map((label) => (
            <th key={label.value} onClick={() => handleSort(label.value)}>
              {label.text}
              {sort.column === label.value ? (sort.isDesc ? " 🔽" : " 🔼") : " ↕"}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {labels.map((label) => (
              <td key={label.value}>{row[label.value]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  labels: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  handleSort: PropTypes.func.isRequired,
  sort: PropTypes.shape({
    column: PropTypes.string.isRequired,
    isDesc: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Table;


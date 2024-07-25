import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Table.css";
import { normalizeText } from "../../utils/utils";
import Entries from "./Entries";
import Search from "./TableSearch";
import Table from "./Table";
import TableFooter from "./TableFooter";
import Pagination from "./Pagination";
import dataStates from "../../data/dataStates"; // Importer les états

// Créer un mappage pour les abréviations des états
const stateIndexMap = dataStates.reduce((acc, state, index) => {
  acc[state.label] = index;
  return acc;
}, {});

export default function MyTable({ labels, data }) {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  
  // Sort and Search
  const [sortedData, setSortedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState({ column: labels[0].value || "", isDesc: true });

  useEffect(() => {
    // Initial sorting of data
    const sorted = sorting(sort.column);
    setSortedData(sorted);
  }, [sort, data]);

  const minRows = currentPage === 1 ? 1 : (currentPage - 1) * postPerPage + 1;

  const maxRows =
    currentPage * postPerPage < data.length
      ? currentPage * postPerPage
      : data.length;

  const minFilteredShow =
    currentPage === 1
      ? sortedData.length > 0
        ? 1
        : 0
      : (currentPage - 1) * postPerPage + 1;

  const maxFilteredShow =
    currentPage * postPerPage < sortedData.length
      ? currentPage * postPerPage
      : sortedData.length;

  // Set how many entries to display
  const handleEntriesChange = (evt) => {
    setPostPerPage(parseInt(evt.target.value));
    setCurrentPage(1);
  };

  // Set sort descending or ascending
  const handleSort = (label) => {
    setSort((prevSort) => {
      const newSort = {
        column: label,
        isDesc: prevSort.column === label ? !prevSort.isDesc : false
      };
      const sorted = sorting(newSort.column, newSort.isDesc);
      setSortedData(sorted);
      return newSort;
    });
  };

  // Sort function
  const sorting = (label, isDesc = sort.isDesc) => {
    console.log(`Sorting by: ${label}, isDesc: ${isDesc}`); // Debugging log

    const sorted = [...data].sort((a, b) => {
      let valueA = a[label] !== undefined && a[label] !== null ? a[label] : "";
      let valueB = b[label] !== undefined && b[label] !== null ? b[label] : "";

      // Handle sorting by state using dataStates
      if (label === 'state') {
        const indexA = stateIndexMap[valueA] !== undefined ? stateIndexMap[valueA] : -1;
        const indexB = stateIndexMap[valueB] !== undefined ? stateIndexMap[valueB] : -1;
        
        // Handle the case where the state is not found in stateIndexMap
        if (indexA === -1) return isDesc ? 1 : -1;
        if (indexB === -1) return isDesc ? -1 : 1;

        return isDesc ? indexB - indexA : indexA - indexB;
      }

      // Handle sorting by date
      if (label === 'birthDate') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return isDesc ? dateB - dateA : dateA - dateB;
      }

      // Handle sorting by text (firstName, lastName)
      if (label === 'firstName' || label === 'lastName') {
        const textA = valueA.toLowerCase();
        const textB = valueB.toLowerCase();
        return isDesc ? (textA < textB ? 1 : textA > textB ? -1 : 0) : (textA < textB ? -1 : textA > textB ? 1 : 0);
      }

      // Standard sorting for other types of data
      if (isDesc) {
        return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
      } else {
        return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
      }
    });

    return sorted;
  };

  return (
    <div className="MyTable">
      <div className="table-utils">
        <Entries value={postPerPage} handleChange={handleEntriesChange} />
        <Search
          data={data}
          handleDisplayedData={setSortedData}
          handleIsSearching={setIsSearching}
        />
      </div>
      <Table
        labels={labels}
        data={sortedData}
        minRows={minRows}
        maxRows={maxRows}
        handleSort={handleSort}
        sort={sort}
        sortedData={sortedData}
      />
      <div className="table-footer">
        <TableFooter
          minRows={minRows}
          maxRows={maxRows}
          totalEntries={data.length}
          isSearching={isSearching}
          minFilteredShow={minFilteredShow}
          maxFilteredShow={maxFilteredShow}
          totalEntriesShow={sortedData.length}
        />
        <Pagination
          totalEntries={sortedData.length}
          displayedEntries={postPerPage}
          handleClick={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

MyTable.propTypes = {
  labels: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

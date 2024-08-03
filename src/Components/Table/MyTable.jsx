import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Table.css";
import Entries from "./Entries";
import Search from "./TableSearch";
import Table from "./Table";
import TableFooter from "./TableFooter";
import Pagination from "./Pagination";
import dataStates from "../../data/dataStates"; // Importer les états

const stateIndexMap = dataStates.reduce((acc, state, index) => {
  acc[state.label] = index;
  return acc;
}, {});

export default function MyTable({ labels, data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [sortedData, setSortedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState({ column: labels[0].value || "", isDesc: false });

  useEffect(() => {
    const sorted = sorting(sort.column, sort.isDesc);
    setSortedData(sorted);
  }, [sort, data]);

  const minRows = currentPage === 1 ? 1 : (currentPage - 1) * postPerPage + 1;
  const maxRows = currentPage * postPerPage < sortedData.length ? currentPage * postPerPage : sortedData.length;

  const handleEntriesChange = (evt) => {
    setPostPerPage(parseInt(evt.target.value));
    setCurrentPage(1);
  };

  const handleSort = (label) => {
    setSort((prevSort) => {
      const newSort = {
        column: label,
        isDesc: prevSort.column === label ? !prevSort.isDesc : false // Premier clic ascendant
      };
      const sorted = sorting(newSort.column, newSort.isDesc);
      setSortedData(sorted);
      return newSort;
    });
  };

  const sorting = (label, isDesc) => {
    const sorted = [...data].sort((a, b) => {
      let valueA = a[label] !== undefined && a[label] !== null ? a[label] : "";
      let valueB = b[label] !== undefined && b[label] !== null ? b[label] : "";

      if (label === 'state') {
        const indexA = stateIndexMap[valueA] !== undefined ? stateIndexMap[valueA] : -1;
        const indexB = stateIndexMap[valueB] !== undefined ? stateIndexMap[valueB] : -1;
        
        if (indexA === -1) return isDesc ? 1 : -1;
        if (indexB === -1) return isDesc ? -1 : 1;

        return isDesc ? indexB - indexA : indexA - indexB;
      }

      if (label === 'birthDate' || label === 'startDate') {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();
        return isDesc ? dateB - dateA : dateA - dateB;
      }

      if (label === 'street') {
        const extractNumber = (str) => {
          const match = str.match(/(\d+)/); // Cherche le premier nombre complet dans la chaîne
          return match ? parseInt(match[0], 10) : 0; // Retourne le nombre ou 0 si aucun nombre trouvé
        };
        const numA = extractNumber(valueA);
        const numB = extractNumber(valueB);
        return isDesc ? numB - numA : numA - numB;
      }

      if (label === 'firstName' || label === 'lastName') {
        const textA = valueA.toLowerCase();
        const textB = valueB.toLowerCase();
        return isDesc ? (textA < textB ? 1 : textA > textB ? -1 : 0) : (textA < textB ? -1 : textA > textB ? 1 : 0);
      }

      return isDesc ? (valueA > valueB ? -1 : 1) : (valueA > valueB ? 1 : -1);
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
        data={sortedData.slice(minRows - 1, maxRows)}
        minRows={minRows}
        maxRows={maxRows}
        handleSort={handleSort}
        sort={sort}
      />
      <div className="table-footer">
        <TableFooter
          minRows={minRows}
          maxRows={maxRows}
          totalEntries={data.length}
          isSearching={isSearching}
          minFilteredShow={minRows}
          maxFilteredShow={maxRows}
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

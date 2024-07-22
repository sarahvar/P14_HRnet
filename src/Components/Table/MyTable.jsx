import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Table.css";
import { normalizeText } from "../../utils/utils";
import Entries from "./Entries";
import Search from "./TableSearch";
import Table from "./Table";
import TableFooter from "./TableFooter";
import Pagination from "./Pagination";

export default function MyTable({ labels, data }) {
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  
  // Sort and Search
  const [sortedData, setSortedData] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [sort, setSort] = useState({ column: labels[0] || "", isDesc: true });

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
    const sorted = [...data].sort((a, b) => {
      const labelA = normalizeText(a[label]);
      const labelB = normalizeText(b[label]);

      if (isDesc) {
        return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
      } else {
        return labelA < labelB ? 1 : labelA > labelB ? -1 : 0;
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
  labels: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};

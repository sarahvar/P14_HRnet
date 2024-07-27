import React from "react";
import PropTypes from "prop-types";

const TableFooter = ({ minRows, maxRows, totalEntries, isSearching, minFilteredShow, maxFilteredShow, totalEntriesShow }) => {
  return (
    <div className="table-footer">
      {isSearching ? (
        <div>
          Showing {minFilteredShow} to {maxFilteredShow} of {totalEntriesShow} entries (filtered from {totalEntries} total entries)
        </div>
      ) : (
        <div>
          Showing {minRows} to {maxRows} of {totalEntries} entries
        </div>
      )}
    </div>
  );
};

TableFooter.propTypes = {
  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
  isSearching: PropTypes.bool.isRequired,
  minFilteredShow: PropTypes.number.isRequired,
  maxFilteredShow: PropTypes.number.isRequired,
  totalEntriesShow: PropTypes.number.isRequired,
};

export default TableFooter;


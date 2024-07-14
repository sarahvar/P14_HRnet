import React from "react";
import PropTypes from "prop-types";

export default function TableFooter({
  minRows,
  maxRows,
  totalEntries,
  isSearching,
  minFilteredShow,
  maxFilteredShow,
  totalEntriesShow,
}) {
  return (
    <div className="table-footer">
      {totalEntries === 0 ? (
        <p className="table-footer-p"></p>
      ) : (
        [
          isSearching ? (
            <span
              key="entries-filtered"
              className="table-footer-p"
            >{`Showing ${minFilteredShow} to ${maxFilteredShow} of ${totalEntriesShow} entries (filtered from ${totalEntries} total entries)`}</span>
          ) : (
            <span
              key="entries"
              className="table-footer-p"
            >{`Showing ${minRows} to ${maxRows} of ${totalEntries} entries`}</span>
          ),
        ]
      )}
    </div>
  );
}

TableFooter.propTypes = {
  minRows: PropTypes.number.isRequired,
  maxRows: PropTypes.number.isRequired,
  totalEntries: PropTypes.number.isRequired,
  minFilteredShow: PropTypes.number.isRequired,
  maxFilteredShow: PropTypes.number.isRequired,
  totalEntriesShow: PropTypes.number.isRequired,
  isSearching: PropTypes.bool,
};

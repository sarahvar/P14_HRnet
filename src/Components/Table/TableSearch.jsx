import React, { useState } from "react";
import PropTypes from "prop-types";
import { normalizeText } from "../../utils/utils";

const TableSearch = ({ data, handleDisplayedData, handleIsSearching }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 0) {
      handleIsSearching(true);
      const filteredData = data.filter((item) =>
        Object.values(item).some((value) =>
          normalizeText(value).includes(normalizeText(searchQuery))
        )
      );
      handleDisplayedData(filteredData);
    } else {
      handleIsSearching(false);
      handleDisplayedData(data);
    }
  };

  return (
    <div className="table-search">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search..."
      />
    </div>
  );
};

TableSearch.propTypes = {
  data: PropTypes.array.isRequired,
  handleDisplayedData: PropTypes.func.isRequired,
  handleIsSearching: PropTypes.func.isRequired,
};

export default TableSearch;

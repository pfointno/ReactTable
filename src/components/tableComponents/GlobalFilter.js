import React from "react";

function GlobalFilter({ filter, setFilter }) {
  return (
    <input
      value={filter || ""}
      onChange={(e) => setFilter(e.target.value)}
      className="form-control mb-3"
      type="search"
      placeholder="Search"
    />
  );
}

export default GlobalFilter;

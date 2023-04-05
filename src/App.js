import React from "react";
// import SimpleTable from "./components/SimpleTable";
// import SortingTable from "./components/SortingTable";
// import FilterTable from "./components/FilterTable";
import PaginatedTable from "./components/PaginatedTable";
// import RowSelection from "./components/RowSelection";
// import StickyTable from "./components/StickyTable";

// CSS
import "./styles.css";

export default function App() {
  return (
    <div className="container-fluid">
      <h1>React Table</h1>
      {/* <SimpleTable /> */}
      {/* <SortingTable /> */}
      {/* <FilterTable /> */}
      <PaginatedTable />
      {/* <RowSelection /> */}
      {/* <StickyTable /> */}
    </div>
  );
}

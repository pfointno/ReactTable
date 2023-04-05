import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
  useBlockLayout
} from "react-table";
import { useSticky } from "react-table-sticky";
import GlobalFilter from "./tableComponents/GlobalFilter";
import mockData from "./MOCK_DATA.json";
import formatNum from "../utils/FormatNum";
import { Styles } from "./tableComponents/TableStyles";
// Icons
import { FaSort } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

function StickyTable() {
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id", // accessor is the "key" in the data
        sticky: "left"
      },
      {
        Header: "First Name",
        accessor: "first_name" // accessor is the "key" in the data
      },
      {
        Header: "Last Name",
        accessor: "last_name"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Account Balance",
        accessor: "account_balance",
        Cell: ({ value }) => (
          <div style={{ textAlign: "right" }}>{formatNum(value)}</div>
        )
      }
    ],
    []
  );

  const data = useMemo(() => mockData, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    pageOptions,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter
  } = useTable(
    { columns, data },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useBlockLayout,
    useSticky
  );

  const { globalFilter, pageIndex } = state;

  return (
    <React.Fragment>
      <p>Sticky Table</p>
      <select
        onChange={(e) => setPageSize(Number(e.target.value))}
        className="form-select mb-3"
      >
        {[10, 15, 20].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
      <Styles>
        <div
          {...getTableProps()}
          className="table sticky"
          style={{ width: 600, height: 500 }}
        >
          <div className="header">
            {headerGroups.map((headerGroup) => (
              <div {...headerGroup.getHeaderGroupProps()} className="tr">
                {headerGroup.headers.map((column) => (
                  <div {...column.getHeaderProps()} className="th">
                    {column.render("Header")}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div {...getTableBodyProps()} className="body">
            {rows.map((row) => {
              prepareRow(row);
              return (
                <div {...row.getRowProps()} className="tr">
                  {row.cells.map((cell) => (
                    <div {...cell.getCellProps()} className="td">
                      {cell.render("Cell")}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </Styles>
    </React.Fragment>
  );
}

export default StickyTable;

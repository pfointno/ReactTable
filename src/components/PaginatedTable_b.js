import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination
} from "react-table";
import GlobalFilter from "./tableComponents/GlobalFilter";
import mockData from "./MOCK_DATA.json";
import formatNum from "../utils/FormatNum";
// Icons
import { FaSort } from "react-icons/fa";
import { FaSortUp } from "react-icons/fa";
import { FaSortDown } from "react-icons/fa";

function SimpleTable() {
  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "id" // accessor is the "key" in the data
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
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex } = state;

  return (
    <React.Fragment>
      <p>Paginated Table</p>
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
      <table
        className="table table-sm table-striped table-bordered table-hover"
        {...getTableProps()}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  style={{ textAlign: "center" }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  <span>
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaSortDown />
                      ) : (
                        <FaSortUp />
                      )
                    ) : (
                      <FaSort />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <span>
          Page {pageIndex + 1} of {pageOptions.length}
        </span>
        <nav>
          <ul className="pagination">
            <li
              className={!canPreviousPage ? "page-item disabled" : "page-item"}
            >
              <button onClick={() => gotoPage(0)} className="page-link">
                <span aria-hidden="true">&laquo;</span>
              </button>
            </li>
            <li
              className={!canPreviousPage ? "page-item disabled" : "page-item"}
            >
              <button onClick={() => previousPage()} className="page-link">
                Previous
              </button>
            </li>
            <li className={!canNextPage ? "page-item disabled" : "page-item"}>
              <button onClick={() => nextPage()} className="page-link">
                Next
              </button>
            </li>
            <li className={!canNextPage ? "page-item disabled" : "page-item"}>
              <button
                onClick={() => gotoPage(pageCount - 1)}
                className="page-link"
              >
                <span aria-hidden="true">&raquo;</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}

export default SimpleTable;

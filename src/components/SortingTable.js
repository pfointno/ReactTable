import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";
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
    rows,
    prepareRow
  } = useTable({ columns, data }, useSortBy);

  return (
    <React.Fragment>
      <p>Sorting Table</p>
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
          {rows.map((row) => {
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
    </React.Fragment>
  );
}

export default SimpleTable;

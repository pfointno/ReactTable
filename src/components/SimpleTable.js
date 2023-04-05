import React, { useMemo } from "react";
import { useTable } from "react-table";
import mockData from "./MOCK_DATA.json";

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
        accessor: "account_balance"
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
  } = useTable({ columns, data });

  return (
    <React.Fragment>
      <p>Simple Table</p>
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
                  {...column.getHeaderProps()}
                >
                  {column.render("Header")}
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

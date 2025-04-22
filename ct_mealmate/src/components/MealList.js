// MealList.js
// Displays a table of meals using React Table

import React from 'react';
import { useTable } from 'react-table';
import { Link } from 'react-router-dom';

function MealList({ meals, onDelete }) {
  const data = React.useMemo(() => meals, [meals]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Meal Name",
        accessor: "name",
      },
      {
        Header: "Meal Type",
        accessor: "type",
      },
      {
        Header: "Day",
        accessor: "day",
      },
      {
        Header: "Favorite",
        accessor: (row) => (row.favorite ? "Yes" : "No"),
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <div>
            <Link to={`/edit-meal/${row.original.id}`}>Edit</Link>
            {" | "}
            <button onClick={() => onDelete(row.original.id)}>
              Delete
            </button>
          </div>
        ),
      },
    ],
    [onDelete]
  );

  const tableInstance = useTable({ columns, data });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;

  return (
    <table {...getTableProps()} border="1" style={{ width: '100%', marginTop: '1rem' }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} style={{ backgroundColor: '#eee' }}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} style={{ padding: '0.5rem' }}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={5}>No meals found.</td>
          </tr>
        ) : (
          rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td {...cell.getCellProps()} style={{ padding: '0.5rem' }}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })
        )}
      </tbody>
    </table>
  );
}

export default MealList;

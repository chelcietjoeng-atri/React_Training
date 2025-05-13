// MealList.jsx
// Displays a table of meals using React Table

import React, { useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from '@tanstack/react-table';

// The MealList component receives a list of meal objects and renders them in a table
function MealList({ meals }) {
  // Memoize the data to prevent unnecessary re-renders when 'meals' prop doesn't change
  const data = useMemo(() => meals, [meals]);

  // Define table columns using useMemo for performance optimization
  const columns = useMemo(
    () => [
      {
        // Column for meal name
        header: 'Name',
        accessorKey: 'name',
      },
      {
        // Column for meal category (e.g., Breakfast, Lunch)
        header: 'Category',
        accessorKey: 'category',
      },
      {
        // Column for day of the week the meal is planned for
        header: 'Day',
        accessorKey: 'day',
      },
      {
        // Column for action buttons (Edit and Delete)
        header: 'Actions',
        id: 'actions', // Custom column ID for non-accessor column
        cell: ({ row }) => (
          // Render action buttons with handlers (currently using console logs)
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => console.log('Edit', row.original)}>✏️</button>
            <button onClick={() => console.log('Delete', row.original)}>🗑️</button>
          </div>
        ),
      },
    ],
    [] // Empty dependency array ensures this setup runs only once
  );

  // Create the table instance using the useReactTable hook from TanStack Table
  const table = useReactTable({
    data, // table data
    columns,  // column definitions
    getCoreRowModel: getCoreRowModel(), // core row logic (basic table functionality)
  });

  return (
    <table className="meal-table">
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default MealList;

// Summary:
// What: Displays a structured table of meals (name, category, and day) with Edit/Delete buttons.
// Why use React Table: It's a flexible, performant, headless table library that lets you define and control all aspects of the UI.
// Why use useMemo: Prevents unnecessary recalculations and re-renders for data and columns unless the inputs change.
// Why flexRender: Ensures headers and cells can be either plain text or custom JSX—useful for rendering buttons or formatting data.
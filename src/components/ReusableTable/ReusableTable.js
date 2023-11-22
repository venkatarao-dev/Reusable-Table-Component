import React, { useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel,
  TablePagination,
  TextField,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import "./ReusableTable.css";

const ReusableTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [selectedColumns, setSelectedColumns] = useState([
    "id",
    "name",
    "age",
    "email",
  ]); // Default selected columns
  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("");

  // Sample hardcoded data
  const data = [
    { id: 1, name: "Alice", age: 25, email: "alice@yahoo.com" },
    { id: 2, name: "Bob", age: 24, email: "bob@gmail.com" },
    { id: 3, name: "Charlie", age: 22, email: "charlie@yahoo.com" },
    { id: 4, name: "Venkat", age: 21, email: "venki@gmail.com" },
    { id: 5, name: "John", age: 30, email: "john@yahoo.com" },
    { id: 6, name: "Matt demon", age: 23, email: "matt@gmail.com" },
    { id: 7, name: "Radha", age: 27, email: "radha@yahoo.com" },
    { id: 8, name: "Rani", age: 26, email: "rani@gmail.com" },
    { id: 9, name: "Charlie", age: 28, email: "charlie@yahoo.com" },
    { id: 10, name: "Phani", age: 29, email: "phani@gmail.com" },
    { id: 11, name: "chris", age: 32, email: "chris@yahoo.com" },
    { id: 12, name: "Emma", age: 31, email: "Emma@gmail.com" },
    // we can Add more sample rows
  ];

  const columns = [
    { id: "id", label: "ID" },
    { id: "name", label: "Name" },
    { id: "age", label: "Age" },
    { id: "email", label: "Email" },
    //we can Add more columns as needed
  ];

  const handleSort = (columnId) => {
    const isAsc = orderBy === columnId && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(columnId);
  };

  const handleSearch = (searchQuery) => {
    setSearchText(searchQuery);
    setPage(0);
  };

  const handlePaginationChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnToggle = (columnId) => {
    const currentIndex = selectedColumns.indexOf(columnId);
    const newSelectedColumns = [...selectedColumns];

    if (currentIndex === -1) {
      newSelectedColumns.push(columnId);
    } else {
      newSelectedColumns.splice(currentIndex, 1);
    }

    setSelectedColumns(newSelectedColumns);
  };

  const filteredData = data.filter((row) =>
    Object.values(row).some((val) =>
      val.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const sortedData = filteredData.slice().sort((a, b) => {
    if (order === "asc") {
      return a[orderBy] > b[orderBy] ? -1 : 1;
    } else {
      return a[orderBy] < b[orderBy] ? -1 : 1;
    }
  });

  return (
    <div>
      <TextField
        className="search_field"
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <TableContainer className="reusable_table">
        <Table>
          <TableHead className="table-head">
            <TableRow>
              {columns.map(
                (column) =>
                  selectedColumns.includes(column.id) && (
                    <TableCell key={column.id}>
                      <TableSortLabel
                        active={orderBy === column.id} // Set according to sorting
                        direction={orderBy === column.id ? order : "asc"} // Set sorting direction
                        onClick={() => handleSort(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  )
              )}
              <TableCell>
                <FormControl>
                  <InputLabel>Select Columns</InputLabel>
                  <Select
                    multiple
                    value={selectedColumns}
                    onChange={(e) => setSelectedColumns(e.target.value)}
                    renderValue={(selected) => selected.join(", ")}
                  >
                    {columns.map((col) => (
                      <MenuItem key={col.id} value={col.id}>
                        <Checkbox
                          checked={selectedColumns.includes(col.id)}
                          onChange={() => handleColumnToggle(col.id)}
                        />
                        {col.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} className="table-row">
                  {columns.map(
                    (column) =>
                      selectedColumns.includes(column.id) && (
                        <TableCell key={column.id}>{row[column.id]}</TableCell>
                      )
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePaginationChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </div>
  );
};

export default ReusableTable;

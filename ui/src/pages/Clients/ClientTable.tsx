import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useClientContextValue } from "./ClientContext";
import React from "react";
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

interface ColumnData {
  dataKey: string;
  label: string;
}

export default function BasicTable() {
  const { state } = useClientContextValue()
  const { dataList, search = '' } = state!;

  const searchQuery = search.toLowerCase();
  const filteredList = dataList?.map(data => {
    data.fullName = `${data.firstName} ${data.lastName}`;
    return data
  }).filter(list =>
    list.firstName.toLowerCase().includes(searchQuery) ||
    list.lastName.toLowerCase().includes(searchQuery) ||
    list.fullName?.toLowerCase().includes(searchQuery)
  );

  const columns: ColumnData[] = [
    {
      label: 'Name',
      dataKey: 'name',
    },
    {
      label: 'Phone',
      dataKey: 'phoneNumber',
    },
    {
      label: 'Email',
      dataKey: 'email',
    },
  ]

  const VirtuosoTableComponents: TableComponents<IClient> = {
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed', minWidth: 400 }} aria-label="simple table" />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) =>
      <TableRow
        {...props}
        sx={{
          "&:last-child td, &:last-child th": { border: 0 },
          padding: 3,
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      />,
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  function fixedHeaderContent() {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            style={{ borderColor: '#e4e5e7' }}
            sx={{
              backgroundColor: 'background.paper',
            }}
          >
            <strong>{column.label}</strong>
          </TableCell>
        ))}
      </TableRow>
    );
  }

  function rowContent(_index: number, row: any) {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell key={column.dataKey} sx={{
            color: column.dataKey === 'name' ? 'blue' : 'black'
          }}>
            {column.dataKey === 'name' ? `${row['firstName']} ${row['lastName']}` : row[column.dataKey]}
          </TableCell>
        ))}
      </React.Fragment>
    );
  }

  return (
    <Paper style={{ height: 325, width: '100%' }}>
      <TableVirtuoso
        data={filteredList}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}

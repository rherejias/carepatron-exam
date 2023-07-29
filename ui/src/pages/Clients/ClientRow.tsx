import { TableCell, TableRow } from "@mui/material";

export interface IProps {
  client: IClient;
  onClick: () => void;
}

export default function ClientListItem({ client, onClick }: IProps) {
  const { id, firstName, lastName, email, phoneNumber } = client;

  return (
    <TableRow
      key={id}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
      onClick={onClick}
    >
      <TableCell component="th" scope="row">
        {firstName} {lastName}
      </TableCell>
      <TableCell>{phoneNumber}</TableCell>
      <TableCell>{email}</TableCell>
    </TableRow>
  );
}

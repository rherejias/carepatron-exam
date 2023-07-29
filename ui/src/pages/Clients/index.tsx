import { memo } from "react";
import { ToastContainer, } from 'react-toastify';
import { Paper, Typography } from "@mui/material";
import Page from "../../components/Page";
import ClientTable from "./ClientTable";
import ClientFilterForm from "./ClientFilterForm";
import ClientContext from "./ClientContext";
import 'react-toastify/dist/ReactToastify.css';

function Clients() {
  return (
    <Page>
      <ToastContainer />
      <ClientContext>
        <Typography variant="h4" fontWeight={300} sx={{ textAlign: "start", marginBottom: 3, fontWeight: 500 }}>
          Clients
        </Typography>
        <ClientFilterForm />
        <Paper sx={{ margin: "auto", marginTop: 2 }}>
          <ClientTable />
        </Paper>
      </ClientContext>
    </Page>
  );
}

export default memo(Clients);

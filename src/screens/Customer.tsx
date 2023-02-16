import React, { useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { DataGridTable } from "src/components";
import { AppLayout } from "src/layouts";
import { Chip } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 50,
    valueGetter: (params: GridValueGetterParams) => `${params?.row?.id ?? "-"}`,
  },
  {
    field: "first_name",
    headerName: "First Name",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.first_name ?? "-"}`,
  },
  {
    field: "last_name",
    headerName: "Last Name",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.last_name ?? "-"}`,
  },
  {
    field: "email",
    headerName: "Email",
    width: 250,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.email ?? "-"}`,
  },
  {
    field: "user_name",
    headerName: "Username",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.user_name ?? "-"}`,
  },
  {
    field: "is_active",
    headerName: "Active",
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.is_active ?? "-"}`,
    renderCell: (params: GridRenderCellParams) => {
      const status = params?.row?.is_active ?? false;
      return (
        <Chip
          label={status ? "Active" : "InActive"}
          variant="outlined"
          color={status ? "success" : "error"}
          size="small"
          icon={status ? <CheckCircle /> : <Cancel />}
        />
      );
    },
  },
  {
    field: "number_of_accounts",
    headerName: "Accounts",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.number_of_accounts ?? "-"}`,
  },
];

const rows = [
  {
    id: 1,
    first_name: "Abiraman",
    last_name: "K",
    email: "abiraman@gmail.com",
    user_name: "abiraman_k",
    type: "customer",
    is_active: true,
    address: null,
    mobile_number: null,
    number_of_accounts: 2,
    created_at: "2023-02-13T03:52:35.000Z",
    updated_at: "2023-02-13T11:33:47.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    first_name: "Abiraman",
    last_name: "KA",
    email: "abiramancit@gmail.com",
    user_name: "abiraman",
    type: "banker",
    is_active: true,
    address: null,
    mobile_number: null,
    number_of_accounts: null,
    created_at: "2023-02-13T03:53:55.000Z",
    updated_at: "2023-02-13T03:53:55.000Z",
    deleted_at: null,
  },
];

export interface ICustomerProps {}

export default function Customer(props: ICustomerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState();

  const getCustomers = async () => {};

  const handleOnRowClickEvent = () => {};

  return (
    <React.Fragment>
      <AppLayout drawerSelected="customers" title="Customers">
        <DataGridTable
          columns={columns}
          rows={rows}
          disableSelectionOnClick={true}
          newEditingApi={true}
          onRowClick={handleOnRowClickEvent}
          loading={loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20]}
          tableHeight={"85vh"}
        />
      </AppLayout>
    </React.Fragment>
  );
}

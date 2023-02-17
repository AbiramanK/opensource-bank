import React, { useEffect } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { DataGridTable } from "src/components";
import { AppLayout } from "src/layouts";
import { Chip } from "@mui/material";
import { Cancel, CheckCircle } from "@mui/icons-material";
import { useGetAllUsersQuery, UserModel } from "src/graphql-codegen/graphql";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
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

export interface ICustomerProps {}

export default function Customer(props: ICustomerProps) {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const { data, loading, error } = useGetAllUsersQuery();

  useEffect(() => {
    getCustomers();
  }, []);

  const getCustomers = async () => {};

  const handleOnRowClickEvent = (row: UserModel) => {
    navigate("/accounts", {
      state: {
        ...row,
      },
    });
  };

  if (error) {
    enqueueSnackbar(error?.message, { variant: "error" });
  }

  return (
    <React.Fragment>
      <AppLayout drawerSelected="customers" title="Customers">
        <DataGridTable
          columns={columns}
          rows={data?.get_all_users}
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

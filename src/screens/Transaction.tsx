import React, { useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { DataGridTable } from "src/components";
import { AppLayout } from "src/layouts";
import { Chip } from "@mui/material";
import {
  AccountBalance,
  AccountBalanceWallet,
  Cancel,
  CheckCircle,
  Paid,
  Pending,
} from "@mui/icons-material";
import moment from "moment";
import {
  AccountModel,
  TransactionModel,
  useGetTransactionsQuery,
} from "src/graphql-codegen/graphql";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useAuth } from "src/RootRouter";

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    width: 50,
    valueGetter: (params: GridValueGetterParams) => `${params?.row?.id ?? "-"}`,
  },
  {
    field: "customr",
    headerName: "Customer",
    width: 150,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.account?.user?.first_name ?? ""} ${
        params?.row?.account?.user?.last_name ?? ""
      }`,
  },
  {
    field: "accountNumber",
    headerName: "Account Number",
    width: 180,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.account?.account_number ?? "-"}`,
  },
  {
    field: "type",
    headerName: "Type",
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.type ?? "-"}`,
    renderCell: (params: GridRenderCellParams) => {
      const type = params?.row?.type ?? false;
      return (
        <Chip
          label={type}
          variant="outlined"
          color={type === "deposit" ? "success" : "error"}
          size="small"
          icon={type === "deposit" ? <Paid /> : <AccountBalanceWallet />}
        />
      );
    },
  },
  {
    field: "amount",
    headerName: "Amount",
    width: 100,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.amount ?? "-"}`,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
    valueGetter: (params: GridValueGetterParams) =>
      `${params?.row?.status ?? "-"}`,
    renderCell: (params: GridRenderCellParams) => {
      const status = params?.row?.status ?? false;
      return (
        <Chip
          label={status}
          variant="outlined"
          color={
            status === "success"
              ? "success"
              : status === "pending"
              ? "primary"
              : "error"
          }
          size="small"
          icon={
            status === "success" ? (
              <CheckCircle />
            ) : status === "pending" ? (
              <Pending />
            ) : (
              <Cancel />
            )
          }
        />
      );
    },
  },
  {
    field: "date",
    headerName: "Date",
    width: 200,
    valueGetter: (params: GridValueGetterParams) =>
      `${moment(params?.row?.created_at).format("lll") ?? "-"}`,
  },
];

export interface ITransactionProps {}

export default function Transaction(props: ITransactionProps) {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const client = useApolloClient();
  const auth = useAuth();

  const {
    id,
    account_number,
    daily_transaction_limit,
    status,
    user,
    created_at,
  } = location?.state as AccountModel;

  const { data, loading, error } = useGetTransactionsQuery({
    variables: {
      accountId: id,
    },
  });

  const handleOnRowClickEvent = (row: TransactionModel) => {};

  const logout = () => {
    client?.clearStore();
    auth?.logout(() => navigate("/login"));
  };

  const handleErrors = (message: string) => {
    if (message === "jwt expired" || "jwt must be provided") {
      enqueueSnackbar("User session has expired, Please login again.");

      logout();
    }
  };

  if (error) {
    handleErrors(error?.message);
    enqueueSnackbar(error?.message, { variant: "error" });
  }

  return (
    <React.Fragment>
      <AppLayout drawerSelected="transactions" title="Transactions">
        <DataGridTable
          columns={columns}
          rows={data?.get_transactions}
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

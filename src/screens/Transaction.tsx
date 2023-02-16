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

const rows = [
  {
    id: 1,
    account_id: 1,
    type: "deposit",
    amount: 1000,
    status: "success",
    created_at: "2023-02-13T05:49:27.000Z",
    updated_at: "2023-02-13T05:49:27.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 2,
    account_id: 1,
    type: "deposit",
    amount: 200,
    status: "pending",
    created_at: "2023-02-13T05:49:27.000Z",
    updated_at: "2023-02-13T05:49:27.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 3,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "cancelled",
    created_at: "2023-02-13T05:50:07.000Z",
    updated_at: "2023-02-13T05:50:07.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 4,
    account_id: 1,
    type: "withdraw",
    amount: 600,
    status: "success",
    created_at: "2023-02-13T05:50:07.000Z",
    updated_at: "2023-02-13T05:50:07.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 5,
    account_id: 1,
    type: "withdraw",
    amount: 900,
    status: "pending",
    created_at: "2023-02-13T06:13:28.000Z",
    updated_at: "2023-02-13T06:13:28.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 6,
    account_id: 1,
    type: "withdraw",
    amount: 100,
    status: "cancelled",
    created_at: "2023-02-13T11:01:26.000Z",
    updated_at: "2023-02-13T11:01:26.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 7,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:02:03.000Z",
    updated_at: "2023-02-13T11:02:03.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 8,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:02:05.000Z",
    updated_at: "2023-02-13T11:02:05.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 9,
    account_id: 1,
    type: "withdraw",
    amount: 200,
    status: "success",
    created_at: "2023-02-13T11:02:40.000Z",
    updated_at: "2023-02-13T11:02:40.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 10,
    account_id: 1,
    type: "withdraw",
    amount: 200,
    status: "success",
    created_at: "2023-02-13T11:02:47.000Z",
    updated_at: "2023-02-13T11:02:47.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 11,
    account_id: 1,
    type: "withdraw",
    amount: 20000,
    status: "cancelled",
    created_at: "2023-02-13T11:02:53.000Z",
    updated_at: "2023-02-13T11:02:53.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 12,
    account_id: 1,
    type: "withdraw",
    amount: 2000,
    status: "cancelled",
    created_at: "2023-02-13T11:03:00.000Z",
    updated_at: "2023-02-13T11:03:00.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 13,
    account_id: 1,
    type: "withdraw",
    amount: 200,
    status: "success",
    created_at: "2023-02-13T11:03:04.000Z",
    updated_at: "2023-02-13T11:03:04.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 14,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:23:37.000Z",
    updated_at: "2023-02-13T11:23:37.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 15,
    account_id: 1,
    type: "withdraw",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:24:12.000Z",
    updated_at: "2023-02-13T11:24:12.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 16,
    account_id: 1,
    type: "withdraw",
    amount: 300,
    status: "cancelled",
    created_at: "2023-02-13T11:24:20.000Z",
    updated_at: "2023-02-13T11:24:20.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 17,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:29:53.000Z",
    updated_at: "2023-02-13T11:29:53.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
  {
    id: 18,
    account_id: 1,
    type: "deposit",
    amount: 100,
    status: "success",
    created_at: "2023-02-13T11:32:07.000Z",
    updated_at: "2023-02-13T11:32:07.000Z",
    deleted_at: null,
    account: {
      account_number: "00000414613772455",
      user: {
        first_name: "Abiraman",
        last_name: "K",
      },
    },
  },
];

export interface ITransactionProps {}

export default function Transaction(props: ITransactionProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [transactions, setTransactions] = useState();

  const getTransactions = async () => {};

  const handleOnRowClickEvent = () => {};

  return (
    <React.Fragment>
      <AppLayout drawerSelected="transactions" title="Transactions">
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

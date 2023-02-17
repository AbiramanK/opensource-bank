import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import {
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  Cancel,
  CheckCircle,
  CurrencyRupee,
  PauseCircle,
} from "@mui/icons-material";

import { DataGridTable } from "src/components";
import { AppLayout } from "src/layouts";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import {
  AccountModel,
  useGetBankAccountsLazyQuery,
  UserModel,
  useUpdateBankAccountStatusMutation,
} from "src/graphql-codegen/graphql";
import { useAuth } from "src/RootRouter";
import { useApolloClient } from "@apollo/client";

export type AccountStatusTypes =
  | "pre-active"
  | "active"
  | "suspended"
  | "closed";

export interface AccountStatusChipOutput {
  color:
    | "default"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
  icon: React.ReactElement;
}

export const getChipColorAndIconBasedOnAccountStatus = (
  status: AccountStatusTypes
): AccountStatusChipOutput => {
  switch (status) {
    case "active":
      return {
        color: "success",
        icon: <CheckCircle />,
      };
      break;

    case "pre-active":
      return {
        color: "primary",
        icon: <CheckCircle />,
      };
      break;

    case "suspended":
      return {
        color: "info",
        icon: <PauseCircle />,
      };
      break;

    case "closed":
      return {
        color: "error",
        icon: <Cancel />,
      };
      break;

    default:
      return {
        color: "default",
        icon: <CheckCircle />,
      };
      break;
  }
};

export interface IAccountProps {}

export default function Account(props: IAccountProps) {
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      width: 50,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.id ?? "-"}`,
    },
    {
      field: "customer",
      headerName: "Customer",
      width: 150,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.user?.first_name ?? ""} ${
          params?.row?.user?.last_name ?? ""
        }`,
    },

    {
      field: "accountNumber",
      headerName: "Account Number",
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.accountNumber ?? "-"}`,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.status ?? "-"}`,
      renderCell: (params: GridRenderCellParams) => {
        const status = params?.row?.status;
        const result = getChipColorAndIconBasedOnAccountStatus(status);
        return (
          <Chip
            label={status?.toUpperCase()}
            variant="outlined"
            color={result?.color}
            size="small"
            icon={result?.icon}
          />
        );
      },
    },
    {
      field: "balance",
      headerName: "Balance",
      width: 100,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.balance ?? "0"}`,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <React.Fragment>
            <CurrencyRupee fontSize="small" />
            <Typography>{params?.row?.balance}</Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: "dailyTransactionLimit",
      headerName: "Daily Transaction Limit",
      width: 180,
      valueGetter: (params: GridValueGetterParams) =>
        `${params?.row?.dailyTransactionLimit ?? "0"}`,
      renderCell: (params: GridRenderCellParams) => {
        return (
          <React.Fragment>
            <CurrencyRupee fontSize="small" />
            <Typography>{params?.row?.dailyTransactionLimit}</Typography>
          </React.Fragment>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 150,
      renderCell: (params: GridRenderCellParams) => {
        const selected = params?.row?.status;

        const handleChange = async (event: SelectChangeEvent) => {
          updateAccountStatus(
            params?.row?.id,
            event?.target?.value as AccountStatusTypes
          );
        };

        return (
          <React.Fragment>
            <FormControl sx={{ m: 0, minWidth: 120 }} size="small">
              <InputLabel id="update-account-status-select-label">
                Status
              </InputLabel>
              <Select
                labelId="update-account-status-select-label"
                id="update-account-status-select"
                value={selected}
                label="Status"
                onChange={handleChange}
                defaultValue={selected}
                size="small"
              >
                <MenuItem disabled value={"pre-active"}>
                  pre-active
                </MenuItem>
                <MenuItem value={"active"}>active</MenuItem>
                <MenuItem value={"suspended"}>suspended</MenuItem>
                <MenuItem value={"closed"}>closed</MenuItem>
              </Select>
            </FormControl>
          </React.Fragment>
        );
      },
    },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();
  const client = useApolloClient();

  const routeState = location?.state as UserModel | null;

  const [getBankAccounts, { data, loading, error }] =
    useGetBankAccountsLazyQuery();

  const [updateBankAccountStatus, result] =
    useUpdateBankAccountStatusMutation();

  useEffect(() => {
    getCustomerAccounts();
  }, [result?.data]);

  const updateAccountStatus = async (
    account_id: number,
    status: AccountStatusTypes
  ) => {
    updateBankAccountStatus({
      variables: {
        input: {
          account_id,
          status,
        },
      },
    });
  };

  const getCustomerAccounts = async () => {
    var userId = undefined;

    if (auth?.user?.type === "banker") {
      userId = routeState?.id;
    }

    if (auth?.user?.type === "banker" && routeState === null) {
      return;
    }

    getBankAccounts({
      variables: {
        user_id: userId,
      },
    });
  };

  const handleOnRowClickEvent = (row: AccountModel) => {
    navigate("/transactions", {
      state: {
        ...row,
      },
    });
  };

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

  if (result?.error) {
    handleErrors(result?.error?.message);
    enqueueSnackbar(result?.error?.message, { variant: "error" });
  }

  return (
    <React.Fragment>
      <AppLayout drawerSelected="accounts" title="Accounts">
        <DataGridTable
          columns={columns}
          rows={data?.get_bank_accounts}
          disableSelectionOnClick={true}
          newEditingApi={true}
          onRowClick={handleOnRowClickEvent}
          loading={loading || result?.loading}
          pageSize={10}
          rowsPerPageOptions={[10, 20]}
          tableHeight={"85vh"}
        />
      </AppLayout>
    </React.Fragment>
  );
}

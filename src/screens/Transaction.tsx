import React, { useEffect, useState } from "react";
import {
  GridColDef,
  GridRenderCellParams,
  GridValueGetterParams,
} from "@mui/x-data-grid";

import { DataGridTable, SelectComponent } from "src/components";
import { AppLayout } from "src/layouts";
import { Chip, Grid, SelectChangeEvent } from "@mui/material";
import {
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
  useGetAllUsersLazyQuery,
  useGetBankAccountsLazyQuery,
  useGetTransactionsLazyQuery,
  UserModel,
  GetBankAccountOutput,
} from "src/graphql-codegen/graphql";
import { useSnackbar } from "notistack";
import { useLocation, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { useAuth } from "src/RootRouter";
import { SelectComponentOptionsInterface } from "src/components/SelectComponent";

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

  const routeState = location?.state as AccountModel;

  const [selectedCustomer, setSelectedCustomer] = useState<string>();
  const [customerSelectOptions, setCustomerSelectOptions] =
    useState<SelectComponentOptionsInterface[]>();

  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [accountSelectOptions, setAccountSelectOptions] =
    useState<SelectComponentOptionsInterface[]>();

  const [getTransactions, { data, loading, error }] =
    useGetTransactionsLazyQuery();

  const [getBankAccounts, bankAccounts] = useGetBankAccountsLazyQuery();

  const [getAllCustomers, customers] = useGetAllUsersLazyQuery();

  useEffect(() => {
    if (auth?.user?.type === "banker") {
      getAllCustomers();
    }

    if (routeState !== null) {
      if (auth?.user?.type === "banker") {
        setSelectedCustomer(routeState?.user_id?.toString());
        setSelectedAccount(routeState?.user_id?.toString());
      }
      getCustomerAccounts(routeState?.user_id);
      getAccountTransactions(routeState?.id!);
    }

    if (auth?.user?.type === "customer") {
      getCustomerAccounts(auth?.user?.id);
    }
  }, []);

  useEffect(() => {
    if (customers?.data) {
      const customerOptions = customers?.data?.get_all_users?.map(
        (user: UserModel, index: number): SelectComponentOptionsInterface => {
          return {
            id: user?.id?.toString(),
            label: `${user?.id} - ${user?.first_name} ${user?.last_name}`,
            disabled: false,
          };
        }
      );

      setCustomerSelectOptions(customerOptions);
    }
  }, [customers?.data]);

  useEffect(() => {
    if (bankAccounts?.data) {
      const accountOptions = bankAccounts?.data?.get_bank_accounts?.map(
        (account: GetBankAccountOutput, index: number) => {
          return {
            id: account?.id?.toString(),
            label: `${account?.id} - ${account?.accountNumber}`,
            disabled: false,
          };
        }
      );

      setAccountSelectOptions(accountOptions);
    } else {
      setAccountSelectOptions([]);
    }
  }, [bankAccounts?.data]);

  useEffect(() => {
    if (selectedCustomer) {
      getCustomerAccounts(parseInt(selectedCustomer!));
    }
  }, [selectedCustomer]);

  useEffect(() => {
    if (selectedAccount) {
      getAccountTransactions(parseInt(selectedAccount!));
    }
  }, [selectedAccount]);

  const handleOnRowClickEvent = (row: TransactionModel) => {};

  const logout = () => {
    client?.clearStore();
    auth?.logout(() => navigate("/login"));
  };

  const handleErrors = (message: string) => {
    if (message === "jwt expired" || message === "jwt must be provided") {
      enqueueSnackbar("User session has expired, Please login again.");

      logout();
    }
  };

  const handleCustomerSelectChange = (event: SelectChangeEvent) => {
    getCustomerAccounts(parseInt(event?.target?.value!));
  };

  const handleAccountSelectChange = (event: SelectChangeEvent) => {
    getAccountTransactions(parseInt(event?.target?.value!));
  };

  const getCustomerAccounts = (id?: number) => {
    var userId = null;

    if (auth?.user?.type === "banker" && !id) {
      userId = routeState?.id ?? null;
    } else {
      userId = id ?? null;
    }

    if (auth?.user?.type === "banker" && userId === null) {
      return;
    }

    setSelectedCustomer(userId?.toString());

    if (auth?.user?.type === "banker") {
      setSelectedAccount(undefined);
    }

    getBankAccounts({
      variables: {
        user_id: userId,
      },
    });
  };

  const getAccountTransactions = (id: number) => {
    setSelectedAccount(id?.toString());

    getTransactions({
      variables: {
        accountId: id,
      },
    });
  };

  if (error) {
    handleErrors(error?.message);
    // enqueueSnackbar(error?.message, { variant: "error" });
  }

  return (
    <React.Fragment>
      <AppLayout drawerSelected="transactions" title="Transactions">
        <Grid container sx={{ m: 2 }}>
          {auth?.user?.type === "banker" && (
            <Grid item xs={6}>
              <SelectComponent
                id="customer"
                label="Customer"
                options={customerSelectOptions}
                size="small"
                value={selectedCustomer}
                handleChange={handleCustomerSelectChange}
                minWidth={180}
              />
            </Grid>
          )}
          <Grid item xs={6}>
            <SelectComponent
              disabled={!selectedCustomer && auth?.user?.type === "banker"}
              id="account"
              label="Account"
              options={accountSelectOptions}
              size="small"
              value={selectedAccount}
              handleChange={handleAccountSelectChange}
              minWidth={180}
            />
          </Grid>
        </Grid>
        <DataGridTable
          columns={columns}
          rows={selectedAccount ? data?.get_transactions : []}
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

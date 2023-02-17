import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { AppLayout } from "src/layouts";
import { DashboardItem, SelectComponent } from "src/components";
import {
  AccountBalance,
  AccountBalanceWallet,
  AddCard,
  Group,
  Paid,
  ReceiptLong,
} from "@mui/icons-material";
import { IDashboardItemProps } from "src/components/DashboardItem";
import { useAuth } from "src/RootRouter";
import {
  GetBankAccountOutput,
  useCreateBankAccountMutation,
  useDeopsitMutation,
  useGetBankAccountsLazyQuery,
  useWithdrawMutation,
} from "src/graphql-codegen/graphql";
import { SelectComponentOptionsInterface } from "src/components/SelectComponent";
import { useApolloClient } from "@apollo/client";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const drawerWidth: number = 240;

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const auth = useAuth();
  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const baseList: IDashboardItemProps[] = [
    {
      id: "accounts",
      title: "Accounts",
      icon: <AccountBalance sx={{ fontSize: 80 }} />,
      link: "/accounts",
    },
    {
      id: "transactions",
      title: "Transactions",
      icon: <ReceiptLong sx={{ fontSize: 80 }} />,
      link: "/transactions",
    },
  ];

  const list: IDashboardItemProps[] =
    auth?.user?.type === "customer"
      ? [
          ...baseList,
          {
            id: "deposit",
            title: "Deposit",
            icon: <Paid sx={{ fontSize: 80 }} />,
            action: (id: string) => handleAction(id),
          },
          {
            id: "withdraw",
            title: "Withdraw",
            icon: <AccountBalanceWallet sx={{ fontSize: 80 }} />,
            action: (id: string) => handleAction(id),
          },
          {
            id: "create_bank_account",
            title: "Create Bank Account",
            icon: <AddCard sx={{ fontSize: 80 }} />,
            action: (id: string) => handleAction(id),
          },
        ]
      : [
          {
            id: "customers",
            title: "Customers",
            icon: <Group sx={{ fontSize: 80 }} />,
            link: "/customers",
          },
          ...baseList,
        ];

  const [getBankAccounts, accounts] = useGetBankAccountsLazyQuery();
  const [deposit, depositResult] = useDeopsitMutation();
  const [withdraw, withdrawResult] = useWithdrawMutation();
  const [createBankAccount, createdResult] = useCreateBankAccountMutation();

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [accountSelectOptions, setAccountSelectOptions] =
    useState<SelectComponentOptionsInterface[]>();
  const [selectedAccount, setSelectedAccount] = useState<string>();
  const [balance, setBalance] = useState<number>();
  const [amount, setAmount] = useState<number>();
  const [type, setType] = useState<"deposit" | "withdraw">();

  useEffect(() => {
    if (auth?.user?.type === "customer") {
      getCustomerAccounts(auth?.user?.id);
    }
  }, []);

  useEffect(() => {
    if (accounts?.data) {
      const options: SelectComponentOptionsInterface[] =
        accounts?.data?.get_bank_accounts?.map(
          (
            account: GetBankAccountOutput,
            index: number
          ): SelectComponentOptionsInterface => {
            return {
              id: account?.id?.toString(),
              label: `${account?.id} - ${account?.accountNumber}`,
              disabled: false,
            };
          }
        );

      setAccountSelectOptions(options);
    }
  }, [accounts?.data]);

  useEffect(() => {
    if (selectedAccount) {
      accounts?.data?.get_bank_accounts?.map(
        (account: GetBankAccountOutput, index: number) => {
          if (account?.id?.toString() === selectedAccount) {
            setBalance(account?.balance);
            return;
          }
        }
      );
    }
  }, [selectedAccount]);

  useEffect(() => {
    if (depositResult?.data) {
      enqueueSnackbar("Deposit success", { variant: "success" });
      getCustomerAccounts(auth?.user?.id!);
    }
  }, [depositResult?.data]);

  useEffect(() => {
    if (withdrawResult?.data) {
      enqueueSnackbar("Withdraw success", { variant: "success" });
      getCustomerAccounts(auth?.user?.id!);
    }
  }, [withdrawResult?.data]);

  useEffect(() => {
    if (createdResult?.data) {
      getCustomerAccounts(auth?.user?.id!);
    }
  }, [createdResult?.data]);

  const handleAction = (id: string) => {
    if (id === "deposit") {
      setType("deposit");
      setDialogOpen(true);
    }

    if (id === "withdraw") {
      setType("withdraw");
      setDialogOpen(true);
    }

    if (id === "create_bank_account") {
      createBankAccount();
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleAccountChange = (event: SelectChangeEvent) => {
    setSelectedAccount(event?.target?.value);
  };

  const getCustomerAccounts = (user_id: number) => {
    getBankAccounts({
      variables: {
        user_id,
      },
    });
  };

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

  const handleDialogAction = () => {
    if (selectedAccount && amount) {
      if (type === "deposit") {
        deposit({
          variables: {
            input: {
              accountId: parseInt(selectedAccount!),
              amount,
            },
          },
        });
      }

      if (type === "withdraw") {
        withdraw({
          variables: {
            input: {
              accountId: parseInt(selectedAccount!),
              amount,
            },
          },
        });
      }

      setSelectedAccount(undefined);
      setAmount(undefined);
      setBalance(undefined);
      setType(undefined);

      setDialogOpen(false);
    } else {
      enqueueSnackbar("Please fill all the required fields", {
        variant: "info",
      });
    }
  };

  if (accounts?.error) {
    handleErrors(accounts?.error?.message);
  }

  if (depositResult?.error) {
    handleErrors(depositResult?.error?.message);
    enqueueSnackbar(depositResult?.error?.message, { variant: "error" });
    depositResult?.reset();
  }

  if (withdrawResult?.error) {
    handleErrors(withdrawResult?.error?.message);
    enqueueSnackbar(withdrawResult?.error?.message, { variant: "error" });
    withdrawResult?.reset();
  }

  if (createdResult?.error) {
    handleErrors(createdResult?.error?.message);
    enqueueSnackbar(createdResult?.error?.message, { variant: "error" });
    createdResult?.reset();
  }

  if (createdResult?.data!) {
    enqueueSnackbar("Bank account created success", { variant: "success" });
    createdResult?.reset();
  }

  return (
    <React.Fragment>
      <AppLayout drawerSelected="dashboard" title="Dashboard">
        <Container
          sx={{
            p: 2,
          }}
        >
          <Grid container rowGap={10}>
            {list.map((item: IDashboardItemProps, index: number) => {
              return (
                <Grid item xs={4} key={index}>
                  <DashboardItem
                    key={index}
                    id={item?.id}
                    title={item?.title}
                    icon={item?.icon}
                    link={item?.link}
                    action={item?.action}
                  />
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Dialog open={dialogOpen} onClose={handleDialogClose} fullWidth={true}>
          <DialogTitle>{`${type?.charAt(0).toUpperCase()}${type?.slice(
            1
          )}`}</DialogTitle>
          <DialogContentText sx={{ pl: 3 }} variant="h6">
            Balance: {balance}
          </DialogContentText>
          <DialogContent>
            <SelectComponent
              required
              id="account"
              label="Account"
              size="small"
              value={selectedAccount}
              handleChange={handleAccountChange}
              options={accountSelectOptions}
              minWidth={300}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="amount"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              sx={{ mt: 3 }}
              onChange={(
                event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                setAmount(parseInt(event?.target?.value));
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleDialogAction}>{type!}</Button>
          </DialogActions>
        </Dialog>
      </AppLayout>
    </React.Fragment>
  );
}

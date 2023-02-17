import React, { useState } from "react";
import { Container, Grid } from "@mui/material";
import { AppLayout } from "src/layouts";
import { DashboardItem } from "src/components";
import {
  AccountBalance,
  AccountBalanceWallet,
  Group,
  Paid,
  ReceiptLong,
} from "@mui/icons-material";
import { IDashboardItemProps } from "src/components/DashboardItem";
import { IDrawerListItemProps } from "src/layouts/DrawerNav";
import { useAuth } from "src/RootRouter";

const drawerWidth: number = 240;

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const auth = useAuth();

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

  const handleAction = (id: string) => {
    console.log("action id: ", id);
  };

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
      </AppLayout>
    </React.Fragment>
  );
}

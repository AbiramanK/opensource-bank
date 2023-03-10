import React from "react";
import {
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  ChevronLeft,
  Group,
  AccountBalance,
  ReceiptLong,
} from "@mui/icons-material";

import { Title } from "../../components";
import { MuiDrawerNav } from "./MuiDrawerNav";
import { useAuth, UserType } from "src/RootRouter";

export interface MainListItemInterface {
  id: DrawerItemSelectedType;
  title: string;
  link: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  roles: Array<UserType>;
}

const mainListItems: MainListItemInterface[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    link: "/",
    leftIcon: <DashboardIcon />,
    roles: ["customer", "banker"],
  },
  {
    id: "customers",
    title: "Customers",
    link: "/customers",
    leftIcon: <Group />,
    roles: ["banker"],
  },
  {
    id: "accounts",
    title: "Accounts",
    link: "/accounts",
    leftIcon: <AccountBalance />,
    roles: ["customer", "banker"],
  },
  {
    id: "transactions",
    title: "Transactions",
    link: "/transactions",
    leftIcon: <ReceiptLong />,
    roles: ["customer", "banker"],
  },
];

export interface IDrawerListItemProps {
  id: string;
  title: string;
  link: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  selected?: string;
}

const DrawerListItem = (props: IDrawerListItemProps) => {
  return (
    <React.Fragment>
      <Tooltip
        key={props?.id}
        title={`${props?.title}`}
        placement="right-start"
      >
        <ListItemButton
          key={props?.id}
          selected={props?.selected === props?.id}
          LinkComponent={"a"}
          href={`${props?.link}`}
        >
          {props?.leftIcon && <ListItemIcon>{props?.leftIcon}</ListItemIcon>}
          <ListItemText primary={props?.title} />
          {props?.rightIcon && <ListItemIcon>{props?.rightIcon}</ListItemIcon>}
        </ListItemButton>
      </Tooltip>
    </React.Fragment>
  );
};

export type DrawerItemSelectedType =
  | "dashboard"
  | "customers"
  | "accounts"
  | "transactions";

export interface IDrawerNavProps {
  open?: boolean;
  drawerWidth?: number;
  toggleDrawer: Function;
  selcted: DrawerItemSelectedType;
}

export default function DrawerNav(props: IDrawerNavProps) {
  const auth = useAuth();

  return (
    <React.Fragment>
      <MuiDrawerNav
        variant="permanent"
        open={props?.open}
        drawerwidth={props?.drawerWidth}
      >
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: [1],
          }}
        >
          <Title titleProps={{ marginBottom: 0 }}>Opensource Bank</Title>
          <IconButton onClick={() => props?.toggleDrawer()}>
            <ChevronLeft />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems?.map((item: MainListItemInterface, index: number) => {
            return (
              item?.roles?.includes(auth?.user?.type as UserType) && (
                <DrawerListItem
                  key={index}
                  id={item?.id}
                  title={item?.title}
                  link={item?.link}
                  leftIcon={item?.leftIcon}
                  rightIcon={item?.rightIcon}
                  selected={props?.selcted}
                />
              )
            );
          })}
        </List>
      </MuiDrawerNav>
    </React.Fragment>
  );
}

DrawerNav.defaultProps = {
  drawerWidth: 240,
  open: false,
};

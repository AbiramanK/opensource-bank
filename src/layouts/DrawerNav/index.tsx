import * as React from "react";
import {
  Toolbar,
  IconButton,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Title } from "../../components";
import { MuiDrawerNav } from "./MuiDrawerNav";
import { Dashboard as DashboardIcon } from "@mui/icons-material";

const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
  </React.Fragment>
);

export interface IDrawerNavProps {
  open?: boolean;
  drawerWidth?: number;
  toggleDrawer: Function;
}

export default function DrawerNav(props: IDrawerNavProps) {
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
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">{mainListItems}</List>
      </MuiDrawerNav>
    </React.Fragment>
  );
}

DrawerNav.defaultProps = {
  drawerWidth: 240,
  open: false,
};

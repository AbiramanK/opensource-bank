import React from "react";
import { Toolbar, IconButton, Typography, Badge } from "@mui/material";
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";

import { MuiApplicationBar } from "./MuiApplicationBar";
import { AccountMenu } from "src/components";

export interface IApplicationBarProps {
  open?: boolean;
  drawerWidth?: number;
  toggleDrawer: Function;
  logout: Function;
  firstName: string;
  lastName: string;
}

export default function ApplicationBar(props: IApplicationBarProps) {
  const handleConfirmation = () => {
    props?.logout();
  };

  return (
    <React.Fragment>
      <MuiApplicationBar
        position="absolute"
        open={props?.open}
        drawerwidth={props?.drawerWidth}
      >
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={() => props?.toggleDrawer()}
            sx={{
              marginRight: "36px",
              ...(props?.open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <AccountMenu
            handleConfirmation={handleConfirmation}
            firstName={props?.firstName!}
            lastName={props?.lastName!}
          />
        </Toolbar>
      </MuiApplicationBar>
    </React.Fragment>
  );
}

ApplicationBar.defaultProps = {
  drawerWidth: 240,
  open: false,
  toggleDrawer: () => {},
  logout: () => {},
  firstName: "FirstName",
  lastName: "LastName",
};

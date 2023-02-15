import React, { useState } from "react";
import { ApplicationBar, BaseLayout, DrawerNav, Main } from "src/layouts";

const drawerWidth: number = 240;

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {};

  return (
    <React.Fragment>
      <BaseLayout>
        <ApplicationBar
          open={open}
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
          logout={logout}
          firstName={"FirstName"}
          lastName={"LastName"}
        />
        <DrawerNav
          open={open}
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
        />
        <Main>
          <span>Dashboard</span>
        </Main>
      </BaseLayout>
    </React.Fragment>
  );
}

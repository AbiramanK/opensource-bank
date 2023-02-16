import React, { useState } from "react";
import { ApplicationBar, BaseLayout, DrawerNav, Main } from "src/layouts";
import { DrawerItemSelected } from "./DrawerNav";

const drawerWidth: number = 240;

export interface IAppLayoutProps {
  children: React.ReactNode;
  drawerSelected: DrawerItemSelected;
  title: string;
}

export default function AppLayout(props: IAppLayoutProps) {
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
          title={props?.title}
        />
        <DrawerNav
          open={open}
          drawerWidth={drawerWidth}
          toggleDrawer={toggleDrawer}
          selcted={props?.drawerSelected}
        />
        <Main>{props?.children}</Main>
      </BaseLayout>
    </React.Fragment>
  );
}

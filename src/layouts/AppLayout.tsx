import { useApolloClient } from "@apollo/client";
import React, { useState, Suspense, lazy } from "react";
import { useNavigate } from "react-router-dom";

import { DrawerItemSelectedType } from "./DrawerNav";
import { useAuth } from "src/RootRouter";

const ApplicationBar = lazy(() => import("src/layouts/ApplicationBar"));
const BaseLayout = lazy(() => import("src/layouts/BaseLayout"));
const DrawerNav = lazy(() => import("src/layouts/DrawerNav"));
const Main = lazy(() => import("src/layouts/Main"));

const drawerWidth: number = 240;

export interface IAppLayoutProps {
  children: React.ReactNode;
  drawerSelected: DrawerItemSelectedType;
  title: string;
}

export default function AppLayout(props: IAppLayoutProps) {
  const client = useApolloClient();
  const auth = useAuth();
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const logout = () => {
    client?.clearStore();
    auth?.logout(() => navigate("/login"));
  };

  return (
    <React.Fragment>
      <Suspense>
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
      </Suspense>
    </React.Fragment>
  );
}

import React, { useState } from "react";
import { AppLayout } from "src/layouts";

const drawerWidth: number = 240;

export interface IDashboardProps {}

export default function Dashboard(props: IDashboardProps) {
  return (
    <React.Fragment>
      <AppLayout drawerSelected="dashboard" title="Dashboard">
        <span>Dashboard</span>
      </AppLayout>
    </React.Fragment>
  );
}

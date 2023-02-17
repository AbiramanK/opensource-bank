import { Grid, Link, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";

export interface IDashboardItemProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  link?: string;
  action?: Function;
}

export default function DashboardItem(props: IDashboardItemProps) {
  return (
    <React.Fragment>
      <Link
        href={props?.link}
        component={props?.link ? "a" : "button"}
        underline="none"
        onClick={() => {
          if (props?.action) {
            props?.action(props?.id);
          }
        }}
      >
        <Tooltip title={props?.title}>
          <Paper
            elevation={3}
            sx={{ width: 180, height: 180, borderRadius: 3, cursor: "pointer" }}
          >
            <Grid
              container
              justifyContent={"center"}
              alignItems={"center"}
              sx={{ p: 2, borderRadius: 3 }}
              height={"100%"}
            >
              <Grid
                item
                xs={12}
                justifyContent={"center"}
                alignItems={"center"}
                display={"flex"}
              >
                {props?.icon}
              </Grid>
              <Grid
                item
                xs={12}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                sx={{ textAlign: "center" }}
              >
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: 120,
                    height: 30,
                  }}
                  variant="subtitle1"
                  noWrap
                >
                  {props?.title}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Tooltip>
      </Link>
    </React.Fragment>
  );
}

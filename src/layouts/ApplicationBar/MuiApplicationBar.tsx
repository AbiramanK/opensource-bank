import {
  styled,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from "@mui/material";

interface IMuiApplicationBarProps extends MuiAppBarProps {
  open?: boolean;
  drawerwidth?: number;
}

export const MuiApplicationBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<IMuiApplicationBarProps>(({ theme, open, drawerwidth }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerwidth,
    width: `calc(100% - ${drawerwidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

MuiApplicationBar.defaultProps = {
  drawerwidth: 240,
  open: false,
};

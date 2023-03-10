import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

export interface IAlertDialogSlide {
  title: string;
  message: string;
  closeButtonTitle: string;
  confirmButtonTitle: string;
  open: boolean;
  handleConfirm: Function;
  handleClose: Function;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide(props: IAlertDialogSlide) {
  const handleConfirm = () => {
    props?.handleConfirm();
  };

  const handleClose = () => {
    props?.handleClose();
  };

  return (
    <div>
      <Dialog
        open={props?.open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props?.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {props?.message}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{props?.closeButtonTitle}</Button>
          <Button onClick={handleConfirm}>{props?.confirmButtonTitle}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

AlertDialogSlide.defaultProps = {
  title: "Title",
  message: "Message",
  closeButtonTitle: "No",
  confirmButtonTitle: "Yes",
  open: false,
  handleConfirm: () => {},
  handleClose: () => {},
};

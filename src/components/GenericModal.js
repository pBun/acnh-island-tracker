import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from '@material-ui/core/DialogTitle';

import LoadingContext from "../context/LoadingContext";

import ChatStyleHeadline from "../components/ChatStyleHeadline";

const useStyles = makeStyles(theme => ({
    dialogTitle: {
        padding: 0,
    },
}));

export default function FormModal({
    children,
    open,
    handleCancel,
    handleConfirm,
    title,
    confirmText,
    cancelText,
}) {
    const classes = useStyles();
    const { loading } = React.useContext(LoadingContext);
    return (
        <Dialog
            fullWidth={true}
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleConfirm();
                }}
            >
                <DialogTitle disableTypography={true} className={classes.dialogTitle}>
                    <ChatStyleHeadline id="form-dialog-title" component="h2">
                        {title}
                    </ChatStyleHeadline>
                </DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCancel}
                        color="primary"
                    >
                        {cancelText || "Cancel"}
                    </Button>
                    <Button
                        color="primary"
                        type="submit"
                        disabled={loading}
                    >
                        {confirmText || "OK"}
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

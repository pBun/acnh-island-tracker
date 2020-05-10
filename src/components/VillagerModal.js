import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IslandTime from "../components/IslandTime";

import VilagerCombobox from "./VillagerCombobox";

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        paddingTop: theme.spacing(2),
    },
}));

export default function FormModal({ children, open, handleClockSettings, handleConfirm, handleCancel }) {
    const classes = useStyles();
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                Track Villager
            </DialogTitle>
            <Divider />
            <DialogContent className={classes.dialogContainer}>
                <DialogContentText>
                    Please ensure that your
                    {' '}
                    <Link variant="body1" color="primary" component="button" onClick={() => handleClockSettings()}>
                        current clock settings
                    </Link>
                    {' '}
                    <span style={{display: 'inline-block'}}>
                        (
                        <IslandTime />
                        )
                    </span>
                    {' '}
                    match the clock on your Nintendo Switch.
                </DialogContentText>
                <VilagerCombobox
                    value={selectedVillager}
                    onChange={(e, newVal) => setSelectedVillager(newVal)}
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        handleCancel();
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Cancel
                </Button>
                <Button
                    disabled={!selectedVillager}
                    onClick={() => {
                        handleConfirm(selectedVillager);
                        setSelectedVillager(null);
                    }}
                    color="primary"
                >
                    Track
                </Button>
            </DialogActions>
        </Dialog>
    );
}

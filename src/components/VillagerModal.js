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
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import AppContext from "../context/app";

import IslandTime from "../components/IslandTime";

import VilagerCombobox from "./VillagerCombobox";

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        paddingTop: theme.spacing(2),
    },
    checkboxLabel: {
        fontSize: "0.75rem",
    },
}));

export default function FormModal({
    children,
    open,
    handleClockSettings,
    handleConfirm,
    handleCancel,
}) {
    const classes = useStyles();
    const { allowDataShare, setAllowDataShare } = React.useContext(AppContext);
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Track Villager</DialogTitle>
            <Divider />
            <DialogContent className={classes.dialogContainer}>
                <DialogContentText>
                    Please ensure that your{" "}
                    <Link
                        variant="body1"
                        color="primary"
                        component="button"
                        onClick={() => handleClockSettings()}
                    >
                        current clock settings
                    </Link>{" "}
                    <span style={{ display: "inline-block" }}>
                        (
                        <IslandTime />)
                    </span>{" "}
                    match the clock on your Nintendo Switch.
                </DialogContentText>
                <VilagerCombobox
                    value={selectedVillager}
                    onChange={(e, newVal) => setSelectedVillager(newVal)}
                />
                <FormControl
                    margin="normal"
                    style={{
                        display: "block",
                    }}
                >
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={allowDataShare}
                                onChange={e =>
                                    setAllowDataShare(e.target.checked)
                                }
                                name="allowDataShare"
                                size="small"
                                color="primary"
                            />
                        }
                        label={
                            <span className={classes.checkboxLabel}>
                                Support the community by sending this data to
                                {" "}
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >our spreadsheet</a>
                                .
                            </span>
                        }
                    />
                </FormControl>
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

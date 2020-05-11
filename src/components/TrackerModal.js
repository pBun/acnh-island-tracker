import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import SessionContext from "../context/currentSession";
import AppContext from "../context/app";

import ChatStyleHeadline from "../components/ChatStyleHeadline";
import VilagerCombobox from "../components/VillagerCombobox";

const useStyles = makeStyles(theme => ({
    checkboxLabel: {
        fontSize: "0.75rem",
    },
    combobox: {
        marginTop: theme.spacing(3),
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
    const { currentIslandTimestamp } = React.useContext(SessionContext);
    const [selectedVillager, setSelectedVillager] = React.useState(null);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <ChatStyleHeadline id="form-dialog-title" component="h2">
                Track Villager
            </ChatStyleHeadline>
            <DialogContent>
                {!currentIslandTimestamp && (
                    <DialogContentText>
                        We noticed that you haven't updated the{" "}
                        <Link
                            variant="body1"
                            color="primary"
                            component="button"
                            onClick={() => handleClockSettings()}
                        >
                            clock settings
                        </Link>
                        . Please do this to ensure accurate data tracking.
                    </DialogContentText>
                )}
                <VilagerCombobox
                    value={selectedVillager}
                    onChange={(e, newVal) => setSelectedVillager(newVal)}
                    className={classes.combobox}
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
                                Support the community by sending your villager
                                sightings to{" "}
                                <a
                                    href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    our spreadsheet
                                </a>
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

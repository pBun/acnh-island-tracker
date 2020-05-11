import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import {
    FormControl,
    FormControlLabel,
    Checkbox,
    Button,
} from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import {
    KeyboardDateTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import SessionContext from "../context/currentSession";

import ChatStyleHeadline from "../components/ChatStyleHeadline";

const DEFAULT_CLOCK_OVERRIDE_STATE = true;

const useStyles = makeStyles(theme => ({
    checkboxLabel: {
        fontSize: "0.75rem",
    },
}));

export default function ClockOverrideModal({
    open,
    handleConfirm,
    handleCancel,
}) {
    const classes = useStyles();
    const { session, currentSystemTimestamp } = React.useContext(
        SessionContext
    );
    const initialOverrideClock =
        typeof session.islandOffset === "number"
            ? !!session.islandOffset
            : DEFAULT_CLOCK_OVERRIDE_STATE;
    const initialPotentialIslandOffset = session.islandOffset || 0;
    const [overrideClock, setOverrideClock] = React.useState(
        initialOverrideClock
    );
    const [potentialIslandOffset, setPotentialIslandOffset] = React.useState(
        initialPotentialIslandOffset
    );
    const potentialIslandTimestamp = overrideClock
        ? currentSystemTimestamp + potentialIslandOffset
        : currentSystemTimestamp;
    const reset = () => {
        handleCancel();
        setOverrideClock(initialOverrideClock);
        setPotentialIslandOffset(initialPotentialIslandOffset);
    };
    return (
        <Dialog open={open} onClose={reset} aria-labelledby="form-dialog-title">
            <ChatStyleHeadline id="form-dialog-title" component="h2">
                Clock Settings
            </ChatStyleHeadline>
            <DialogContent>
                <DialogContentText>
                    Set the clock based on your current Nintendo Switch
                    settings. This is so we can determine significance of
                    in-game time and date.
                </DialogContentText>
                <FormControl margin="normal">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            label="Nintendo Switch clock"
                            value={potentialIslandTimestamp}
                            onChange={newIslandTimestamp => {
                                const newOffset =
                                    newIslandTimestamp - currentSystemTimestamp;
                                setPotentialIslandOffset(newOffset);
                            }}
                            disabled={!overrideClock}
                            format="MM/dd/yyyy HH:mm"
                            showTodayButton
                        />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!overrideClock}
                                onChange={e =>
                                    setOverrideClock(!e.target.checked)
                                }
                                name="overrideClock"
                                size="small"
                                color="primary"
                            />
                        }
                        label={
                            <span className={classes.checkboxLabel}>
                                Synchronize clock via internet
                            </span>
                        }
                    />
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={reset} color="primary">
                    Cancel
                </Button>
                <Button
                    disabled={!potentialIslandTimestamp}
                    onClick={() => {
                        handleConfirm(
                            overrideClock ? potentialIslandOffset : 0
                        );
                    }}
                    color="primary"
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

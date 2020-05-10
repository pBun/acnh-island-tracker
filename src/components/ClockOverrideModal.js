import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import SessionContext from '../context/currentSession';

const useStyles = makeStyles(theme => ({
    dialogContainer: {
        paddingTop: theme.spacing(2),
    },
}));

export default function ClockOverrideModal({ open, handleConfirm, handleCancel }) {
    const classes = useStyles();
    const { session } = React.useContext(SessionContext);
    const [overrideClock, setOverrideClock] = React.useState(!!session.islandOffset);
    const [curTimestamp, setCurTimestamp] = React.useState(new Date());
    const [islandOffset, setIslandOffset] = React.useState(session.islandOffset || 0);
    React.useEffect(() => {
        if (!window) return;
        let updateTimeout;
        const updateCurTimestamp = () => {
            setCurTimestamp(Date.now());
            updateTimeout = window.setTimeout(updateCurTimestamp, 10000);
        };
        updateCurTimestamp();
        return () => {
            window.clearTimeout(updateTimeout);
        };
    }, []);
    const islandTimestamp = overrideClock ? curTimestamp + islandOffset : curTimestamp;
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Clock Preferences</DialogTitle>
            <Divider />
            <DialogContent className={classes.dialogContainer}>
                <DialogContentText>
                    Set the clock based on your current Nintendo Switch settings. This is so we can determine significance of in-game time and date.
                </DialogContentText>
                <FormControl
                    margin="normal"
                    style={{
                        display: 'block',
                    }}
                >
                    <FormControlLabel
                        control={(
                            <Checkbox
                                checked={overrideClock}
                                onChange={(e) => setOverrideClock(e.target.checked)}
                                name="overrideClock"
                                size="small"
                            />
                        )}
                        label={(
                            <span style={{fontSize: '0.75rem'}}>
                                Override current time
                            </span>
                        )}
                    />
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                            helperText="Nintendo Switch clock"
                            value={islandTimestamp}
                            onChange={(newIslandTimestamp) => {
                                const newOffset = newIslandTimestamp - curTimestamp;
                                setIslandOffset(newOffset);
                            }}
                            disabled={!overrideClock}
                            format="MM/dd/yyyy HH:mm"
                            showTodayButton
                        />
                    </MuiPickersUtilsProvider>
                </FormControl>
            </DialogContent>
            <DialogActions>
            <Button
                onClick={() => {
                    handleCancel();
                    setOverrideClock(!!session.islandOffset);
                    setIslandOffset(session.islandOffset || 0);
                }}
                color="primary"
            >
                Cancel
            </Button>
            <Button
                disabled={!islandTimestamp}
                onClick={() => {
                    handleConfirm(overrideClock ? islandOffset : 0);
                }}
                color="primary"
            >
                Set
            </Button>
            </DialogActions>
        </Dialog>
    );
}

import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { FormControl, FormControlLabel, Checkbox, Button } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

export default function ClockOverrideModal({ open, handleConfirm, handleCancel }) {
    const [overrideClock, setOverrideClock] = React.useState(false);
    const [islandTimestamp, setIslandTimestamp] = React.useState(new Date());
    const [pickerSynced, setPickerSynced] = React.useState(true);
    React.useEffect(() => {
        if (!window || !pickerSynced) return;
        let updateTimeout;
        const updateIslandTimestamp = () => {
            setIslandTimestamp(Date.now());
            updateTimeout = window.setTimeout(updateIslandTimestamp, 10000);
        };
        updateIslandTimestamp();
        return () => {
            window.clearTimeout(updateTimeout);
        };
    }, [pickerSynced]);
    return (
        <Dialog
            open={open}
            onClose={handleCancel}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">Clock Preferences</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Update your clock preferences based on your current Switch settings.
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
                            onChange={(newTimestamp) => {
                                setIslandTimestamp(newTimestamp);
                                setPickerSynced(false);
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
                    setPickerSynced(true);
                    setOverrideClock(false);
                }}
                color="primary"
            >
                Cancel
            </Button>
            <Button
                disabled={!islandTimestamp}
                onClick={() => {
                    handleConfirm(overrideClock ? islandTimestamp : Date.now());
                    setPickerSynced(true);
                    setOverrideClock(false);
                }}
                color="primary"
            >
                Set
            </Button>
            </DialogActions>
        </Dialog>
    );
}

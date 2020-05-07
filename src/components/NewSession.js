import React, { useContext, useState, useEffect } from 'react';
import { Typography, FormControl, FormControlLabel, Checkbox, ButtonGroup, Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import SessionContext from '../context/session';

export default function NewSession() {
    const { initialize } = useContext(SessionContext);
    const [sessionId, setSessionId] = useState('');
    const [overrideClock, setOverrideClock] = useState(false);
    const [islandTimestamp, setIslandTimestamp] = useState(new Date());
    const [pickerSynced, setPickerSynced] = useState(true);
    useEffect(() => {
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
        <form
            onSubmit={(e) => {
                e.preventDefault();
                initialize({ islandTimestamp: !overrideClock ? Date.now() : islandTimestamp });
            }}
        >
            <Typography variant="h4" component="h2">
                New Session
            </Typography>
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
            <ButtonGroup
                style={{
                    display: 'block',
                    marginTop: '1rem',
                }}
            >
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                >
                    Start
                </Button>
            </ButtonGroup>
        </form>
    );
}

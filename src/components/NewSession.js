import React, { useContext, useState } from 'react';
import { FormControl, Button, TextField } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

import SessionContext from '../context/session';

export default function NewSession() {
    const { initialize } = useContext(SessionContext);
    const [sessionId, setSessionId] = useState('');
    const [islandDateTime, setIslandDateTime] = useState(new Date());
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                initialize(sessionId, islandDateTime);
            }}
        >
            <FormControl
                fullWidth={true}
                margin={'normal'}
            >
                <TextField
                    label="Session ID"
                    value={sessionId}
                    onChange={(e) => {
                        setSessionId(e.target.value);
                    }}
                />
            </FormControl>
            <FormControl
                fullWidth={true}
                margin={'normal'}
            >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DateTimePicker
                        label="Current Island Time"
                        value={islandDateTime}
                        onChange={setIslandDateTime}
                    />
                </MuiPickersUtilsProvider>
            </FormControl>
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disableElevation
                >
                    Submit
                </Button>
            </div>
        </form>
    );
}

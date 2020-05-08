import React, { useContext } from 'react';
import { Fab, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SessionContext from '../context/currentSession';


export default function ResetSession() {
    const { resetSession } = useContext(SessionContext);
    return (
        <Fab
            className="ResetSession"
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="reset all"
            onClick={() => {
                if (window && window.confirm('Are you sure you want to reset your session and start over?')) {
                    resetSession();
                }
            }}
        >
            <Delete />
            Reset Everything
        </Fab>
    );
}

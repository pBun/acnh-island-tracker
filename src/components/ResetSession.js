import React, { useContext } from 'react';
import { IconButton } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SessionContext from '../context/currentSession';


export default function ResetSession(props) {
    const { resetSession } = useContext(SessionContext);
    return (
        <IconButton
            className="ResetSession"
            variant="extended"
            size="medium"
            color="secondary"
            aria-label="reset everything"
            onClick={() => {
                if (window && window.confirm('Are you sure you want to reset your session and start over?')) {
                    resetSession();
                }
            }}
            {...props}
        >
            <Delete />
        </IconButton>
    );
}

import React, { useContext } from 'react';
import { IconButton, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SessionContext from '../context/session';


export default function ResetSession() {
    const { session, resetSession } = useContext(SessionContext);
    if (!session.id) return '';
    return (
        <div className="ResetSession">
            <IconButton
                aria-label="New Session"
                onClick={() => {
                    if (window && window.confirm('Are you sure you want to reset your session and start over?')) {
                        resetSession();
                    }
                }}
            >
                <Delete />
            </IconButton>
        </div>
    );
}

import React, { useContext } from 'react';
import { Button, Typography } from '@material-ui/core';
import { Delete } from '@material-ui/icons';

import SessionContext from '../context/currentSession';


export default function ResetSession() {
    const { session, resetSession } = useContext(SessionContext);
    if (!session.id) return '';
    return (
        <div className="ResetSession">
            <Button
                variant="contained"
                color="secondary"
                startIcon={<Delete />}
                onClick={() => {
                    if (window && window.confirm('Are you sure you want to reset your session and start over?')) {
                        resetSession();
                    }
                }}
            >
                Reset Session
            </Button>
        </div>
    );
}

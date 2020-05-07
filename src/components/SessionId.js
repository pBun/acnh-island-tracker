import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';

import SessionContext from '../context/currentSession';


export default function SessionId() {
    const { session } = useContext(SessionContext);
    if (!session.id) return '';
    return (
        <Typography className="SessionId" variant="body2" component="span">
            {`Session: ${session.id}`}
        </Typography>
    );
}

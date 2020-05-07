import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';

import SessionContext from '../context/session';


export default function SessionId() {
    const { session } = useContext(SessionContext);
    if (!session.id) return '';
    return (
        <Typography className="SessionId" variant="body2" component="span">
            {`Session: ${session.id}`}
        </Typography>
    );
}

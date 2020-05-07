import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Typography } from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';

import SessionContext from '../context/session';

import './IslandTime.css';

export default function IslandTime() {
    const { session } = useContext(SessionContext);
    const [islandTime, setIslandTime] = useState(Date.now() + session.islandOffset);
    useEffect(() => {
        if (!window) return;
        let updateIslandTimeTimeout;
        const updateIslandTime = () => {
            setIslandTime(Date.now() + session.islandOffset);
            updateIslandTimeTimeout = window.setTimeout(updateIslandTime, 10000);
        };
        updateIslandTime();
        return () => {
            window.clearTimeout(updateIslandTimeTimeout);
        };
    }, [session.islandOffset]);
    if (!session.timestamp) return '';
    return (
        <Typography className="IslandTime" variant="body2">
            <AccessAlarm className="IslandTime-icon" fontSize="small" />
            <span className="IslandTime-text">
                {`${format(islandTime, 'MM/dd/yyyy hh:mm a')} (ISLAND)`}
            </span>
        </Typography>
    );
}

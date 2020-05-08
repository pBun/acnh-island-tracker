import React, { useContext, useEffect, useState } from 'react';
import { format } from 'date-fns';

import SessionContext from '../context/currentSession';

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
    if (!session.id) return '';
    return (
        <span className="IslandTime">
            {`${format(islandTime, 'MM/dd/yyyy hh:mm a')}`}
        </span>
    );
}

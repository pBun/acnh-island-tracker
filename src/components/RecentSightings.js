import React, { useContext } from 'react';
import { Typography } from '@material-ui/core';
import { format } from 'date-fns';

import SessionContext from '../context/session';

import './RecentSightings.css';

export default function RecentSightings(numSightings=10) {
    const { session } = useContext(SessionContext);
    const recentSightings = session.sightings
        .slice(Math.max(session.sightings.length - numSightings, 0))
        .reverse();
    if (!recentSightings.length) return '';
    return (
        <Typography className="RecentSightings" variant="body2" component="div">
            <span>Recent Sightings</span>
            <ul className="RecentSightings-list">
                {recentSightings.map(s => (
                    <li className="RecentSightings-item" key={`${s.villager}_${s.timestamp}`}>
                        <span className="RecentSightings-item-inner">
                            <a
                                href="https://nookipedia.com/wiki/Admiral"
                                target="_blank"
                                rel="noreferrer noopener"
                            >
                                {s.villager}
                            </a>
                        </span>
                        <span className="RecentSightings-item-inner">
                            {`${format(s.timestamp, 'MM/dd/yyyy hh:mm a')} (RL)`}
                        </span>
                    </li>
                ))}
            </ul>
        </Typography>
    );
}

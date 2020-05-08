import React, { useContext } from 'react';
import { Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import { format } from 'date-fns';

import SessionContext from '../context/currentSession';

export default function RecentSightings({ numTrips = 5 }) {
    const { session } = useContext(SessionContext);
    const recentSightings = session.sightings
        .slice(Math.max(session.sightings.length - numTrips, 0))
        .reverse();
    return (
        <List dense={true}>
            {recentSightings.map((sighting) => (
                <ListItem key={sighting.timestamp}>
                    <Button
                        component="a"
                        fullWidth={true}
                        href={`https://nookipedia.com/wiki/${sighting.villager}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        <ListItemAvatar>
                            <Avatar>
                                <FaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={sighting.villager}
                            secondary={format(sighting.timestamp + session.islandOffset, 'hh:mm a')}
                        />
                    </Button>
                </ListItem>
            ))}
        </List>
    );
}

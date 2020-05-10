import React from "react";
import { format } from 'date-fns';
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";

import SessionContext from '../../context/currentSession';

import useVillagerIcons from "../../hooks/useVillagerIcons";

import SiteMenu from "../../components/SiteMenu";
import Page from "../../components/page";

const useStyles = makeStyles(theme => ({
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function IndexPage() {
    const classes = useStyles();
    const { session } = React.useContext(SessionContext);

    const villagerIcons = useVillagerIcons();

    const recentSightings = session.sightings.sort((a, b) => b.timestamp - a.timestamp);
    const recentSightingsFormatted = recentSightings.map((sighting) => {
        const islandTimestamp = sighting.timestamp + session.islandOffset;
        return {
            timestamp: sighting.timestamp,
            villager: sighting.villager,
            date:  format(islandTimestamp, 'MMM d, yyyy'),
            time: format(islandTimestamp, 'h:mm a'),
            icon: villagerIcons[sighting.villager],
        };
    });
    const recentSightingsGroupedByDate = recentSightingsFormatted.reduce((acc, data) => {
        (acc[data['date']] = acc[data['date']] || []).push(data);
        return acc;
    }, {});
    const pageTitle = recentSightings.length
        ? `Recent Acitvity (${recentSightings.length})`
        : 'Recent Activity';
    return (
        <SiteMenu>
            <Page title={pageTitle}>
                <List className={classes.list}>
                    {recentSightings.length ? Object.keys(recentSightingsGroupedByDate).map((date) => (
                        <React.Fragment key={date}>
                            <ListSubheader className={classes.subheader}>
                                {date}
                            </ListSubheader>
                            {recentSightingsGroupedByDate[date].map((data) => (
                                <ListItem
                                    key={data.timestamp}
                                    button
                                    component="a"
                                    href={`https://nookipedia.com/wiki/${data.villager}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            alt={data.villager}
                                            src={data.icon}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={data.villager}
                                        secondary={data.time}
                                    />
                                </ListItem>
                            ))}
                        </React.Fragment>
                    )) : (
                        <ListSubheader className={classes.subheader}>
                            You haven't tracked any villagers yet!
                        </ListSubheader>
                    )}
                </List>
            </Page>
        </SiteMenu>
    );
}

import React from "react";
import { format } from 'date-fns';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import Avatar from "@material-ui/core/Avatar";

import { getVillager } from '../util/villager';

import SessionContext from '../context/currentSession';

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";

const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(2, 2, 0),
    },
    list: {
        marginBottom: theme.spacing(2),
    },
    subheader: {
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function BottomAppBar() {
    const classes = useStyles();
    const { session } = React.useContext(SessionContext);

    const recentSightings = session.sightings.sort((a, b) => b.timestamp - a.timestamp);

    return (
        <SiteMenu>
            <SEO title="ACNH Island Tracker" />
            <Typography className={classes.text} variant="h5" gutterBottom>
                Recent Activity
            </Typography>
            <List className={classes.list}>
                {recentSightings.length ? recentSightings.map((sighting) => {
                    const villager = getVillager(sighting.villager);
                    const islandTimestamp = sighting.timestamp + session.islandOffset;
                    return (
                        <React.Fragment key={sighting.timestamp}>
                            <ListSubheader className={classes.subheader}>
                                {format(islandTimestamp, 'MMM d')}
                            </ListSubheader>
                            <ListItem button>
                                <ListItemAvatar>
                                    <Avatar
                                        alt={villager.name}
                                        src={villager.name}
                                    />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={villager.name}
                                    secondary={format(islandTimestamp, 'h:mm a')}
                                />
                            </ListItem>
                        </React.Fragment>
                    );
                }) : (
                    <ListSubheader className={classes.subheader}>
                        You haven't tracked any villagers yet!
                    </ListSubheader>
                )}
            </List>
        </SiteMenu>
    );
}

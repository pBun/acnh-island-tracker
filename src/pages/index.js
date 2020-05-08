import React from "react";
import { format } from 'date-fns';
import { makeStyles } from "@material-ui/core/styles";
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
import PageTitle from "../components/PageTitle";

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

    const recentSightings = session.sightings.sort((a, b) => b.timestamp - a.timestamp);

    return (
        <SiteMenu>
            <SEO title="ACNH Island Tracker" />
            <PageTitle>
                Recent Activity
            </PageTitle>
            <List className={classes.list}>
                {recentSightings.length ? recentSightings.map((sighting) => {
                    const villager = getVillager(sighting.villager);
                    const islandTimestamp = sighting.timestamp + session.islandOffset;
                    return (
                        <React.Fragment key={sighting.timestamp}>
                            <ListSubheader className={classes.subheader}>
                                {format(islandTimestamp, 'MMM d')}
                            </ListSubheader>
                            <ListItem
                                button
                                component="a"
                                href={`https://nookipedia.com/wiki/${villager.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
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

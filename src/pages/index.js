import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from "@material-ui/icons/Schedule";
import FlightIcon from "@material-ui/icons/Flight";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import Page from "../components/page";

const useStyles = makeStyles((theme) => ({
    intro: {
        margin: theme.spacing(2, 5, 2),
    },
    listTitle: {
        margin: theme.spacing(3, 5, 0),
    },
    list: {
        paddingBottom: theme.spacing(3),
    },
}));

export default function IndexPage() {
    const classes = useStyles();
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        author
                    }
                }
            }
        `
    );
    return (
        <Page title={site.siteMetadata.title}>
            <Typography variant="body1" component="p" className={classes.intro}>
                Hi, I built this tool to track and compare villager appearance
                rates on Animal Crossing: New Horizon Mystery Islands. The goal
                is to demystify how villagers are rolled when traveling to each
                Mystery Island.
            </Typography>
            <Typography
                variant="h6"
                component="h2"
                className={classes.listTitle}
            >
                Getting started
            </Typography>
            <List component="div" dense={true} className={classes.list}>
                <ListItem>
                    <ListItemIcon>
                        <Avatar
                            alt="1"
                            src="/images/1.png"
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Set your clock"
                        secondary={
                            <>
                                By clicking <ScheduleIcon fontSize="small" /> in
                                the bottom navbar.
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar
                            alt="2"
                            src="/images/2.png"
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Track each villager you see"
                        secondary={
                            <>
                                By clicking <FlightIcon fontSize="small" /> in the
                                bottom navbar.
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <Avatar
                            alt="3"
                            src="/images/3.png"
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Analyze your data"
                        secondary={
                            <>
                                By clicking <EqualizerIcon fontSize="small" />{" "}
                                in the bottom navbar.
                            </>
                        }
                    />
                </ListItem>
            </List>
        </Page>
    );
}

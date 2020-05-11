import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EqualizerIcon from "@material-ui/icons/Equalizer";

import Page from "../components/Page";

const useStyles = makeStyles(theme => ({
    intro: {
        margin: theme.spacing(2, 5, 2),
    },
    listTitle: {
        margin: theme.spacing(3, 5, 0),
    },
    list: {
        paddingBottom: theme.spacing(3),
    },
    inlineIcon: {
        verticalAlign: "middle",
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        borderRadius: "1em",
        padding: "0.2em",
    },
    inlinePrimaryIcon: {
        verticalAlign: "middle",
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        borderRadius: "1em",
        padding: "0.2em",
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
                Hi, this is a tool for tracking and comparing villager spawns on
                mystery islands and the campsite within the game Animal
                Crossing: New Horizon. Raymond for everyone!.
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
                    <ListItemText
                        primary="1. Track each villager you see"
                        secondary={
                            <>
                                By clicking{" "}
                                <PersonAddIcon
                                    className={classes.inlinePrimaryIcon}
                                />{" "}
                                (Track Villager) in the bottom navbar.
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="2. Analyze your data"
                        secondary={
                            <>
                                By clicking{" "}
                                <EqualizerIcon className={classes.inlineIcon} />{" "}
                                (Data) in the bottom navbar.
                            </>
                        }
                    />
                </ListItem>
            </List>
        </Page>
    );
}

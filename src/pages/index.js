import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import HomeIcon from "@material-ui/icons/Home";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import SearchIcon from "@material-ui/icons/Search";

import Page from "../components/Page";
import SEO from "../components/SEO";

const useStyles = makeStyles(theme => ({
    intro: {
        margin: theme.spacing(3, 5, 4),
    },
    subTitle: {
        margin: theme.spacing(3, 5, 0),
    },
    note: {
        margin: theme.spacing(2, 5, 0),
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
    containerPadding: {
        paddingBottom: theme.spacing(4),
    },
}));

export default function IndexPage(props) {
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
            <SEO pathname={props.location.pathname} />
            <Typography variant="body2" component="p" className={classes.intro}>
                Dodo Tracker is a tool for tracking, analyzing, and predicting villager encounter rates across the game Animal Crossing: New Horizons. We are able to calculate campsite visitor frequency for each villager by analyzing past visits as well as your current and past residents. As for mystery islands we only need to look at current island residents. For details on this check out
                {" "}
                <a
                    href="https://docs.google.com/document/d/1c8rsKWWtwsOo_JOxwO-lVRx2MUhc-bcdZg1mhXgtRPg/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    drjay's doc on campsites
                </a>{" "}
                and/or{" "}
                <a
                    href="https://docs.google.com/document/d/16yHQzdYx4VznhnKSGZdtaKi_Yo8NpDwCYK8dmpR481s/edit"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    ctar17's doc on mystery islands
                </a>.
            </Typography>
            <Typography variant="h6" component="h2" className={classes.subTitle}>
                Getting started
            </Typography>
            <List component="div" dense={true}>
                <ListItem>
                    <ListItemText
                        primary="1. Add your current island residents"
                        secondary={
                            <>
                                By clicking <HomeIcon className={classes.inlineIcon} /> (My Island
                                Residents).
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="2. Track each villager you see at the campsite or on mystery islands"
                        secondary={
                            <>
                                By clicking <PersonAddIcon className={classes.inlinePrimaryIcon} />{" "}
                                (Track Encounter).
                            </>
                        }
                    />
                </ListItem>
                <ListItem>
                    <ListItemText
                        primary="3. Analyze your data and villagers"
                        secondary={
                            <>
                                By clicking <SearchIcon className={classes.inlineIcon} /> (Browse Villagers) or <EqualizerIcon className={classes.inlineIcon} /> (My
                                Data).
                            </>
                        }
                    />
                </ListItem>
            </List>
            <div className={classes.containerPadding} />
        </Page>
    );
}

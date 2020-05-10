import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import ScheduleIcon from '@material-ui/icons/Schedule';
import AddIcon from "@material-ui/icons/Add";
import EqualizerIcon from '@material-ui/icons/Equalizer';

import AppContext from '../context/app';

import SiteMenu from "../components/SiteMenu";
import Page from "../components/page";

const useStyles = makeStyles((theme) => ({
    text: {
        margin: theme.spacing(3, 2, 2),
    },
    listTitle: {
        margin: theme.spacing(3, 2, 0),
    },
    icon: {
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.text.hint,
    },
}));

export default function IndexPage() {
    const classes = useStyles();
    const {
        openTrackerModal,
        openClockModal,
    } = React.useContext(AppContext);
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
        <SiteMenu>
            <Page title={site.siteMetadata.title}>
                <Typography variant="body1" component="p" className={classes.text}>
                    Hi! I built this tool to track and compare Mystery Island villager appearance stats! Let's demystify a small corner of Animal Crossing: New Horizon so we can all invite Raymond to live on our islands! <a href={`https://twitter.com/${site.siteMetadata.author}`}>Reach out if you'd like to chat!</a>
                </Typography>
                <Typography variant="h6" component="h2" className={classes.listTitle}>
                    Getting started
                </Typography>
                <List component="div" dense={true}>
                    <ListItem
                        key="1"
                        button
                        component="span"
                        onClick={() => openClockModal()}
                    >
                        <ListItemIcon>
                            <Avatar alt="1" src="/images/1.png" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Set your clock"
                            secondary={(
                                <>
                                    You can also click
                                    {' '}
                                    <ScheduleIcon fontSize="small" />
                                    {' '}
                                    in the bottom navbar.
                                </>
                            )}
                        />
                    </ListItem>
                    <ListItem
                        key="2"
                        button
                        component="span"
                        onClick={() => openTrackerModal()}
                    >
                        <ListItemIcon>
                            <Avatar alt="2" src="/images/2.png" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Track each villager you see"
                            secondary={(
                                <>
                                    You can also click
                                    {' '}
                                    <AddIcon fontSize="small" />
                                    {' '}
                                    in the bottom navbar.
                                </>
                            )}
                        />
                    </ListItem>
                    <ListItem
                        key="3"
                        button
                        component={Link}
                        to="/stats/"
                    >
                        <ListItemIcon>
                            <Avatar alt="3" src="/images/3.png" className={classes.icon} />
                        </ListItemIcon>
                        <ListItemText
                            primary="Analyze your data"
                            secondary={(
                                <>
                                    You can also click
                                    {' '}
                                    <EqualizerIcon fontSize="small" />
                                    {' '}
                                    in the bottom navbar.
                                </>
                            )}
                        />
                    </ListItem>
                </List>
            </Page>
        </SiteMenu>
    );
}

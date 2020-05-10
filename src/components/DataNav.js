import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import GridOnIcon from '@material-ui/icons/GridOn';
import FlightIcon from '@material-ui/icons/Flight';
import LaunchIcon from '@material-ui/icons/Launch';

const useStyles = makeStyles(theme => ({
    textIcon: {
        fontSize: '0.8em',
    },
}));

export default function DataNav({ hideIndex }) {
    const classes = useStyles();
    return (
        <List component="div">
            {!hideIndex && (
                <>
                    <ListItem
                        button
                        component={Link}
                        to={'/data/'}
                    >
                        <ListItemText
                            primary={(
                                <Typography variant="h6">
                                    Data
                                </Typography>
                            )}
                        />
                    </ListItem>
                    <Divider />
                </>
            )}
            <ListItem
                button
                component={Link}
                to={'/data/recent/'}
            >
                <ListItemText
                    primary={(
                        <>
                            <FlightIcon className={classes.textIcon} />
                            {' '}
                            Recently Tracked Villagers
                        </>
                    )}
                    secondary="Your tracked villagers"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to="/data/by-villager/"
            >
                <ListItemText
                    primary={(
                        <>
                            <PeopleIcon className={classes.textIcon} />
                            {' '}
                            Grouped by Villager
                        </>
                    )}
                    secondary="Your tracked villagers grouped by name"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to="/data/by-species/"
            >
                <ListItemText
                    primary={(
                        <>
                            <PetsIcon className={classes.textIcon} />
                            {' '}
                            Grouped by Species
                        </>
                    )}
                    secondary="Your tracked villagers grouped by species"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to="/data/by-personality"
            >
                <ListItemText
                    primary={(
                        <>
                            <MoodIcon className={classes.textIcon} />
                            {' '}
                            Grouped by Personality
                        </>
                    )}
                    secondary="Your tracked villagers grouped by personality"
                />
            </ListItem>
            <ListItem
                button
                component="a"
                href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemText
                    primary={(
                        <>
                            <GridOnIcon className={classes.textIcon} />
                            {' '}
                            Raw Data
                            {' '}
                            <LaunchIcon className={classes.textIcon} />
                        </>
                    )}
                    secondary="See everyone's tracked villager data in Google Sheets"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to={'/data/privacy/'}
            >
                <ListItemText
                    primary={(
                        <>
                            <LockIcon className={classes.textIcon} />
                            {' '}
                            Privacy Settings
                        </>
                    )}
                />
            </ListItem>
        </List>
    );
}

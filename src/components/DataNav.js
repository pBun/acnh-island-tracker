import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import GridOnIcon from '@material-ui/icons/GridOn';
import FlightIcon from '@material-ui/icons/Flight';

const useStyles = makeStyles({
    header: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
});

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
                <ListItemIcon>
                    <FlightIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Tracked Villagers"
                    secondary="Your tracked villagers"
                />
            </ListItem>
            <ListItem
                button
                component="span"
                component={Link}
                to="/data/by-villager/"
            >
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Grouped by Villager"
                    secondary="Your tracked villagers grouped by name"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to="/data/by-species/"
            >
                <ListItemIcon>
                    <PetsIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Grouped by Species"
                    secondary="Your tracked villagers grouped by species"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to="/data/by-personality"
            >
                <ListItemIcon>
                    <MoodIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Grouped by Personality"
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
                <ListItemIcon>
                    <GridOnIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Raw Data"
                    secondary="See everyone's tracked villager data in Google Sheets"
                />
            </ListItem>
            <ListItem
                button
                component={Link}
                to={'/data/privacy/'}
            >
                <ListItemIcon>
                    <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy Settings" />
            </ListItem>
        </List>
    );
}

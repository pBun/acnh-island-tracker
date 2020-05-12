import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import MoodIcon from "@material-ui/icons/Mood";
import PetsIcon from "@material-ui/icons/Pets";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import PeopleIcon from "@material-ui/icons/People";
import LaunchIcon from "@material-ui/icons/Launch";
import WcIcon from "@material-ui/icons/Wc";

const useStyles = makeStyles(theme => ({
    textIcon: {
        fontSize: "0.8em",
    },
}));

export default function DataNav({ hideIndex }) {
    const classes = useStyles();
    return (
        <List component="div">
            {!hideIndex && (
                <>
                    <ListItem button component={Link} to={"/data/"}>
                        <ListItemText primary={<Typography variant="h6">Data</Typography>} />
                    </ListItem>
                    <Divider />
                </>
            )}
            <ListSubheader>Mystery Islands</ListSubheader>
            <ListItem button component={Link} to={"/data/mystery-islands/tracked/"}>
                <ListItemText
                    primary={
                        <>
                            <PeopleIcon className={classes.textIcon} /> Tracked Villagers
                        </>
                    }
                    secondary="Your tracked villagers"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-villager/">
                <ListItemText
                    primary={
                        <>
                            <PersonIcon className={classes.textIcon} /> Grouped by Villager
                        </>
                    }
                    secondary="Your tracked villagers grouped by name"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-species/">
                <ListItemText
                    primary={
                        <>
                            <PetsIcon className={classes.textIcon} /> Grouped by Species
                        </>
                    }
                    secondary="Your tracked villagers grouped by species"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-personality">
                <ListItemText
                    primary={
                        <>
                            <MoodIcon className={classes.textIcon} /> Grouped by Personality
                        </>
                    }
                    secondary="Your tracked villagers grouped by personality"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-gender">
                <ListItemText
                    primary={
                        <>
                            <WcIcon className={classes.textIcon} /> Grouped by Gender
                        </>
                    }
                    secondary="Your tracked villagers grouped by gender"
                />
            </ListItem>
            <ListSubheader>Campsite</ListSubheader>
            <ListItem button component={Link} to={"/data/campsite/tracked/"}>
                <ListItemText
                    primary={
                        <>
                            <PeopleIcon className={classes.textIcon} /> Tracked Villagers
                        </>
                    }
                    secondary="Your tracked campsite villagers"
                />
            </ListItem>
            <ListSubheader>Other</ListSubheader>
            <ListItem
                button
                component="a"
                href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemText
                    primary={
                        <>
                            <InsertDriveFileIcon className={classes.textIcon} /> Raw Data{" "}
                            <LaunchIcon className={classes.textIcon} />
                        </>
                    }
                    secondary="See everyone's tracked villager data in Google Sheets"
                />
            </ListItem>
            <ListItem button component={Link} to={"/data/privacy/"}>
                <ListItemText
                    primary={
                        <>
                            <LockIcon className={classes.textIcon} /> Privacy Settings
                        </>
                    }
                />
            </ListItem>
        </List>
    );
}

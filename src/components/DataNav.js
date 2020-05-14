import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import PersonIcon from "@material-ui/icons/Person";
import MoodIcon from "@material-ui/icons/Mood";
import PetsIcon from "@material-ui/icons/Pets";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import LaunchIcon from "@material-ui/icons/Launch";

import CampsiteIcon from "../components/icons/Campsite";
import NmtIcon from "../components/icons/Nmt";

const useStyles = makeStyles(theme => ({
    textIcon: {
        fontSize: "0.8em",
        verticalAlign: "middle",
    },
    listItemIcon: {
        fontSize: theme.spacing(4),
        marginRight: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
    },
    list: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
    listItemTextPrimary: {
        display: "flex",
        alignItems: "center",
    },
    listSubheader: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
    },
}));

export default function DataNav({ hideIndex }) {
    const classes = useStyles();
    return (
        <List component="div" className={classes.list}>
            {!hideIndex && (
                <>
                    <ListItem button component={Link} to={"/data/"}>
                        <ListItemText primary={<Typography variant="h6">Data</Typography>} />
                    </ListItem>
                    <Divider />
                </>
            )}

            <ListSubheader className={classes.listSubheader}>Recently Tracked Encounters</ListSubheader>
            <ListItem button component={Link} to={"/data/mystery-islands/tracked/"}>
                <ListItemIcon>
                    <NmtIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Mystery Islands"
                    secondary="All Encounters"
                />
            </ListItem>
            <ListItem button component={Link} to={"/data/campsite/tracked/"}>
                <ListItemIcon>
                    <CampsiteIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Campsite Visitors"
                    secondary="All Encounters"
                />
            </ListItem>

            <ListSubheader className={classes.listSubheader}>Aggregate Data</ListSubheader>
            <ListItem button component={Link} to="/data/mystery-islands/by-villager/">
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText
                    secondary="Mystery Island Encounters"
                    primary="Grouped by Villager"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-species/">
                <ListItemIcon>
                    <PetsIcon />
                </ListItemIcon>
                <ListItemText
                    secondary="Mystery Island Encounters"
                    primary="Grouped by Species"
                />
            </ListItem>
            <ListItem button component={Link} to="/data/mystery-islands/by-personality">
                <ListItemIcon>
                    <MoodIcon />
                </ListItemIcon>
                <ListItemText
                    secondary="Mystery Island Encounters"
                    primary="Grouped by Personality"
                />
            </ListItem>

            <ListSubheader className={classes.listSubheader}>Other</ListSubheader>
            <ListItem
                button
                component="a"
                href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
            >
                <ListItemIcon>
                    <InsertDriveFileIcon />
                </ListItemIcon>
                <ListItemText
                    primary={
                        <>
                            {" "}
                            <span className={classes.listItemText}>
                                Raw Data{" "}
                                <LaunchIcon className={classes.textIcon} />
                            </span>
                        </>
                    }
                    secondary="See everyone's tracked villager data in Google Sheets"
                />
            </ListItem>
            <ListItem button component={Link} to={"/data/privacy/"}>
                <ListItemIcon>
                    <LockIcon />
                </ListItemIcon>
                <ListItemText
                    primary="Privacy Settings"
                />
            </ListItem>
        </List>
    );
}

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
import FlightIcon from "@material-ui/icons/Flight";
import DeleteIcon from "@material-ui/icons/Delete";
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles({
    list: {
        width: 320,
    },
    header: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
    },
});

export default function TemporaryDrawer({ open, handleClose }) {
    const classes = useStyles();
    const closeDrawer = React.useCallback((e) => {
        if (
            e.type === "keydown" &&
            (e.key === "Tab" || e.key === "Shift")
        ) {
            return;
        }
        handleClose();
    }, [handleClose]);
    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={closeDrawer}
        >
            <div
                className={classes.list}
                role="presentation"
                onClick={closeDrawer}
                onKeyDown={closeDrawer}
            >
                <Typography className={classes.header} variant="h5" gutterBottom>
                    Island Tracker
                </Typography>
                <Divider />
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/"
                    >
                        <ListItemIcon>
                            <FlightIcon />
                        </ListItemIcon>
                        <ListItemText primary="Recent Activity" />
                    </ListItem>
                </List>
                <Typography className={classes.header} variant="body1">
                    Stats
                </Typography>
                <List>
                    <ListItem
                        button
                        component={Link}
                        to="/stats/villagers"
                    >
                        <ListItemIcon>
                            <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Villagers" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/stats/species"
                    >
                        <ListItemIcon>
                            <PetsIcon />
                        </ListItemIcon>
                        <ListItemText primary="Species" />
                    </ListItem>
                    <ListItem
                        button
                        component={Link}
                        to="/stats/personalities"
                    >
                        <ListItemIcon>
                            <MoodIcon />
                        </ListItemIcon>
                        <ListItemText primary="Personalities" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        button
                        component={Link}
                        color="secondary"
                        to="/nuke"
                    >
                        <ListItemIcon>
                            <DeleteIcon />
                        </ListItemIcon>
                        <ListItemText primary="Clear Everything" />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
}

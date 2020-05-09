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
import LockIcon from "@material-ui/icons/Lock";
import PeopleIcon from '@material-ui/icons/People';
import MoodIcon from '@material-ui/icons/Mood';
import PetsIcon from '@material-ui/icons/Pets';
import ScheduleIcon from '@material-ui/icons/Schedule';

const useStyles = makeStyles({
    list: {
        width: 320,
    },
    header: {
        paddingTop: 20,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 8,
        fontWeight: 'bold',
    },
});

export default function TemporaryDrawer({ open, handleClose, handleItemClick }) {
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
    const menuItem = ({id, url, icon, text}) => (
        <ListItem
            button
            component={url ? Link : 'span'}
            to={url}
            onClick={() => handleItemClick(id)}
        >
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
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
                <div>
                    <List component="div">
                        {menuItem({
                            id: 'recent',
                            url: '/',
                            icon: <FlightIcon />,
                            text: (
                                <Typography variant="h6">
                                    Mystery Island Tracker
                                </Typography>
                            ),
                        })}
                    </List>
                </div>
                <Divider />
                <div>
                    <Typography className={classes.header} variant="body1">
                        Stats
                    </Typography>
                    <List component="div">
                        {menuItem({
                            id: 'stats-villagers',
                            url: '/stats/villagers/',
                            icon: <PeopleIcon />,
                            text: 'Villagers',
                        })}
                        {menuItem({
                            id: 'stats-species',
                            url: '/stats/species/',
                            icon: <PetsIcon />,
                            text: 'Species',
                        })}
                        {menuItem({
                            id: 'stats-personalities',
                            url: '/stats/personalities/',
                            icon: <MoodIcon />,
                            text: 'Personalities',
                        })}
                    </List>
                </div>
                <div>
                    <Typography className={classes.header} variant="body1">
                        Settings
                    </Typography>
                    <List component="div">
                        {menuItem({
                            id: 'settings-clock',
                            icon: <ScheduleIcon />,
                            text: 'Clock preferences',
                        })}
                        {menuItem({
                            id: 'settings-privacy',
                            url: '/privacy/',
                            icon: <LockIcon />,
                            text: 'Privacy data',
                        })}
                    </List>
                </div>
            </div>
        </Drawer>
    );
}

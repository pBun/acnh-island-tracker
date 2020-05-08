import React, { useContext } from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
import {
    Drawer,
    List,
    ListItem,
    Divider,
    Menu,
    MenuItem,
    Button,
    Badge,
    Typography,
    ListItemIcon,
    ListItemText,
    IconButton,
    Toolbar,
    AppBar,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import FlightIcon from "@material-ui/icons/Flight";
import AlarmIcon from "@material-ui/icons/Alarm";
import AlarmAddIcon from "@material-ui/icons/AlarmAdd";
import InboxIcon from "@material-ui/icons/Inbox";
import MailIcon from "@material-ui/icons/Mail";
import HomeIcon from "@material-ui/icons/Home";

import SessionContext from "../context/currentSession";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
}));

export default function PrimarySearchAppBar() {
    const { session } = useContext(SessionContext);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const menuId = "site-menu";
    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        Island Tracker
                    </Typography>
                    <div className={classes.grow} />
                    <IconButton
                        edge="end"
                        aria-label="open site menu"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={() => setOpen(true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer id={menuId} anchor="right" open={open} onClose={() => setOpen(false)}>
                <div
                    role="presentation"
                    onClick={() => setOpen(false)}
                    onKeyDown={() => setOpen(false)}
                >
                    <Divider />
                    <List>
                        <ListItem
                            button
                            component={Link}
                            to="/"
                        >
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/track/"
                        >
                            <ListItemIcon>
                                <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Track" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/stats/"
                        >
                            <ListItemIcon>
                                <FlightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Stats" />
                        </ListItem>
                        <ListItem
                            button
                            component={Link}
                            to="/clock/"
                        >
                            <ListItemIcon>
                                <AlarmIcon />
                            </ListItemIcon>
                            <ListItemText primary="Clock" />
                        </ListItem>
                    </List>
                </div>
            </Drawer>
        </div>
    );
}

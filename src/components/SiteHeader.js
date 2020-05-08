import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { fade, makeStyles } from '@material-ui/core/styles';
import { Menu, MenuItem, Button, Badge, Typography, Icon, ListItemIcon, ListItemText, IconButton, Toolbar, AppBar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FlightIcon from '@material-ui/icons/Flight';
import AlarmIcon from '@material-ui/icons/Alarm';
import AlarmAddIcon from '@material-ui/icons/AlarmAdd';

import SessionContext from '../context/currentSession';

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const { session } = useContext(SessionContext);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);

    const handleSessionMenuOpen = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = "primary-search-account-menu";
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            open={isMenuOpen}
            onClose={()=> setAnchorEl(null)}
        >
            <MenuItem
                onClick={() => {
                    navigate('/session/');
                    setAnchorEl(null);
                }}
            >
                <ListItemIcon
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AlarmIcon />
                </ListItemIcon>
                <ListItemText primary={`View (${session.sightings.length})`} />
            </MenuItem>
            <MenuItem
                onClick={() => {
                    navigate('/session/track/');
                    setAnchorEl(null);
                }}
            >
                <ListItemIcon
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AlarmAddIcon />
                </ListItemIcon>
                <ListItemText primary="Track" />
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Button
                        onClick={() => {
                            navigate('/');
                        }}
                        startIcon={<FlightIcon />}
                        color="inherit"
                        style={{
                            textTransform: 'none',
                        }}
                    >
                        <Typography className={classes.title} variant="h6" noWrap>
                            Island Tracker
                        </Typography>
                    </Button>
                    <div className={classes.grow} />
                    {session.id && (
                        <div>
                            <IconButton
                                edge="end"
                                aria-label="current session"
                                aria-controls={menuId}
                                aria-haspopup="true"
                                onClick={handleSessionMenuOpen}
                                color="inherit"
                            >
                                <Badge badgeContent={session.sightings.length} color="secondary">
                                    <MenuIcon />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
}

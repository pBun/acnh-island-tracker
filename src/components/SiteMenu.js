import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";

import SessionContext from '../context/currentSession';

import IslandTime from "../components/IslandTime";
import ClockOverrideModal from "../components/ClockOverrideModal";
import VillagerModal from "../components/VillagerModal";
import SiteMenuDrawer from "../components/SiteMenuDrawer";

const useStyles = makeStyles(theme => ({
    buttonProgress: {
        color: 'rgba(0, 0, 0, 0.54)',
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
    paper: {
        paddingBottom: 93,
    },
    appBar: {
        top: "auto",
        bottom: 0,
    },
    grow: {
        flexGrow: 1,
    },
    fabButton: {
        position: "absolute",
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: "0 auto",
    },
}));

export default function BottomAppBar({ children }) {
    const classes = useStyles();
    const [modalOpen, setModalOpen] = React.useState('');
    const { trackVillager, setIslandOffset } = React.useContext(SessionContext);
    const [snackMessage, setSnackMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    // const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
    // const isMenuOpen = Boolean(menuAnchorEl);
    const menuId = 'menu-drawer';
    return (
        <>
            <CssBaseline />
            {loading && (<LinearProgress color="secondary" />)}
            <Paper square className={classes.paper}>
                <Container>
                    {children}
                </Container>
            </Paper>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <List>
                        <ListItem
                            button
                            component="span"
                            onClick={() => setModalOpen('clock')}
                        >
                            <ListItemText
                                primary={<IslandTime template="hh:mm a" />}
                                secondary={<IslandTime template="MMM d" />}
                                primaryTypographyProps={{
                                    color: 'inherit',
                                }}
                                secondaryTypographyProps={{
                                    color: 'inherit',
                                    style: { opacity: 0.6 },
                                }}
                            />
                        </ListItem>
                    </List>
                    <ClockOverrideModal
                        open={modalOpen === 'clock'}
                        handleConfirm={(islandOffset) => {
                            setModalOpen('');
                            setIslandOffset({ islandOffset });
                            setSnackMessage('Success! Your clock has been updated');
                        }}
                        handleCancel={() => {
                            setModalOpen('');
                        }}
                    />
                    <Fab
                        color="secondary"
                        aria-label="add"
                        className={classes.fabButton}
                        onClick={() => setModalOpen('track')}
                        disabled={loading}
                    >
                        <AddIcon />
                    </Fab>
                    <VillagerModal
                        open={modalOpen === 'track'}
                        handleClockSettings={() => {
                            setModalOpen('clock')
                        }}
                        handleConfirm={(villager) => {
                            if (!villager) return;
                            setModalOpen('');
                            setLoading(true);
                            trackVillager({ villager: villager.name })
                                .catch((err) => {
                                    setSnackMessage('Ajax error =(');
                                    setLoading(false);
                                })
                                .then(() => {
                                    setSnackMessage(`${villager} tracked successfully!`);
                                    setLoading(false);
                                });
                        }}
                        handleCancel={() => {
                            setModalOpen('');
                        }}
                    />
                    <div className={classes.grow} />
                    <IconButton
                        edge="start"
                        aria-label="show more"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={() => setDrawerOpen(true)}
                        color="inherit"
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={!!snackMessage}
                autoHideDuration={6000}
                onClose={() => {
                    setSnackMessage('');
                }}
                key={snackMessage}
                message={snackMessage}
            />
            <SiteMenuDrawer
                id={menuId}
                open={drawerOpen}
                handleClose={() => setDrawerOpen(false)}
                handleItemClick={(item) => item === 'settings-clock' && setModalOpen('clock')}
            />
        </>
    );
}

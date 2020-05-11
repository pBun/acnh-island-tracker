import React from "react";
import { Link } from "gatsby";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Snackbar from "@material-ui/core/Snackbar";
import FlightIcon from "@material-ui/icons/Flight";
import ScheduleIcon from "@material-ui/icons/Schedule";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";

import SessionContext from "../context/currentSession";
import AppContext from "../context/app";

import ClockOverrideModal from "../components/ClockOverrideModal";
import TrackerModal from "../components/TrackerModal";

const ButtonTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        boxShadow: 0,
        fontSize: theme.typography.fontSize,
    },
}))(Tooltip);

const useStyles = makeStyles(theme => ({
    buttonProgress: {
        color: "rgba(0, 0, 0, 0.54)",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: -12,
        marginLeft: -12,
    },
    container: {
        paddingBottom: 120,
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
    iconButton: {

    },
    dateLabel: {
        opacity: 0.6,
    },
    islandTime: {
        marginLeft: theme.spacing(1),
    },
}));

export default function BottomAppBar({ children }) {
    const classes = useStyles();
    const {
        loading,
        clockModalOpen,
        trackerModalOpen,
        setClockModalState,
        setTrackerModalState,
    } = React.useContext(AppContext);
    const { trackVillager, setIslandOffset, getPrettyIslandTime } = React.useContext(SessionContext);
    const [snackMessage, setSnackMessage] = React.useState("");
    return (
        <>
            <CssBaseline />
            {loading && <LinearProgress color="secondary" />}

            <Container className={classes.container} maxWidth="sm">
                {children}
            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <ButtonTooltip title="Clock Settings" placement="top">
                        <IconButton
                            edge="start"
                            onClick={() => setClockModalState(true)}
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <ScheduleIcon />
                        </IconButton>
                    </ButtonTooltip>
                    <List component="div" className={classes.islandTime}>
                        <ListItem
                            dense={true}
                            disableGutters={true}
                            className={classes.clock}
                        >
                            <ListItemText
                                primary={getPrettyIslandTime("h:mm a")}
                                secondary={getPrettyIslandTime("EEE. MMM d")}
                                primaryTypographyProps={{
                                    color: "inherit",
                                }}
                                secondaryTypographyProps={{
                                    color: "inherit",
                                    className: classes.dateLabel,
                                }}
                            />
                        </ListItem>
                    </List>
                    <ClockOverrideModal
                        open={clockModalOpen}
                        handleConfirm={islandOffset => {
                            setClockModalState(false);
                            setIslandOffset({ islandOffset });
                            setSnackMessage(
                                "Success! Your clock has been updated"
                            );
                        }}
                        handleCancel={() => {
                            setClockModalState(false);
                        }}
                    />
                    <ButtonTooltip title="Track Villager" placement="top">
                        <Fab
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={() => setTrackerModalState(true)}
                            disabled={loading}
                        >
                            <FlightIcon />
                        </Fab>
                    </ButtonTooltip>
                    <TrackerModal
                        open={trackerModalOpen}
                        handleClockSettings={() => {
                            setClockModalState(true);
                        }}
                        handleConfirm={villager => {
                            if (!villager) return;
                            setTrackerModalState(false);
                            trackVillager({ villager: villager.name })
                                .catch(err => {
                                    setSnackMessage("Ajax error =(");
                                })
                                .then(() => () => {
                                    setSnackMessage(
                                        `${villager.name} tracked successfully!`
                                    );
                                });
                        }}
                        handleCancel={() => {
                            setTrackerModalState(false);
                        }}
                    />
                    <div className={classes.grow} />
                    <ButtonTooltip title="Data" placement="top">
                        <IconButton
                            component={Link}
                            to="/data/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <EqualizerIcon />
                        </IconButton>
                    </ButtonTooltip>
                    <ButtonTooltip title="Home" placement="top">
                        <IconButton
                            edge="end"
                            component={Link}
                            to="/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <HomeIcon />
                        </IconButton>
                    </ButtonTooltip>
                </Toolbar>
            </AppBar>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={!!snackMessage}
                autoHideDuration={6000}
                onClose={() => {
                    setSnackMessage("");
                }}
                key={snackMessage}
                message={snackMessage}
            />
        </>
    );
}

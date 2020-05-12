import React from "react";
import { Link } from "gatsby";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import LinearProgress from "@material-ui/core/LinearProgress";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Fab from "@material-ui/core/Fab";
import Snackbar from "@material-ui/core/Snackbar";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import HomeIcon from "@material-ui/icons/Home";
import Tooltip from "@material-ui/core/Tooltip";
import SearchIcon from "@material-ui/icons/Search";

import SessionContext from "../context/SessionContext";
import AppContext from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";

import TrackerModal from "../components/TrackerModal";

const ButtonTooltip = withStyles(theme => ({
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
    iconButton: {},
    dateLabel: {
        opacity: 0.6,
    },
    progressBar: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
    },
}));

export default function BottomAppBar({ children }) {
    const classes = useStyles();
    const {
        trackerModalOpen,
        setClockModalState,
        setTrackerModalState,
    } = React.useContext(AppContext);
    const { loading } = React.useContext(LoadingContext);
    const { trackVillager } = React.useContext(SessionContext);
    const [snackMessage, setSnackMessage] = React.useState("");
    return (
        <>
            <CssBaseline />
            {loading && <LinearProgress color="secondary" className={classes.progressBar} />}
            <Container className={classes.container} maxWidth="sm">
                {children}
            </Container>
            <AppBar position="fixed" color="primary" className={classes.appBar}>
                <Toolbar>
                    <Button color="inherit" component={Link} to="/">
                        Dodo Tracker
                    </Button>
                    <ButtonTooltip title="Track Villager" placement="top">
                        <Fab
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={() => setTrackerModalState(true)}
                            disabled={loading}
                        >
                            <PersonAddIcon />
                        </Fab>
                    </ButtonTooltip>
                    <TrackerModal
                        open={trackerModalOpen}
                        handleClockSettings={() => {
                            setClockModalState(true);
                        }}
                        handleConfirm={(villager, location) => {
                            if (!villager) return;
                            setTrackerModalState(false);
                            trackVillager({ villager: villager.name, location })
                                .catch(err => {
                                    setSnackMessage("Ajax error =(");
                                })
                                .then(() => {
                                    setSnackMessage(`${villager.name} tracked successfully!`);
                                });
                        }}
                        handleCancel={() => {
                            setTrackerModalState(false);
                        }}
                    />
                    <div className={classes.grow} />
                    <ButtonTooltip title="My Island Residents" placement="top">
                        <IconButton
                            component={Link}
                            to="/residents/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <HomeIcon />
                        </IconButton>
                    </ButtonTooltip>
                    <ButtonTooltip title="My Data" placement="top">
                        <IconButton
                            component={Link}
                            to="/data/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <EqualizerIcon />
                        </IconButton>
                    </ButtonTooltip>
                    <ButtonTooltip title="Browse Villagers" placement="top">
                        <IconButton
                            component={Link}
                            to="/villagers/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <SearchIcon />
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

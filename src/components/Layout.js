import React from "react";
import { Link } from "gatsby";
import { makeStyles } from "@material-ui/core/styles";
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

import AppContext, { MODALS } from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";

import ImportEncountersModal from "../components/ImportEncountersModal";
import ImportResidentsModal from "../components/ImportResidentsModal";
import TrackEncounterModal from "../components/TrackEncounterModal";

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
        zIndex: 1301, // above dialog
    },
}));

export default function BottomAppBar({ children }) {
    const classes = useStyles();
    const {
        setModalOpen,
        snackMessage,
        setSnackMessage,
    } = React.useContext(AppContext);
    const { loading } = React.useContext(LoadingContext);
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
                    <Tooltip arrow title="Track Villager Encounter" placement="top">
                        <Fab
                            color="secondary"
                            aria-label="add"
                            className={classes.fabButton}
                            onClick={() => setModalOpen(MODALS.TRACK_ENCOUNTER)}
                            disabled={loading}
                        >
                            <PersonAddIcon />
                        </Fab>
                    </Tooltip>
                    <div className={classes.grow} />
                    <Tooltip arrow title="My Residents" placement="top">
                        <IconButton
                            component={Link}
                            to="/residents/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <HomeIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="My Data" placement="top">
                        <IconButton
                            component={Link}
                            to="/data/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <EqualizerIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip arrow title="Browse Villagers" placement="top">
                        <IconButton
                            component={Link}
                            to="/villagers/"
                            color="inherit"
                            className={classes.iconButton}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            <TrackEncounterModal />
            <ImportEncountersModal />
            <ImportResidentsModal />
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

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import ImportExportIcon from '@material-ui/icons/ImportExport';

import { DATA_SHARE_URL } from "../../util/dataShare";

import AppContext, { MODALS } from "../../context/AppContext";
import SessionContext from "../../context/SessionContext";

import Page from "../../components/Page";
import SEO from "../../components/SEO";

const useStyles = makeStyles(theme => ({
    text: {
        margin: theme.spacing(3, 2, 2),
    },
    resetContainer: {
        padding: theme.spacing(1, 2, 2),
    },
    cautionButton: {
        color: theme.palette.error.main,
    },
    list: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
    listSubheader: {
        paddingLeft: theme.spacing(5),
        paddingRight: theme.spacing(5),
        backgroundColor: theme.palette.background.paper,
    },
    linkIcon: {
        marginRight: theme.spacing(-3),
    },
}));

function SettingsPage(props) {
    const classes = useStyles();
    const {
        allowDataShare,
        setAllowDataShare,
        resetAppData,
        setModalOpen,
        setSnackMessage,
    } = React.useContext(AppContext);
    const { session, overrideSessionData, resetSessionData } = React.useContext(SessionContext);
    const [newSession, setNewSession] = React.useState();
    const pageTitle = "Data Settings";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <List className={classes.list}>
                <ListSubheader className={classes.listSubheader}>
                    General
                </ListSubheader>
                <ListItem
                    button
                    onClick={() => {
                        setModalOpen(MODALS.IMPORT_SESSION);
                    }}
                >
                    <ListItemText
                        primary="Legacy copy/paste data import"
                    />
                    <ListItemIcon className={classes.linkIcon}>
                        <ImportExportIcon />
                    </ListItemIcon>
                </ListItem>
                <ListItem>
                    <ListItemText
                        id="download-session"
                        primary="Download Locally Saved Data"
                        secondary={
                            <>
                                Save my session data as a file in order to back it up or use it across multiple devices.
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            variant="contained"
                            onClick={() => {
                                const saveBlog = new Blob([encodeURIComponent(JSON.stringify(session))], { encoding:'UTF-8', type: 'data:image/png;charset=utf-8' });
                                const saveUrl = URL.createObjectURL(saveBlog);
                                window.open(saveUrl, "_blank", "");
                            }}
                            aria-label="download browser session data"
                        >
                            <GetAppIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>

                <ListItem>
                    <ListItemText
                        id="upload-session"
                        primary="Upload Locally Saved Data"
                        secondary={
                            <>
                                Overwrite my current session with a previous session file. <br />
                                <input
                                    type="file"
                                    onChange={(e) => {
                                        const reader = new FileReader();
                                        reader.onload = (e) => {
                                            const rawData = decodeURIComponent(e.target.result);
                                            const data = JSON.parse(rawData);
                                            setNewSession(data);
                                        };
                                        reader.readAsText(e.target.files[0]);
                                    }}
                                />
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            variant="contained"
                            onClick={() => {
                                try {
                                    overrideSessionData(newSession);
                                    setSnackMessage("Session successfully imported!");
                                } catch(error) {
                                    const err = `Invalid session code. Please ensure the code has not been altered.`;
                                    setSnackMessage(err);
                                }
                            }}
                            aria-label="download browser session data"
                        >
                            <PublishIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/*<ListItem
                    button
                    onClick={() => {
                        setModalOpen(MODALS.IMPORT_ENCOUNTERS);
                    }}
                >
                    <ListItemText
                        primary="Import Encounters from Spreadsheet"
                    />
                </ListItem>
                <ListItem
                    button
                    onClick={() => {
                        setModalOpen(MODALS.IMPORT_RESIDENTS);
                    }}
                >
                    <ListItemText
                        primary="Import Residents from Spreadsheet"
                    />
                </ListItem>*/}
                <ListItem>
                    <ListItemText
                        id="switch-list-label-delete-all"
                        primary="Delete Locally Saved Data"
                        secondary={
                            <>
                                Start a new session by deleting ALL encounters, residents, and app data stored in your browser. Note that
                                this does not delete data stored in
                                {" "}
                                <a
                                    href={DATA_SHARE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "inherit" }}
                                >
                                    our spreadsheet
                                </a>
                                . Please reach out to{" "}
                                <a
                                    href="https://twitter.com/peebun"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "inherit" }}
                                >
                                    me
                                </a>{" "}
                                if you'd like me to delete this data.
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            className={classes.cautionButton}
                            variant="contained"
                            onClick={() => {
                                if (
                                    window &&
                                    window.confirm(
                                        "Are you sure you want to delete your local session and app data? This cannot be undone."
                                    )
                                ) {
                                    resetSessionData();
                                    resetAppData();
                                }
                            }}
                            aria-label="delete browser session data"
                        >
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <ListSubheader className={classes.listSubheader}>
                    Privacy
                </ListSubheader>
                <ListItem>
                    <ListItemText
                        id="switch-list-label-data-share"
                        primary="Allow Data Share"
                        secondary={
                            <>
                                Support the community by sending villager sighting data to{" "}
                                <a
                                    href={DATA_SHARE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ color: "inherit" }}
                                >
                                    our spreadsheet
                                </a>
                                .
                            </>
                        }
                    />
                    <ListItemSecondaryAction>
                        <Checkbox
                            color="primary"
                            onChange={e => {
                                setAllowDataShare(e.target.checked);
                            }}
                            checked={allowDataShare}
                            inputProps={{
                                "aria-labelledby": "switch-list-label-data-share",
                            }}
                        />
                    </ListItemSecondaryAction>
                </ListItem>
            </List>
        </Page>
    );
};

export default SettingsPage;

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import TextField from "@material-ui/core/TextField";
import GetAppIcon from '@material-ui/icons/GetApp';
import PublishIcon from '@material-ui/icons/Publish';
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import SaveIcon from '@material-ui/icons/Save';

import { DATA_SHARE_URL } from "../../util/dataShare";
import { encodeSession, decodeSessionCode } from "../../util/session";

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
    textArea: {
        width: "100%",
        resize: "none",
        display: "block",
        marginTop: "10px",
        borderColor: "rgba(0,0,0,0.23)",
        backgroundColor: "transparent",
        padding: "5px 10px",
    },
    disabledTextArea: {
        width: "100%",
        resize: "none",
        display: "block",
        marginTop: "10px",
        borderColor: "rgba(0,0,0,0.23)",
        backgroundColor: "transparent",
        padding: "5px 10px",
        opacity: 0.5,
    },
}));
function DownloadSession(props) {
    const { session } = React.useContext(SessionContext);
    return (
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
                        const saveBlog = new Blob([encodeSession(session)], { encoding:'UTF-8', type: 'data:image/png;charset=utf-8' });
                        const saveUrl = URL.createObjectURL(saveBlog);
                        window.open(saveUrl, "_blank", "");
                    }}
                    aria-label="download browser session data"
                >
                    <GetAppIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
function UploadSession(props) {
    const {
        setSnackMessage,
    } = React.useContext(AppContext);
    const { overrideSessionData } = React.useContext(SessionContext);
    const [newSession, setNewSession] = React.useState();
    return (
        <ListItem>
            <ListItemText
                id="upload-session"
                primary="Upload Locally Saved Data"
                secondary={
                    <>
                        Overwrite my current session with a previously downloaded session file. <br />
                        <input
                            type="file"
                            onChange={(e) => {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    const data = decodeSessionCode(e.target.result);
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
                            if (
                                window &&
                                window.confirm(
                                    "Are you sure you want to overwrite ALL session data stored in your browser? This includes your session id, residents, and encounters."
                                )
                            ) {
                                overrideSessionData(newSession);
                                setSnackMessage("Session successfully imported!");
                            }
                        } catch(error) {
                            const err = `Invalid session code. Please ensure you've selected a save file using the input to the left and that the file has not been altered.`;
                            setSnackMessage(err);
                        }
                    }}
                    aria-label="download browser session data"
                >
                    <SaveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}
function CopySession(props) {
    const classes = useStyles();
    const { modalOpen, setModalOpen, setSnackMessage } = React.useContext(AppContext);
    const { session } = React.useContext(SessionContext);
    const [sessionCode, setSessionCode] = React.useState('');
    const textAreaEl = React.useRef(null);
    React.useEffect(() => {
        const newSessionCode = encodeSession(session);
        setSessionCode(newSessionCode);
    }, [session, setSessionCode]);
    return (
        <ListItem>
            <ListItemText
                id="copy-session"
                primary="Copy Locally Saved Data Code"
                secondary={
                    <>
                        Copy my session data as a code in order to back it up or use it across multiple devices. **CAUTION** This method may be unstable with larger data saves.
                        <textarea
                            className={classes.disabledTextArea}
                            ref={textAreaEl}
                            readOnly={true}
                            rows="5"
                            value={sessionCode}
                        />
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    variant="contained"
                    onClick={() => {
                        textAreaEl.current.focus();
                        textAreaEl.current.select();
                        try {
                            document.execCommand("copy");
                            setSnackMessage(`Session code successfully copied to clipboard!`);
                            setModalOpen(null);
                        } catch (err) {
                            setSnackMessage(err);
                        }
                    }}
                    aria-label="copy browser session data"
                >
                    <FileCopyIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
function PasteSession(props) {
    const classes = useStyles();
    const { setSnackMessage } = React.useContext(AppContext);
    const { session, overrideSessionData } = React.useContext(SessionContext);
    const [sessionCode, setSessionCode] = React.useState("");
    const [sessionCodeError, setSessionCodeError] = React.useState("");
    const importHandler = React.useCallback(() => {
        try {
            const newData = decodeSessionCode(sessionCode);
            overrideSessionData(newData);
            setSnackMessage("Session successfully imported!");
        } catch(error) {
            const err = `Invalid session code. Please ensure the code has not been altered.`;
            setSnackMessage(err);
            setSessionCodeError(err);
        }
    }, [
        sessionCode,
        overrideSessionData,
        setSnackMessage,
    ]);
    return (
        <ListItem>
            <ListItemText
                id="paste-session"
                primary="Paste Locally Saved Data Code"
                secondary={
                    <>
                        Overwrite my current session by pasting a copied session data code. <br />
                        <textarea
                            className={classes.textArea}
                            onChange={e => {
                                const code = e.target.value.trim();
                                setSessionCode(code);
                                setSessionCodeError("");
                            }}
                            rows="5"
                            value={sessionCode}
                        />
                    </>
                }
            />
            <ListItemSecondaryAction>
                <IconButton
                    variant="contained"
                    onClick={() => {
                        if (
                            window &&
                            window.confirm(
                                "Are you sure you want to overwrite ALL session data stored in your browser? This includes your session id, residents, and encounters."
                            )
                        ) {
                            importHandler();
                        }
                    }}
                    aria-label="paste browser session data code"
                >
                    <SaveIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
};
function ResetSession(props) {
    const classes = useStyles();
    const {
        resetAppData,
        setSnackMessage,
    } = React.useContext(AppContext);
    const { resetSessionData } = React.useContext(SessionContext);
    return (
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
                            setSnackMessage("All local session and app data has been reset");
                        }
                    }}
                    aria-label="delete browser session data"
                >
                    <DeleteIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

function SettingsPage(props) {
    const classes = useStyles();
    const {
        allowDataShare,
        setAllowDataShare,
    } = React.useContext(AppContext);
    const pageTitle = "Data Settings";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <List className={classes.list}>
                <ListSubheader className={classes.listSubheader}>
                    General
                </ListSubheader>
                <DownloadSession />
                <UploadSession />
                <CopySession />
                <PasteSession />
                <ResetSession />
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

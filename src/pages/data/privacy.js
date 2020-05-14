import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { DATA_SHARE_URL } from "../../util/dataShare";

import AppContext from "../../context/AppContext";
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
    button: {
        color: theme.palette.error.main,
    },
}));

function PrivacyPage(props) {
    const classes = useStyles();
    const { allowDataShare, setAllowDataShare, resetAppData } = React.useContext(AppContext);
    const { resetSessionData } = React.useContext(SessionContext);
    const pageTitle = "Data Privacy";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <List className={classes.root}>
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
                <ListItem>
                    <ListItemText
                        id="switch-list-label-delete-all"
                        primary="Reset Session"
                        secondary={
                            <>
                                Delete all session and app data stored in your browser. Note that
                                this does not delete data stored in{" "}
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
                            className={classes.button}
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
            </List>
        </Page>
    );
};

export default PrivacyPage;

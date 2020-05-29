import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SessionContext from "../../context/SessionContext";
import Page from "../../components/Page";
import SEO from "../../components/SEO";
import CopyTextArea from "../../components/CopyTextArea";

import {
    healSessionShape,
    generateRandomId,
    fetchRawSightings,
    formatRawSightings,
} from "../../util/session";
import { getSightings } from "../../util/dataShare";
import { VILLAGERS_MINIMAL } from "../../util/villager";


const useStyles = makeStyles(theme => ({
    list: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(4),
    },
    heading: {
        padding: theme.spacing(2, 5, 4),
    },
    container: {
        padding: theme.spacing(0, 5, 4),
    },
    textField: {
        width: "100%",
        resize: "none",
    },
}));
function MigrationPage(props) {
    const classes = useStyles();
    const { session, overrideSessionData, getSessionCode } = React.useContext(SessionContext);
    const [yerNewKey, setYerNewKey] = React.useState('');
    const [error, setError] = React.useState('');
    const yerKey = JSON.stringify(session);
    const pageTitle = "Migration";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <Typography className={classes.heading} variant="h4">
                PLEASE ONLY USE THIS PAGE IF YOU KNOW WHAT YOU ARE DOING!!!
            </Typography>
            <div className={classes.container}>
                <CopyTextArea
                    value={getSessionCode()}
                />
                <textarea
                    className={classes.textField}
                    rows="10"
                    onChange={(e) => {
                        setYerNewKey(e.target.value.trim());
                        setError('');
                    }}
                />
                <Button
                    onClick={() => {
                        if (!yerNewKey) return;
                        try {
                            if (window && window.confirm("Are you sure you want to overwrite ALL of your saved data with this?")) {
                                if (window.confirm("Are you absolutely sure? This includes ALL encounters and residents.")) {
                                    const json = healSessionShape(JSON.parse(yerNewKey));
                                    overrideSessionData(json);
                                }
                            }
                        } catch(err) {
                            setError(err.toString());
                        }
                    }}
                >Import</Button>
            </div>
        </Page>
    );
};

export default MigrationPage;

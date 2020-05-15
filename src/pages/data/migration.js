import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import SessionContext, { healSessionShape } from "../../context/SessionContext";
import Page from "../../components/Page";

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
    textArea: {
        width: "100%",
        resize: "none",
        display: "block",
    },
    textField: {
        width: "100%",
        resize: "none",
    },
}));
function NotFoundPage(props) {
    const classes = useStyles();
    const { session, overrideSessionData } = React.useContext(SessionContext);
    const [yerNewKey, setYerNewKey] = React.useState('');
    const [error, setError] = React.useState('');
    const yerKey = JSON.stringify(session);
    const yerKeyEl = React.useRef(null);
    return (
        <Page title="Migration">
            <Typography className={classes.heading} variant="h4">
                PLEASE ONLY USE THIS PAGE IF YOU KNOW WHAT YOU ARE DOING!!!
            </Typography>
            <div className={classes.container}>
                <textarea
                    className={classes.textArea}
                    ref={yerKeyEl}
                    readOnly={true}
                    rows="10"
                    value={yerKey ? yerKey.trim() : yerKey}
                />
                <Button
                    onClick={() => {
                        yerKeyEl.current.focus();
                        yerKeyEl.current.select();
                        try {
                            document.execCommand("copy");
                        } catch (err) {

                        }
                    }}
                >Copy</Button>
                <TextField
                    className={classes.textField}
                    variant="outlined"
                    onChange={(e) => {
                        setYerNewKey(e.target.value.trim());
                        setError('');
                    }}
                    error={!!error}
                    helperText={error}
                />
                <Button
                    onClick={() => {
                        if (!yerNewKey) return;
                        try {
                            if (window && window.confirm("Are you sure you want to overwrite ALL of your saved data with this?")) {
                                if (window.confirm("Are you absolutely sure? This includes residents, past residents, and ALL encounters.")) {
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

export default NotFoundPage;

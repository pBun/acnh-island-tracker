import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import GenericModal from "../components/GenericModal";

import AppContext, { MODALS } from "../context/AppContext";
import SessionContext from "../context/SessionContext";

import { decodeSessionCode } from "../util/session";

// const useStyles = makeStyles(theme => ({
//
// }));
function ImportSession(props) {
    // const classes = useStyles();
    const { modalOpen, setModalOpen, setSnackMessage } = React.useContext(AppContext);
    const { session, overrideSessionData } = React.useContext(SessionContext);
    const [sessionCode, setSessionCode] = React.useState(session.id);
    const [sessionCodeError, setSessionCodeError] = React.useState("");
    const importHandler = React.useCallback(() => {
        try {
            const newData = decodeSessionCode(sessionCode);
            overrideSessionData(newData);
            setSnackMessage("Session successfully imported!");
            setModalOpen(null);
        } catch(error) {
            const err = `Invalid session code. Please ensure the code has not been altered.`;
            setSnackMessage(err);
            setSessionCodeError(err);
        }
    }, [
        sessionCode,
        overrideSessionData,
        setModalOpen,
        setSnackMessage,
    ]);
    React.useEffect(() => {
        setSessionCode(session.id);
    }, [session.id, setSessionCode]);
    return (
        <GenericModal
            title="Import Session"
            handleConfirm={() => {
                if (
                    window &&
                    window.confirm(
                        "Are you sure you want to overwrite ALL session data stored in your browser? This includes your session id, residents, and encounters."
                    )
                ) {
                    importHandler();
                }
            }}
            confirmText="Import"
            open={modalOpen === MODALS.IMPORT_SESSION}
            handleCancel={() => {
                setModalOpen(null);
            }}
        >
            <FormControl component="fieldset" fullWidth={true}>
                <TextField
                    multiline
                    rows={10}
                    label="Session Code"
                    variant="outlined"
                    onChange={e => {
                        setSessionCode(e.target.value.trim());
                        setSessionCodeError("");
                    }}
                    error={!!sessionCodeError}
                    helperText={sessionCodeError}
                />
            </FormControl>
        </GenericModal>
    );
}

export default ImportSession;

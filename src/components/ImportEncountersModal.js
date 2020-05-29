import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import GenericModal from "../components/GenericModal";

import AppContext, { MODALS } from "../context/AppContext";
import LoadingContext from "../context/LoadingContext";
import SessionContext from "../context/SessionContext";

import { fetchRawSightings, formatRawSightings } from "../util/session";

// const useStyles = makeStyles(theme => ({
//
// }));
function ImportSession(props) {
    // const classes = useStyles();
    const { setLoading } = React.useContext(LoadingContext);
    const { modalOpen, setModalOpen, setSnackMessage } = React.useContext(AppContext);
    const { session, overrideSessionData } = React.useContext(SessionContext);
    const [sessionLookupId, setSessionLookupId] = React.useState(null);
    const [sessionLookupError, setSessionLookupError] = React.useState("");
    const importHandler = React.useCallback(() => {
        setLoading(true);
        fetchRawSightings(sessionLookupId)
            .then(rawSightings => {
                const newData = {
                    id: session.id,
                    timestamp: session.timestamp,
                    version: 1,
                    residents: session.residents,
                    sightings: formatRawSightings(rawSightings),
                };
                overrideSessionData(newData);
                setLoading(false);
                setSnackMessage("Encounters successfully imported!");
                setModalOpen(null);
            })
            .catch(err => {
                setSnackMessage(err);
                setSessionLookupError(err);
                setLoading(false);
            });
    }, [
        session.id,
        session.timestamp,
        session.residents,
        sessionLookupId,
        overrideSessionData,
        setLoading,
        setModalOpen,
        setSnackMessage,
    ]);
    React.useEffect(() => {
        setSessionLookupId(session.id);
    }, [session.id, setSessionLookupId]);
    return (
        <GenericModal
            title="Import Encounters"
            handleConfirm={() => {
                if (
                    window &&
                    window.confirm(
                        "Are you sure you want to overwrite ALL encounter data stored in your browser?"
                    )
                ) {
                    importHandler();
                }
            }}
            confirmText="Import"
            open={modalOpen === MODALS.IMPORT_ENCOUNTERS}
            handleCancel={() => {
                setModalOpen(null);
            }}
        >
            <FormControl component="fieldset" fullWidth={true}>
                <TextField
                    label="Spreadsheet Session ID"
                    defaultValue={sessionLookupId}
                    variant="outlined"
                    onChange={e => {
                        setSessionLookupId(e.target.value.trim());
                        setSessionLookupError("");
                    }}
                    error={!!sessionLookupError}
                    helperText={sessionLookupError}
                />
            </FormControl>
        </GenericModal>
    );
}

export default ImportSession;

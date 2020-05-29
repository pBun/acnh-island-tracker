import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import GenericModal from "../components/GenericModal";

import AppContext, { MODALS } from "../context/AppContext";
import SessionContext from "../context/SessionContext";

import { encodeSession } from "../util/session";

const useStyles = makeStyles(theme => ({
    textArea: {
        width: "100%",
        resize: "none",
        display: "block",
    },
}));
function ExportSession(props) {
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
        <GenericModal
            title="Export Session"
            handleConfirm={() => {
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
            confirmText="Copy Code"
            open={modalOpen === MODALS.EXPORT_SESSION}
            handleCancel={() => {
                setModalOpen(null);
            }}
        >
            <FormControl component="fieldset" fullWidth={true}>
                <textarea
                    className={classes.textArea}
                    ref={textAreaEl}
                    readOnly={true}
                    rows="10"
                    value={sessionCode}
                />
            </FormControl>
        </GenericModal>
    );
}

export default ExportSession;

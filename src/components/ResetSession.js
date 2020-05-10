import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import { Delete } from "@material-ui/icons";

import SessionContext from "../context/currentSession";

export default function ResetSession(props) {
    const { resetSession } = useContext(SessionContext);
    return (
        <Button
            className="ResetSession"
            variant="contained"
            color="secondary"
            startIcon={<Delete />}
            onClick={() => {
                if (
                    window &&
                    window.confirm(
                        "Are you sure you want to reset your session and start over? This cannot be undone."
                    )
                ) {
                    resetSession();
                }
            }}
            {...props}
        >
            Reset Session
        </Button>
    );
}

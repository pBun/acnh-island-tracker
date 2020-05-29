import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    textArea: {
        width: "100%",
        resize: "none",
        display: "block",
    },
}));

export default function TrackVillager({ value }) {
    const classes = useStyles();
    const textAreaEl = React.useRef(null);
    return (
        <>
            <textarea
                className={classes.textArea}
                ref={textAreaEl}
                readOnly={true}
                rows="10"
                value={value}
            />
            <Button
                onClick={() => {
                    textAreaEl.current.focus();
                    textAreaEl.current.select();
                    try {
                        document.execCommand("copy");
                    } catch (err) {

                    }
                }}
            >Copy</Button>
        </>
    );
}

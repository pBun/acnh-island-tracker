import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    title: {
        display: "inline-block",
        position: "absolute",
        left: theme.spacing(2),
        top: 0,
        transform: "translateY(-50%)",
        color: "#30849e",
        backgroundColor: "#ffdf4e",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingTop: "0.25em",
        paddingBottom: "0.25em",
        fontSize: "1rem",
        borderRadius: "1em",
    },
}));

const ChatStyleHeadline = props => {
    const classes = useStyles();
    return (
        <Typography
            className={classes.title}
            variant="h6"
            component="h1"
            {...props}
        >
            {props.children}
        </Typography>
    );
};

export default ChatStyleHeadline;

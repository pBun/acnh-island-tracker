import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";
import ChatStyleHeadline from "../components/ChatStyleHeadline";

const useStyles = makeStyles(theme => ({
    container: {
        position: "relative",
        margin: theme.spacing(6, 0, 0),
        padding: theme.spacing(3, 0, 0),
    },
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
    note: {
        display: "block",
        margin: theme.spacing(2, 2, 0),
        color: theme.palette.text.hint,
        textAlign: "center",
    },
    noteLink: {
        color: theme.palette.text.hint,
    },
}));

const SessionPage = ({ title, children, variant }) => {
    const classes = useStyles();
    return (
        <SiteMenu>
            <SEO title={title} />
            <Paper elevation={0} className={classes.container}>
                <ChatStyleHeadline component="h1">{title}</ChatStyleHeadline>
                {children}
            </Paper>
            <Typography
                variant="body2"
                component="span"
                className={classes.note}
            >
                Reach out to{" "}
                <a
                    href="https://twitter.com/peebun"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    me
                </a>{" "}
                if you'd like to chat. Also, a special thanks to{" "}
                <a
                    href="https://twitter.com/MauF0x"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Mau
                </a>{" "}
                for helping with statistics, and filthykasual for{" "}
                <a
                    href="https://imgur.com/a/3NnyBTM"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    the sick villager icons
                </a>
                .
            </Typography>
        </SiteMenu>
    );
};

export default SessionPage;

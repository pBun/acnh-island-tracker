import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Layout from "../components/Layout";
import ChatStyleHeadline from "../components/ChatStyleHeadline";

const useStyles = makeStyles(theme => ({
    container: {
        position: "relative",
        margin: theme.spacing(6, 0, 0),
        padding: theme.spacing(3, 0, 0),
        borderRadius: 15,
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
        borderRadius: 15,
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

const Page = ({ title, children }) => {
    const classes = useStyles();
    return (
        <Layout>
            <Paper elevation={0} className={classes.container}>
                <ChatStyleHeadline component="h1">{title}</ChatStyleHeadline>
                {children}
            </Paper>
            <Typography variant="body2" component="span" className={classes.note}>
                Reach out to{" "}
                <a
                    href="https://twitter.com/peebun"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    me
                </a>{" "}
                if you have any questions or would like to chat. Also, a special thanks to drjay & zoe for the{" "}
                <a
                    href="https://docs.google.com/document/d/1c8rsKWWtwsOo_JOxwO-lVRx2MUhc-bcdZg1mhXgtRPg/edit"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    doc on campsites
                </a>
                , ctar17 for the{" "}
                <a
                    href="https://docs.google.com/document/d/16yHQzdYx4VznhnKSGZdtaKi_Yo8NpDwCYK8dmpR481s/edit"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    doc on mystery islands
                </a>
                , and filthykasual for the{" "}
                <a
                    href="https://imgur.com/a/3NnyBTM"
                    className={classes.noteLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    villager icons
                </a>.
            </Typography>
        </Layout>
    );
};

export default Page;

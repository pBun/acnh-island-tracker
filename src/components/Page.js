import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(2),
    },
    container: {
        margin: theme.spacing(2, 0),
    },
    note: {
        display: 'block',
        margin: theme.spacing(2, 1, 0),
        color: theme.palette.text.hint,
        textAlign: 'center',
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
            <Paper className={classes.container}>
                <Typography className={classes.title} variant="h5">
                    {title}
                </Typography>
                <Divider />
                {children}
            </Paper>
            <Typography variant="body2" component="span" className={classes.note}>
                Reach out to <a href="https://twitter.com/peebun" className={classes.noteLink} target="_blank" rel="noopener noreferrer">me</a> if you'd like to chat. Also, a special thanks to <a href="https://twitter.com/MauF0x" className={classes.noteLink} target="_blank" rel="noopener noreferrer">Mau</a> for helping with statistics, and filthykasual for <a href="https://imgur.com/a/3NnyBTM" className={classes.noteLink} target="_blank" rel="noopener noreferrer">the sick villager icons</a>.
            </Typography>
        </SiteMenu>
    );
};

export default SessionPage;
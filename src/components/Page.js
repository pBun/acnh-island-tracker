import React from "react";
import { Paper, Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";
import ResetSession from "../components/ResetSession";

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(2),
    },
    container: {
        margin: theme.spacing(2, 0),
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
        </SiteMenu>
    );
};

export default SessionPage;

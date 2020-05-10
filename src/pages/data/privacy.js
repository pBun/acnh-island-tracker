import React from "react";
import { Paper, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SiteMenu from "../../components/SiteMenu";
import ResetSession from "../../components/ResetSession";
import Page from "../../components/page";

const useStyles = makeStyles(theme => ({
    text: {
        margin: theme.spacing(3, 2, 2),
    },
    resetContainer: {
        padding: theme.spacing(1, 2, 2),
    },
}));

const SessionPage = () => {
    const classes = useStyles();
    return (
        <SiteMenu>
            <Page title="Data Privacy" variant="text">
                <Typography variant="body1" className={classes.text}>
                    This control deletes all data from your browser. Please reach out to me on <a href="https://twitter.com/peebun">Twitter (@peebun)</a> if you'd like me to delete your data collected on the <a href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing">Google Sheet</a>.
                </Typography>
                <div className={classes.resetContainer}>
                    <ResetSession />
                </div>
            </Page>
        </SiteMenu>
    )
};

export default SessionPage;

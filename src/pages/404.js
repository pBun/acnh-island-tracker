import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Page from "../components/Page";
const useStyles = makeStyles(theme => ({
    text: {
        padding: theme.spacing(3, 5, 5),
    },
}));
const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <Page title="404: Not Found">
            <Typography variant="body1" className={classes.text}>
                ...Well there you have it. According to recent feedback, the general sentiment is that
                this page was not found. Well I think there's only one way to respond to this
                information... Try one of the other pages in the menu. And there you have it!
            </Typography>
        </Page>
    );
};

export default NotFoundPage;

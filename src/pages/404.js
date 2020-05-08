import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SiteMenu from "../components/SiteMenu";
import SEO from "../components/seo";

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(4, 0, 2),
    },
}));

const NotFoundPage = () => {
    const classes = useStyles();
    return (
        <SiteMenu>
            <SEO title="404: Not found | ACNH Island Tracker" />
            <Typography variant="h4" className={classes.title}>
                404 NOT FOUND
            </Typography>
            <Typography variant="body1">
                ...Well there you have it. According to recent feedback, the general sentiment is that this page was not found. Well I think there's only one way to respond to this information... Try one of the other pages in the menu. And there you have it!
            </Typography>
        </SiteMenu>
    )
};

export default NotFoundPage;

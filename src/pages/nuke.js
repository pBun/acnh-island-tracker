import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

import SessionContext from '../context/currentSession';

import SiteMenu from "../components/SiteMenu";
import SEO from "../components/seo";

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(4, 0, 2),
    },
}));

const NukePage = () => {
    const classes = useStyles();
    const { resetSession } = React.useContext(SessionContext);
    React.useEffect(() => {
        resetSession();
    }, [resetSession]);
    return (
        <SiteMenu>
            <SEO />
            <Typography variant="h6" className={classes.title}>
                All session data has been cleared.
            </Typography>
        </SiteMenu>
    )
};

export default NukePage;

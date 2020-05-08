import React from "react";
import { Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(4, 0, 2),
    },
}));

const PageTitle = ({ children }) => {
    const classes = useStyles();
    return (
        <Typography className={classes.title} variant="h5" gutterBottom>
            {children}
        </Typography>
    )
};

export default PageTitle;

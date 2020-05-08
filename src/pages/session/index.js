import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SessionContext from '../../context/currentSession';
import SiteLayout from '../../components/SiteLayout';
import SEO from '../../components/seo';
import ResetSession from '../../components/ResetSession';
import PercentBreakdown from '../../components/PercentBreakdown';

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const SessionPage = () => {
    const classes = useStyles();
    const { session } = useContext(SessionContext);
    if (!session.id) {
        navigate(`/`)
    }
    return (
        <SiteLayout>
            <SEO />
            <ResetSession />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Villager Sightings by Species
                    </Typography>
                    <Paper>
                        <PercentBreakdown villagerPropName="species" />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Villager Sightings by Personalty
                    </Typography>
                    <Paper>
                        <PercentBreakdown villagerPropName="personality" />
                    </Paper>
                </Grid>
            </Grid>
        </SiteLayout>
    );
};

export default SessionPage;

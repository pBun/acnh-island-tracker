import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SessionContext from '../../context/currentSession';
import SiteLayout from '../../components/SiteLayout';
import SEO from '../../components/seo';
import TrackVillager from '../../components/TrackVillager';
import RecentTrips from '../../components/RecentTrips';

const useStyles = makeStyles(theme => ({
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

const TrackPage = () => {
    const classes = useStyles();
    const { session } = useContext(SessionContext);
    if (!session.id) {
        navigate(`/`)
    }
    return (
        <SiteLayout>
            <SEO />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Track a Villager
                    </Typography>
                    <TrackVillager />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Recent Sightings
                    </Typography>
                    <Paper>
                        <RecentTrips />
                    </Paper>
                </Grid>
            </Grid>
        </SiteLayout>
    );
};

export default TrackPage;

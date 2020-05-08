import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { Grid, Typography } from '@material-ui/core';
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
            <Typography variant="h4" className={classes.title}>
                Current Session
                {' '}
                <ResetSession fontSize="1em" style={{ marginTop: '-0.1em' }} />
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Villager Sightings by Species
                    </Typography>
                    <PercentBreakdown villagerPropName="species" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Villager Sightings by Personalty
                    </Typography>
                    <PercentBreakdown villagerPropName="personality" />
                </Grid>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Villager Sightings by Name
                    </Typography>
                    <PercentBreakdown villagerPropName="name" />
                </Grid>
            </Grid>
        </SiteLayout>
    );
};

export default SessionPage;

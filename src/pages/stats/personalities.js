import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';

const useStyles = makeStyles(theme => ({
    title: {
        padding: theme.spacing(4, 0, 2),
    },
    container: {
        maxWidth: 680,
    },
}));

const StatsPage = () => {
    const classes = useStyles();
    return (
        <SiteMenu>
            <SEO title="Personalities Stats | ACNH Island Tracker" />
            <Typography variant="h6" className={classes.title}>
                Villager Sightings by Personality
            </Typography>
            <PercentBreakdown villagerPropName="personality" />
        </SiteMenu>
    );
};

export default StatsPage;

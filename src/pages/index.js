import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { Typography } from '@material-ui/core';

import SessionContext from '../context/currentSession';
import SiteLayout from '../components/SiteLayout';
import SEO from '../components/seo';

import NewSession from '../components/NewSession';

const SightingsPage = () => {
    const { session } = useContext(SessionContext);
    return (
        <SiteLayout>
            <SEO />
            <Typography variant="h4" component="h2">
                Welcome to the Island Tracker!
            </Typography>
            <Typography variant="body1">
                Start tracking the villagers you see on Mystery Islands and maybe we'll be able to figure out how they work eventually!
            </Typography>
            {!session.id ? (
                <NewSession />
            ) : (
                <Typography variant="body1">
                    You have tracked {session.sightings.length} villagers.
                    {' '}
                    <Link to="/session/track/">Track some more!</Link>
                </Typography>
            )}
        </SiteLayout>
    );
};

export default SightingsPage;

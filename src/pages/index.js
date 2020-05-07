import React, { useContext } from 'react';

import SessionContext from '../context/session';
import Layout from '../components/layout';
import SEO from '../components/seo';
import TrackVillager from '../components/TrackVillager';
import NewSession from '../components/NewSession';

const SightingsPage = () => {
    const { session } = useContext(SessionContext);
    return (
        <Layout>
            <SEO />
            {session.id ? (
                <TrackVillager />
            ) : (
                <NewSession />
            )}
        </Layout>
    );
};

export default SightingsPage;

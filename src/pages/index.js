import React, { useContext } from 'react';
import { Link } from 'gatsby';

import SessionContext from '../context/currentSession';
import SiteLayout from '../components/SiteLayout';
import SEO from '../components/seo';

const SightingsPage = () => {
    const { session } = useContext(SessionContext);
    return (
        <SiteLayout>
            <SEO />
            {!session.id ? (
                <Link to="/start/">Let's start a session!</Link>
            ) : (
                <>
                    <Link to="/track/">Track villagers</Link>
                    <Link to="/session/">View current session</Link>
                </>
            )}
        </SiteLayout>
    );
};

export default SightingsPage;

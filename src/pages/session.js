import React, { useContext } from 'react';

import SessionContext from '../context/currentSession';
import SiteLayout from '../components/SiteLayout';
import SEO from '../components/seo';
import ResetSession from '../components/ResetSession';

const SessionPage = () => {
    const { session } = useContext(SessionContext);
    return (
        <SiteLayout>
            <SEO />
            <ResetSession />
        </SiteLayout>
    );
};

export default SessionPage;

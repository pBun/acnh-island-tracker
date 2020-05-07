import React, { useContext } from 'react';

import SiteLayout from '../components/SiteLayout';
import SEO from '../components/seo';
import NewSession from '../components/NewSession';

const StartPage = () => {
    return (
        <SiteLayout>
            <SEO />
            <NewSession />
        </SiteLayout>
    );
};

export default StartPage;

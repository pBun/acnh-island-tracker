import React, { useContext } from 'react';

import SiteLayout from '../components/SiteLayout';
import SEO from '../components/seo';
import TrackVillager from '../components/TrackVillager';

const TrackPage = () => {
    return (
        <SiteLayout>
            <SEO />
            <TrackVillager />
        </SiteLayout>
    );
};

export default TrackPage;

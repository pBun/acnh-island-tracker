import React from 'react';

import SEO from "../../components/seo";
import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';
import PageTitle from "../../components/PageTitle";

const StatsPage = () => {
    return (
        <SiteMenu>
            <SEO title="Personality Stats" />
            <PageTitle>
                Villager Sightings by Personalities
            </PageTitle>
            <PercentBreakdown villagerPropName="personality" />
        </SiteMenu>
    );
};

export default StatsPage;

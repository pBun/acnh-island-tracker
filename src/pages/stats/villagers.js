import React from 'react';

import SEO from "../../components/seo";
import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';
import PageTitle from "../../components/PageTitle";

const StatsPage = () => {
    return (
        <SiteMenu>
            <SEO title="Villager Stats" />
            <PageTitle>
                Villager Sightings by Name
            </PageTitle>
            <PercentBreakdown villagerPropName="name" />
        </SiteMenu>
    );
};

export default StatsPage;

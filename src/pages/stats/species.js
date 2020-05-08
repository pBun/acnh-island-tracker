import React from 'react';

import SEO from "../../components/seo";
import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';
import PageTitle from "../../components/PageTitle";

const StatsPage = () => {
    return (
        <SiteMenu>
            <SEO title="Species Stats | ACNH Island Tracker" />
            <PageTitle>
                Villager Sightings by Species
            </PageTitle>
            <PercentBreakdown villagerPropName="species" />
        </SiteMenu>
    );
};

export default StatsPage;

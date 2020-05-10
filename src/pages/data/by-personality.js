import React from 'react';

import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';
import Page from "../../components/page";

const StatsPage = () => {
    return (
        <SiteMenu>
            <Page title="Personality Stats">
                <PercentBreakdown villagerPropName="personality" />
            </Page>
        </SiteMenu>
    );
};

export default StatsPage;

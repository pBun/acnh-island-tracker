import React from 'react';
import Paper from "@material-ui/core/Paper";

import SiteMenu from '../../components/SiteMenu';
import PercentBreakdown from '../../components/PercentBreakdown';
import Page from "../../components/page";

const StatsPage = () => {
    return (
        <SiteMenu>
            <Page title="Villager Stats">
                <PercentBreakdown villagerPropName="name" />
            </Page>
        </SiteMenu>
    );
};

export default StatsPage;

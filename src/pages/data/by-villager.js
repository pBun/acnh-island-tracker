import React from 'react';

import PercentBreakdown from '../../components/PercentBreakdown';
import Page from "../../components/page";

const StatsPage = () => {
    return (
        <Page title="Villager Stats">
            <PercentBreakdown villagerPropName="name" />
        </Page>
    );
};

export default StatsPage;

import React from 'react';

import PercentBreakdown from '../../components/PercentBreakdown';
import Page from "../../components/page";

const StatsPage = () => {
    return (
        <Page title="Personality Stats">
            <PercentBreakdown villagerPropName="personality" />
        </Page>
    );
};

export default StatsPage;

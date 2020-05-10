import React from 'react';

import PercentBreakdown from '../../components/PercentBreakdown';
import Page from "../../components/page";

const StatsPage = () => {
    return (
        <Page title="Grouped by Personality">
            <PercentBreakdown villagerPropName="personality" />
        </Page>
    );
};

export default StatsPage;
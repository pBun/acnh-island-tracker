import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

const StatsPage = () => {
    return (
        <Page title="Grouped by Villager">
            <PercentBreakdown villagerPropName="name" />
        </Page>
    );
};

export default StatsPage;

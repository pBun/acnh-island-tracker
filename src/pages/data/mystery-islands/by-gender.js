import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

const StatsPage = () => {
    return (
        <Page title="Grouped by Gender">
            <PercentBreakdown villagerPropName="gender" />
        </Page>
    );
};

export default StatsPage;

import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

function ByVillagerPage(props) {
    return (
        <Page pathname={props.location.pathname} title="Grouped by Villager">
            <PercentBreakdown villagerPropName="name" />
        </Page>
    );
};

export default ByVillagerPage;

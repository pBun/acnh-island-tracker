import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

function ByPersonalityPage(props) {
    return (
        <Page pathname={props.location.pathname} title="Grouped by Personality">
            <PercentBreakdown villagerPropName="personality" />
        </Page>
    );
};

export default ByPersonalityPage;

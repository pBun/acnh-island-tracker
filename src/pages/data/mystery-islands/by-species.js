import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

function BySpeciesPage(props) {
    return (
        <Page pathname={props.location.pathname} title="Grouped by Species">
            <PercentBreakdown villagerPropName="species" />
        </Page>
    );
};

export default BySpeciesPage;

import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";
import SEO from "../../../components/SEO";

function BySpeciesPage(props) {
    const pageTitle = "Mystery Island Encounters (by Species)";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <PercentBreakdown villagerPropName="species" />
        </Page>
    );
};

export default BySpeciesPage;

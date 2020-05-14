import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";
import SEO from "../../../components/SEO";

function ByPersonalityPage(props) {
    const pageTitle = "Mystery Island Encounters (by Personality)";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <PercentBreakdown villagerPropName="personality" />
        </Page>
    );
};

export default ByPersonalityPage;

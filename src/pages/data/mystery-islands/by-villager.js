import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";
import SEO from "../../../components/SEO";

function ByVillagerPage(props) {
    const pageTitle = "Mystery Island Encounters (by Villager)";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <PercentBreakdown villagerPropName="name" />
        </Page>
    );
};

export default ByVillagerPage;

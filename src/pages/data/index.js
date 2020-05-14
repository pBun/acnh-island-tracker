import React from "react";
import Page from "../../components/Page";
import SEO from "../../components/SEO";
import DataNav from "../../components/DataNav";

export default function IndexPage(props) {
    const pageTitle = "My Data";
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <DataNav hideIndex={true} />
        </Page>
    );
}

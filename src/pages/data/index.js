import React from "react";
import SiteMenu from "../../components/SiteMenu";
import Page from "../../components/page";
import DataNav from "../../components/DataNav";

export default function IndexPage() {
    return (
        <SiteMenu>
            <Page title="Data">
                <DataNav hideIndex={true} />
            </Page>
        </SiteMenu>
    );
}

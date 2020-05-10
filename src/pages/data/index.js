import React from "react";
import Page from "../../components/page";
import DataNav from "../../components/DataNav";

export default function IndexPage() {
    return (
        <Page title="Data">
            <DataNav hideIndex={true} />
        </Page>
    );
}

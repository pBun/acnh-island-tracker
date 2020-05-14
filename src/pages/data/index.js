import React from "react";
import Page from "../../components/Page";
import DataNav from "../../components/DataNav";

export default function IndexPage() {
    return (
        <Page title="My Tracked Spawn Data">
            <DataNav hideIndex={true} />
        </Page>
    );
}

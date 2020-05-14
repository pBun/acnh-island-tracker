import React from "react";
import Page from "../../components/Page";
import DataNav from "../../components/DataNav";

export default function IndexPage(props) {
    return (
        <Page pathname={props.location.pathname} title="My Tracked Spawn Data">
            <DataNav hideIndex={true} />
        </Page>
    );
}

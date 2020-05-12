import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

import SessionContext from "../../../context/currentSession";

import Page from "../../../components/Page";
import TrackedVillagersList from "../../../components/TrackedVillagersList";

// const useStyles = makeStyles(theme => ({
//
// }));

export default function TrackedCampsiteVillagersPage() {
    // const classes = useStyles();
    const { session } = React.useContext(SessionContext);

    const filteredSightings = session.sightings.filter(s => s.location === "campsite");
    const pageTitle = `Tracked Campsite Villagers ${
        filteredSightings.length ? `(${filteredSightings.length})` : ""
    }`;
    return (
        <Page title={pageTitle}>
            <TrackedVillagersList sightings={filteredSightings} />
        </Page>
    );
}
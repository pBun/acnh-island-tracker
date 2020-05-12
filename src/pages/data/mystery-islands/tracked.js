import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

import SessionContext from "../../../context/SessionContext";

import Page from "../../../components/Page";
import TrackedVillagersList from "../../../components/TrackedVillagersList";

// const useStyles = makeStyles(theme => ({
//
// }));

export default function TrackedMysteryIslandVillagersPage() {
    // const classes = useStyles();
    const { session } = React.useContext(SessionContext);

    const filteredSightings = session.sightings.filter(
        s => !s.location || s.location === "mystery-island"
    );
    const pageTitle = `Tracked Mystery Island Villagers ${
        filteredSightings.length ? `(${filteredSightings.length})` : ""
    }`;
    return (
        <Page title={pageTitle}>
            <TrackedVillagersList sightings={filteredSightings} />
        </Page>
    );
}

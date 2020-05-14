import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

import SessionContext from "../../../context/SessionContext";

import Page from "../../../components/Page";
import SEO from "../../../components/SEO";
import TrackedVillagersList from "../../../components/TrackedVillagersList";

// const useStyles = makeStyles(theme => ({
//
// }));

function TrackedMysteryIslandVillagersPage(props) {
    // const classes = useStyles();
    const { sightings, currentResidents, pastResidents } = React.useContext(SessionContext);

    const filteredSightings = sightings.filter(
        s => !s.location || s.location === "mystery-island"
    );
    const pageTitle = "Mystery Island Encounters";
    const pageLabel = `${pageTitle} ${
        filteredSightings.length ? `(${filteredSightings.length})` : ""
    }`;
    return (
        <Page title={pageLabel}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <TrackedVillagersList
                sightings={filteredSightings}
                currentResidents={currentResidents}
                pastResidents={pastResidents}
            />
        </Page>
    );
}

export default TrackedMysteryIslandVillagersPage;

import React from "react";
// import { makeStyles } from "@material-ui/core/styles";

import SessionContext from "../../../context/SessionContext";

import Page from "../../../components/Page";
import SEO from "../../../components/SEO";
import TrackedVillagersList from "../../../components/TrackedVillagersList";

// const useStyles = makeStyles(theme => ({
//
// }));

export default function TrackedCampsiteVillagersPage(props) {
    // const classes = useStyles();
    const { sightings, currentResidents, pastResidents, } = React.useContext(SessionContext);

    const filteredSightings = sightings.filter(s => s.location === "campsite");
    const pageTitle = `My Campsite Encounters ${
        filteredSightings.length ? `(${filteredSightings.length})` : ""
    }`;
    return (
        <Page title={pageTitle}>
            <SEO title={pageTitle} pathname={props.location.pathname} />
            <TrackedVillagersList
                sightings={filteredSightings}
                currentResidents={currentResidents}
                pastResidents={pastResidents}
            />
        </Page>
    );
}

import React from "react";
import { Typography } from "@material-ui/core";

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";
import ResetSession from "../components/ResetSession";
import PageTitle from "../components/PageTitle";

const SessionPage = () => {
    return (
        <SiteMenu title="Session Data">
            <SEO />
            <PageTitle>
                Current Session
            </PageTitle>
            <Typography variant="body1">
                This control deletes all data from your browser. Please reach out to me on <a href="https://twitter.com/peebun">Twitter (@peebun)</a> if you'd like me to delete your data collected on the <a href="https://docs.google.com/spreadsheets/d/1p542EQ85gdgLJfjZcI3SSmTdsnZKNi6KKjjjSdGkl7Q/edit?usp=sharing">Google Sheet</a>.
            </Typography>
            <div style={{marginTop: 32}}>
                <ResetSession />
            </div>
        </SiteMenu>
    )
};

export default SessionPage;

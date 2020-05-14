import React from "react";

import PercentBreakdown from "../../../components/PercentBreakdown";
import Page from "../../../components/Page";

function ByGenderPage(props) {
    return (
        <Page pathname={props.location.pathname} title="Grouped by Gender">
            <PercentBreakdown villagerPropName="gender" />
        </Page>
    );
};

export default ByGenderPage;

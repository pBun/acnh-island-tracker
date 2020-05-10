import React from "react";
import { Typography } from "@material-ui/core";

import SiteMenu from "../components/SiteMenu";
import Page from "../components/page";

const NotFoundPage = () => {
    return (
        <SiteMenu>
            <Page title="404: Not Found">
                ...Well there you have it. According to recent feedback, the general sentiment is that this page was not found. Well I think there's only one way to respond to this information... Try one of the other pages in the menu. And there you have it!
            </Page>
        </SiteMenu>
    )
};

export default NotFoundPage;

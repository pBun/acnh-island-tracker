import React from "react";
import { Typography } from "@material-ui/core";

import SEO from "../components/seo";
import SiteMenu from "../components/SiteMenu";
import PageTitle from "../components/PageTitle";

const NotFoundPage = () => {
    return (
        <SiteMenu>
            <SEO title="404: Not found" />
            <PageTitle>
                404 NOT FOUND
            </PageTitle>
            <Typography variant="body1">
                ...Well there you have it. According to recent feedback, the general sentiment is that this page was not found. Well I think there's only one way to respond to this information... Try one of the other pages in the menu. And there you have it!
            </Typography>
        </SiteMenu>
    )
};

export default NotFoundPage;

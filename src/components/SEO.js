/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO(props) {
    const { description, lang, meta, title, pathname } = props;
    const { site } = useStaticQuery(
        graphql`
            query {
                site {
                    siteMetadata {
                        title
                        description
                        author
                        siteUrl
                    }
                }
            }
        `
    );
    const metaTitle = title ? `${title} | ${site.siteMetadata.title}` : site.siteMetadata.title;
    const metaDescription = description || site.siteMetadata.description;
    const metaUrl = `${site.siteMetadata.siteUrl}${pathname}`;
    return (
        <Helmet
            htmlAttributes={{
                lang,
            }}
            title={metaTitle}
            meta={[
                {
                    name: "description",
                    content: metaDescription,
                },
                {
                    property: "og:title",
                    content: metaTitle,
                },
                {
                    property: "og:description",
                    content: metaDescription,
                },
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:url",
                    content: `${metaUrl}`,
                },
                {
                    name: "twitter:card",
                    content: "summary",
                },
                {
                    name: "twitter:creator",
                    content: site.siteMetadata.author,
                },
                {
                    name: "twitter:title",
                    content: metaTitle,
                },
                {
                    name: "twitter:description",
                    content: metaDescription,
                },
            ].concat(meta)}
        >
            <link rel="canonical" href={metaUrl} />
        </Helmet>
    );
}

SEO.defaultProps = {
    lang: "en",
    meta: [],
    description: '',
    title: '',
};

SEO.propTypes = {
    description: PropTypes.string,
    lang: PropTypes.string,
    meta: PropTypes.arrayOf(PropTypes.object),
    title: PropTypes.string,
    pathname: PropTypes.string.isRequired,
};

export default SEO;

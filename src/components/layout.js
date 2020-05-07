/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { Container } from '@material-ui/core';

import Header from './header';
import './layout.css';

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
              author
            }
          }
        }
    `);

    return (
        <>
            <Header siteTitle={data.site.siteMetadata.title} />
            <Container maxWidth="md">
                <main>{children}</main>
                <footer className="footer">
                    © {new Date().getFullYear()},
                    {` `}
                    <a href="http://dustinboersma.com" target="_blank" rel="noreferrer noopener">Dustin Boersma</a>
                </footer>
            </Container>
        </>
    );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout;

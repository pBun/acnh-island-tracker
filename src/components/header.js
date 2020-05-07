import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Typography } from '@material-ui/core';

import IslandTime from './IslandTime';
import SessionId from './SessionId';
import ResetSession from './ResetSession';

const Header = ({ siteTitle }) => (
    <header
        className="SiteHeader"
        style={{
            marginBottom: `1.45rem`,
        }}
    >
        <div
            style={{
                background: `rebeccapurple`,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h6"
                    component="h1"
                    gutterBottom
                >
                    <Link
                        to="/"
                        style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                    >
                        {siteTitle}
                    </Link>
                </Typography>
            </Container>
        </div>
        <Container className="SiteHeader-extra" maxWidth="md">
            <IslandTime />
            <ResetSession />
        </Container>
    </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;

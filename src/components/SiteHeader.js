import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { AppBar, Container, Typography } from '@material-ui/core';
import { AccessAlarm } from '@material-ui/icons';

import SiteMenu from './SiteMenu';
import IslandTime from './IslandTime';

import './SiteHeader.css';

const SiteHeader = ({ siteTitle }) => (
    <header
        className="SiteHeader"
        style={{
            color: '#fff',
            background: `rebeccapurple`,
            marginBottom: `1.45rem`,
        }}
    >
        <Container
            maxWidth="md"
        >
            <div className="SiteHeader-inner">
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
                <Typography className="IslandTimeWrapper" variant="body2">
                    <Link
                        to="/session/"
                        style={{
                            color: `white`,
                            textDecoration: `none`,
                        }}
                    >
                        <AccessAlarm className="IslandTimeWrapper-icon" style={{ fontSize: '1em', marginTop: '-0.25em' }} />
                        <IslandTime />
                    </Link>
                </Typography>
                <SiteMenu />
            </div>
        </Container>
    </header>
);

SiteHeader.propTypes = {
  siteTitle: PropTypes.string,
};

SiteHeader.defaultProps = {
  siteTitle: ``,
};

export default SiteHeader;

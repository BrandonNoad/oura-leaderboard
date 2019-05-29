// import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import { Flex, Heading } from '@rebass/emotion';
import SessionButton from '../../app/components/SessionButton';

const Header = ({ siteTitle }) => {
    return (
        <header>
            <Flex justifyContent="space-between" p={2} bg="#140e42">
                <Heading color="white">{siteTitle}</Heading>
                <SessionButton />
            </Flex>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string
};

// TODO: pass in siteTitle
Header.defaultProps = {
    siteTitle: 'Oura Leaderboard'
};

export default Header;

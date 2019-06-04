import React from 'react';
import GotoButton from '../GotoButton';
import { Box } from '@rebass/emotion';

const GotoBox = () => (
    <Box mb={2}>
        <GotoButton goto="prev-day" bg="black" color="white" border="2px solid white">
            {'<'}
        </GotoButton>
        <GotoButton goto="today" bg="black" color="white" border="2px solid white" mx={1}>
            TODAY
        </GotoButton>
        <GotoButton goto="next-day" bg="black" color="white" border="2px solid white">
            {'>'}
        </GotoButton>
    </Box>
);

export default GotoBox;

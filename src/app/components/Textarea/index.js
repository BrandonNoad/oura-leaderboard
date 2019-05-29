import styled from '@emotion/styled';

import { Box } from '@rebass/emotion';

import { borders } from 'styled-system';

const themed = (key) => (props) => props.theme[key];

const Textarea = styled(Box)(
    {
        resize: 'vertical',
        'min-height': '38px'
    },
    borders,
    themed('Textarea')
);

Textarea.propTypes = {
    ...borders.propTypes
};

Textarea.defaultProps = {
    as: 'textarea',
    fontSize: 'inherit',
    width: 1,
    m: 0,
    px: 2,
    py: 2,
    border: '2px solid #e8e8e8',
    borderRadius: 4,
    rows: 3
};

export default Textarea;

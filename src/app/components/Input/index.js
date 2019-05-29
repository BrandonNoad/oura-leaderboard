import styled from '@emotion/styled';

import { Box } from '@rebass/emotion';

import { borders } from 'styled-system';

const themed = (key) => (props) => props.theme[key];

const Input = styled(Box)({}, borders, themed('Input'));

Input.propTypes = {
    ...borders.propTypes
};

Input.defaultProps = {
    as: 'input',
    fontSize: 'inherit',
    width: 1,
    m: 0,
    px: 2,
    py: 2,
    border: '2px solid #e8e8e8',
    borderRadius: 4
};

export default Input;

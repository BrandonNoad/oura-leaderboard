import { connect } from 'react-redux';
import { Button } from '@rebass/emotion';
import { updateMoment } from '../../actions';

const mapDispatchToProps = (dispatch, { goto }) => ({
    onClick: () => dispatch(updateMoment(goto))
});

export default connect(
    null,
    mapDispatchToProps
)(Button);

import React from 'react';
import PropTypes from 'prop-types';
import CompleteView from './CompleteView';
import {connect} from 'react-redux';
import {updateJobInProgress} from '../../../actions/JobsActions';
import {Actions} from 'react-native-router-flux';

class CompleteController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {
    delivery_id: PropTypes.number.isRequired,
    updateJobInProgress: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {}

  onPress = () => {
    this.props.updateJobInProgress({});
    Actions.reset('dashboard');
    Actions.push('JobCompleteDetail', {
      id: this.props.delivery_id,
      showStops: false,
      CompleteJob: true,
    });
  };
  render() {
    return <CompleteView {...this.props} onPress={this.onPress} />;
  }
}
const mapStateToProps = ({}) => ({});
const actions = {updateJobInProgress};
export default connect(mapStateToProps, actions)(CompleteController);

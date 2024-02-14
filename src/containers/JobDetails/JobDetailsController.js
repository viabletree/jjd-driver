import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import JobDetailsView from './JobDetailsView';
import {acceptJobRequest} from '../../actions/JobsActions';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {Alert} from 'react-native';

class JobDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      acceptAvailable: true,
      loading: false,
    };
  }
  static propTypes = {job: PropTypes.object.isRequired};
  static defaultProps = {};
  componentDidMount = () => {};
  switchAcceptButton = () => {
    this.setState({acceptAvailable: true});
  };
  acceptPress = async delivery => {
    util.showLoader(this);

    const payload = {
      delivery_id: delivery,
      current_lat: 0,
      current_long: 0,
    };
    this.props.acceptJobRequest(payload, status => {
      util.hideLoader(this);
      if (status) {
        Actions.jump('accepted_jobs');
      }
    });
  };

  render() {
    return (
      <JobDetailsView
        {...this.props}
        callback={this.switchAcceptButton}
        acceptAvailable={this.state.acceptAvailable}
        acceptPress={this.acceptPress}
        loading={this.state.loading}
      />
    );
  }
}
const mapStateToProps = ({}) => ({});
const actions = {acceptJobRequest};
export default connect(
  mapStateToProps,
  actions,
)(JobDetailsController);

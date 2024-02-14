import React from 'react';
import PropTypes from 'prop-types';
import AvailableJobItemView from './AvailableJobItemView';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import util from '../../util';
import {connect} from 'react-redux';
import {
  leftForJobRequest,
  getAcceptedUpcomingJobsRequest,
  acceptJobRequest,
} from '../../actions/JobsActions';

class AvailableJobItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      startJobLoading: false,
    };
  }
  static propTypes = {
    job: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  };
  static defaultProps = {};
  onItemCLick = () => {
    this.props.job.accepted
      ? Actions.acceptedJobDetails({jobId: this.props.job.delivery})
      : Actions.jobDetails({job: this.props.job});
  };
  acceptJob = async delivery => {
    this.setState({startJobLoading: true});

    const payload = {
      delivery_id: delivery,
      current_lat: 0,
      current_long: 0,
    };

    this.props.acceptJobRequest(payload, status => {
      this.setState({startJobLoading: false});
      if (status) Actions.jump('accepted_jobs');
    });
  };
  render() {
    return (
      <AvailableJobItemView
        {...this.props}
        onItemCLick={this.onItemCLick}
        acceptJob={this.acceptJob}
        startJobLoading={this.state.startJobLoading}
      />
    );
  }
}
const mapStateToProps = ({jobs}) => ({onJob: jobs.onJob});
const actions = {
  leftForJobRequest,
  getAcceptedUpcomingJobsRequest,
  acceptJobRequest,
};
export default connect(
  mapStateToProps,
  actions,
)(AvailableJobItemController);

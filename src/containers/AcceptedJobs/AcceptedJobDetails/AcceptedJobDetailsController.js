import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
  declineJobRequest,
  declineJobCancelConfirm,
  leftForJobRequest,
  getJobsRequest,
  getSingleJobRequest,
  getAcceptedUpcomingJobsRequest,
  startJobRequest,
  endJobRequest,
} from '../../../actions/JobsActions';
import util from '../../../util';
import AcceptedJobDetailsView from './AcceptedJobDetailsView';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';
import moment from 'moment';

class AcceptedJobDetailsController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      buttonsVisible: false,
      showDeclineSheet: false,
      startJobLoading: false,
      sureBtnLoading: false,
      timeSpent: '00:00:00',
      completeData: {
        // cashToCollect: 48.96,
        // deposit: 30.48,
        // driverFee: 0,
        // durration: 287,
        // initalCost: 78.48,
        // overtime: 167,
        // overtimeCharge: 96,
        // returnJJD: 0,
        // totalCost: 79.44,
      },
    };
  }
  static propTypes = {
    job: PropTypes.object.isRequired,
    jobId: PropTypes.number,
  };
  static defaultProps = {};
  componentDidMount() {
    const payload = {
      delivery_id: this.props.jobId,
    };

    this.props.getSingleJobRequest(payload, status => {
      util.hideLoader(this);
    });
    if (!this.timer) {
      this.timer = setInterval(this.tick.bind(this), 1000);
    }
    // this.completeSheetRef.open();
  }
  tick() {
    const {jobInProgress} = this.props;
    if (jobInProgress) {
      let total = 0;
      if (jobInProgress.start_time) {
        var date1 = moment();
        let date2 = moment(jobInProgress.start_time);
        total = date1.diff(date2) / 1000;
        const hours = this.zeroPad(Math.floor(total / 3600), 10);
        // const hours = Math.floor(total / 3600);
        const minutes = this.zeroPad(Math.floor((total / 60) % 60), 10);
        // const minutes = Math.floor((total / 60) % 60);
        const seconds = this.zeroPad(Math.abs(Math.floor(total % 60)), 10);
        // const seconds = Math.abs(Math.floor(total % 60));

        this.setState({
          timeSpent: hours + ':' + minutes + ':' + seconds,
        });
      } else {
        clearInterval(this.timer);
        this.timer = null;
        console.log('tick exit 1');
      }
    } else {
      clearInterval(this.timer);
      this.timer = null;
      console.log('tick exit 2');
    }
  }
  zeroPad(nr, base) {
    var len = String(base).length - String(nr).length + 1;
    return len > 0 ? new Array(len).join('0') + nr : nr;
  }
  callBackForStops = () => {
    this.setState({buttonsVisible: true});
  };
  startJob = async () => {
    this.setState({startJobLoading: true});
    const payload = {
      deliveryId: this.props.job.delivery,
      current_lat: 0,
      current_long: 0,
    };
    this.props.startJobRequest(payload, status => {
      this.setState({startJobLoading: false});
      if (!this.timer) {
        this.timer = setInterval(this.tick.bind(this), 1000);
      }
    });
  };
  endJob = async () => {
    this.setState({startJobLoading: true});

    const payload = {
      deliveryId: this.props.job.delivery,
      current_lat: 0,
      current_long: 0,
    };
    this.props.endJobRequest(payload, (data, status) => {
      this.setState({startJobLoading: false});
      if (status) {
        if (data) {
          this.setState({completeData: data});
        }
        this.completeSheetRef.open();
      }
    });
  };

  toggleDeclineBottomSheet = () => {
    const {showDeclineSheet} = this.state;
    this.setState({showDeclineSheet: !showDeclineSheet});
  };

  // on decline job sure
  declineJobSure = deliveryId => {
    //start loading on sure btn
    this.setState({sureBtnLoading: true});
    const payload = {delivery_id: deliveryId};
    this.props.declineJobCancelConfirm(payload, (status, responseMsg) => {
      //stop loading on sure btn
      this.setState({sureBtnLoading: false});
      Actions.jump('accepted_jobs');
    });
  };

  render() {
    const {
      startJobLoading,
      sureBtnLoading,
      loading,
      completeData,
      timeSpent,
    } = this.state;

    return (
      <AcceptedJobDetailsView
        {...this.props}
        callback={this.callBackForStops}
        toggleDeclineBottomSheet={this.toggleDeclineBottomSheet}
        declineJobPress={this.declineJobSure}
        startJob={this.startJob}
        endJob={this.endJob}
        startJobLoading={startJobLoading}
        completeSheetRef={ref => {
          this.completeSheetRef = ref;
        }}
        sureBtnLoading={sureBtnLoading}
        loading={loading}
        completeData={completeData}
        timeSpent={timeSpent}
      />
    );
  }
}

const mapStateToProps = ({jobs}) => ({
  job: jobs.job,
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});
const actions = {
  declineJobRequest,
  declineJobCancelConfirm,
  leftForJobRequest,
  getSingleJobRequest,
  getAcceptedUpcomingJobsRequest,
  startJobRequest,
  endJobRequest,
};
export default connect(
  mapStateToProps,
  actions,
)(AcceptedJobDetailsController);

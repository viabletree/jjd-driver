import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import AvailableJobsView from './AvailableJobsView';
import {
  getJobsRequest,
  emptyJobs,
  getAcceptedUpcomingJobsRequest,
} from '../../actions/JobsActions';
import {setSelectedTab} from '../../actions/GeneralActions';
import Util from '../../util';
import {
  updateDeviceToken,
  setChannelForAndroid,
  getPermissions,
  showLocalNotification,
  navigateOnNotificationTap,
  registerAppWithFCM,
} from '../../services/firebaseHelper';
// import firebase from 'react-native-firebase';
import moment from 'moment';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';

class AvailableJobsController extends React.Component {
  constructor() {
    super();
    this.state = {
      isFetching: false,
      loading: true,
      page: 1,
      period: 'today',
    };
    AvailableJobsController.instance = this;
  }
  static onExit() {
    if (AvailableJobsController.instance) {
      AvailableJobsController.instance._onExit();
    }
  }

  static onEnter() {
    if (AvailableJobsController.instance) {
      AvailableJobsController.instance._onEnter();
    }
  }

  _onExit() {
    this.setState({loading: true});
  }

  _onEnter() {
    this.props.setSelectedTab(0);
    // console.log('here in onEnter');
    setTimeout(() => {
      this.initialCall(this.state.period);
    }, 1000);
  }

  static propTypes = {
    getJobsRequest: PropTypes.func.isRequired,
    availableJobs: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  componentWillMount() {
    // this._fcmInit();
  }

  async componentDidMount() {
    setTimeout(() => {
      this.initialCall(this.state.period);
    }, 1000);
  }

  componentWillUnmount() {
    try {
      this.notificationListener();
      this.notificationOpenedListener();
    } catch (error) {
      console.log('Error in AvailableJobsController -> componentWillUnmount');
      console.log(error);
    }
  }
  _fcmInit = async () => {
    // ------------- CHANNEL INIT --------------
    if (Util.isPlatformAndroid()) setChannelForAndroid();

    // ------------- iOS Permission --------------
    if (!Util.isPlatformAndroid()) getPermissions();

    // ------------- TOKEN INIT --------------

    updateDeviceToken();

    this.onTokenRefreshListener = firebase
      .messaging()
      .onTokenRefresh(fcmToken => {
        updateDeviceToken(fcmToken);
      });

    // ------------- NOTIFICATION LISTNER --------------

    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        // when app is in background
        // console.log({ background: notificationOpen });

        if (notificationOpen && notificationOpen.notification) {
          navigateOnNotificationTap(notificationOpen.notification._data);
        }
      });

    this.notificationListener = firebase
      .notifications()
      .onNotification(notification => {
        // when app is in foreground
        console.log({foreground: notification});

        if (notification) {
          showLocalNotification(notification._data);
        }
      });

    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification();
    if (notificationOpen) {
      // when app is in closed, and opened by clicking notification
      console.log('getInitialNotification', notificationOpen);
      if (notificationOpen && notificationOpen.notification) {
        navigateOnNotificationTap(notificationOpen.notification._data, true);
      }
    }
  };

  initialCall = period => {
    Util.showLoader(this);
    const payload = {};
    this.props.getJobsRequest(payload, status => {
      if (status) {
        this.props.getAcceptedUpcomingJobsRequest(status => {
          Util.hideLoader(this);
        });
      }
    });
  };

  onRefresh = () => {
    this.setState({isFetching: true});
    this.props.getJobsRequest({}, status => {
      if (status) {
        this.props.getAcceptedUpcomingJobsRequest(status => {
          this.setState({isFetching: false});
        });
      }
    });
  };

  render() {
    const {loading, isFetching} = this.state;
    return (
      <AvailableJobsView
        {...this.props}
        loading={loading}
        isFetching={isFetching}
        onRefresh={this.onRefresh}
      />
    );
  }
}
const mapStateToProps = ({jobs}) => {
  const availableJobs = _.cloneDeep(jobs.availableJobs);
  availableJobs.sort((a, b) =>
    moment(a.date, 'DD-MM-YYYY').isBefore(moment(b.date, 'DD-MM-YYYY'))
      ? -1
      : 1,
  );

  return {
    availableJobs,
    onJob: jobs.onJob,
    jobInProgress: jobs.jobInProgress,
  };
};
const actions = {
  getJobsRequest,
  emptyJobs,
  setSelectedTab,
  getAcceptedUpcomingJobsRequest,
};
export default connect(mapStateToProps, actions)(AvailableJobsController);

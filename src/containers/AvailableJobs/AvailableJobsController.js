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
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import moment from 'moment';
import _ from 'lodash';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import {PermissionsAndroid} from 'react-native';

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
      // this.initialCall(this.state.period);
    }, 1000);
  }

  static propTypes = {
    getJobsRequest: PropTypes.func.isRequired,
    availableJobs: PropTypes.array.isRequired,
  };
  static defaultProps = {};

  // componentWillMount() {
  //   this._fcmInit();
  // }

  async componentDidMount() {
    this._fcmInit();
    setTimeout(() => {
      this.initialCall(this.state.period);
    }, 1000);
  }

  componentWillUnmount() {
    if (this.notificationOpenedListener) {
      this.notificationOpenedListener();
    }

    // try {
    //   // this.notificationListener();
    //   this.notificationOpenedListener();
    // } catch (error) {
    //   console.log('Error in AvailableJobsController -> componentWillUnmount');
    //   console.log({error});
    // }
  }

  async requestNotificationPermission() {
    if (Platform.OS === 'android') {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Notification Permission',
          message:
            'This app needs access to your notifications to work properly',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      return result === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  }
  _fcmInit = async () => {
    this.requestNotificationPermission();
    messaging().onNotificationOpenedApp(remoteMessage => {
      const {data} = remoteMessage;
      console.log({datadata: data, remoteMessage});
    });
    console.log('_fcmInit_fcmInit');
    PushNotification.configure({
      onRegister: function (token) {
        console.log({token});
        updateDeviceToken();
      },
      onNotification: function (notification) {
        console.log({notificationnotification: notification?.userInteraction});
        const {data, userInteraction} = notification;
        if (userInteraction) {
          console.log({userInteraction});
          navigateOnNotificationTap(data, true);
        }
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      onAction: function (notification) {
        console.log('ACTION:', notification);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
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

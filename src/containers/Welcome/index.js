// @flow
import _ from 'lodash';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import {
  View,
  Image,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {Text} from '../../components';
import {Images, Colors, AppStyles, Fonts} from '../../theme';
import styles from './styles';
import Util from '../../util';
import {getCsrfTokenRequest} from '../../actions/GeneralActions';
import {updateJobInProgress} from '../../actions/JobsActions';
import {userLoginRequest} from '../../actions/UserActions';
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
import AsyncStorage from '@react-native-community/async-storage';
import {changeBase} from './../../config/WebService';
class Welcome extends Component {
  constructor(props) {
    super(props);
    moment.tz.setDefault('GMT+5');
    this.state = {
      loading: true,
      value: true,
    };
  }
  static propTypes = {
    getCsrfTokenRequest: PropTypes.func.isRequired,
    csrf: PropTypes.string.isRequired,
    isFirstTime: PropTypes.bool.isRequired,
    userLoginRequest: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    onJob: PropTypes.bool.isRequired,
    jobInProgress: PropTypes.object.isRequired,
    updateJobInProgress: PropTypes.func.isRequired,
  };

  async componentDidMount() {
    const {userData, csrf} = this.props;
    const self = this;
    let firstTime = 'yes';
    try {
      const value = await AsyncStorage.getItem('firstTime');
      if (value !== null) {
        // value previously stored
        firstTime = value;
      }
    } catch (e) {
      firstTime = true;
      // error reading value
    }
    this.props.getCsrfTokenRequest(success => {
      console.log({success});
      if (success) {
        if (firstTime === 'yes') {
          Actions.reset('tour');
        } else {
          this._userLoginRequest();
        }
      } else {
        Actions.reset('login');
      }
    });
  }
  // async initialSetup() {
  //   const {userData, csrf} = this.props;
  //   const self = this;
  //   let firstTime = 'yes';
  //   try {
  //     const value = await AsyncStorage.getItem('firstTime');
  //     if (value !== null) {
  //       // value previously stored
  //       firstTime = value;
  //     }
  //   } catch (e) {
  //     firstTime = true;
  //     // error reading value
  //   }
  //   this.props.getCsrfTokenRequest(success => {
  //     if (success) {
  //       if (firstTime === 'yes') {
  //         Actions.reset('tour');
  //       } else {
  //         this._userLoginRequest();
  //       }
  //     } else {
  //       Actions.reset('login');
  //     }
  //   });
  // }
  _checkOnJob = () => {
    const {onJob, jobInProgress, updateJobInProgress} = this.props;

    if (onJob) {
      if (jobInProgress.completed) {
        updateJobInProgress({});
      }
    }
  };
  // _fcmInit = async () => {
  //   // ------------- CHANNEL INIT --------------
  //   if (Util.isPlatformAndroid()) setChannelForAndroid();

  //   // ------------- iOS Permission --------------
  //   if (!Util.isPlatformAndroid()) getPermissions();

  //   // ------------- TOKEN INIT --------------

  //   updateDeviceToken();

  //   this.onTokenRefreshListener = firebase
  //     .messaging()
  //     .onTokenRefresh(fcmToken => {
  //       updateDeviceToken(fcmToken);
  //     });

  //   // ------------- NOTIFICATION LISTNER --------------

  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       // when app is in background
  //       // console.log({ background: notificationOpen });

  //       if (notificationOpen && notificationOpen.notification) {
  //         navigateOnNotificationTap(notificationOpen.notification._data);
  //       }
  //     });

  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       // when app is in foreground
  //       console.log({foreground: notification});

  //       if (notification) {
  //         showLocalNotification(notification._data);
  //       }
  //     });

  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     // when app is in closed, and opened by clicking notification
  //     console.log('getInitialNotification', notificationOpen);
  //     if (notificationOpen && notificationOpen.notification) {
  //       navigateOnNotificationTap(notificationOpen.notification._data, true);
  //     }
  //   }
  // };

  _userLoginRequest = async () => {
    const userCredentials = await Util.getGenericPassword();
    // alert(gify(userCredentials));
    if (userCredentials && userCredentials.username != null) {
      console.log({userCredentials});
      this.props.userLoginRequest(
        {
          phone: userCredentials.username,
          password: userCredentials.password,
        },
        async success => {
          Util.hideLoader(this);
          console.log({successsuccess: success});
          if (success) {
            this._checkOnJob();
            Actions.reset('dashboard');
          } else {
            await Util.resetGenericPassword();
            Actions.reset('login');
          }
        },
      );
    } else {
      Actions.reset('login');
    }
  };
  handleSwitch() {
    this.setState({value: !this.state.value}, () => {
      changeBase(this.state.value);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />

        <Image
          source={Images.splash}
          style={{height: 170, width: 184}}
          resizeMode="contain"
        />

        <ActivityIndicator
          size="large"
          color={Colors.white}
          style={AppStyles.mTop30}
        />
        {false && (
          <View>
            <Switch
              disabled={false}
              trackColor={{
                true: Colors.accent,
                false: '#e5f2ec',
              }}
              thumbColor={Colors.white}
              value={this.state.value}
              onChange={() => {
                this.handleSwitch();
              }}
            />
            <Text color="white">
              Enviroment : {this.state.value ? 'Dev' : 'Staging'}
            </Text>
            <TouchableOpacity onPress={() => this.initialSetup()}>
              <Text color="white">Press to start app</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
import {from} from 'seamless-immutable';

const mapStateToProps = ({user, general, jobs}) => ({
  userData: user.data,
  csrf: general.csrf_token,
  isFirstTime: general.isFirstTime,
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});

const actions = {getCsrfTokenRequest, userLoginRequest, updateJobInProgress};

export default connect(mapStateToProps, actions)(Welcome);

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import ProfileView from './ProfileView';
import {
  profileDataRequest,
  driverLogoutRequest,
} from '../../actions/UserActions';
import {getCsrfTokenRequest} from '../../actions/GeneralActions';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';

import _ from 'lodash';

class ProfileController extends React.Component {
  constructor() {
    super();
    this.state = {loading: true, logs: '', num: 0};
    ProfileController.instance = this;
  }
  static propTypes = {};
  static defaultProps = {};

  // onClick = () => {
  //   this.props.logout();
  //   util.resetGenericPassword();
  // };

  componentDidMount() {
    let newLogs = _.cloneDeep(this.state.logs);
    let newNum = _.cloneDeep(this.state.num);
    this.initialRequest();
  }

  static onEnter() {
    if (ProfileController.instance) {
      ProfileController.instance._onEnter();
    }
  }

  //when user comeback on profile screen then request again for updated data
  _onEnter() {
    this.initialRequest();
  }

  //intial request
  initialRequest = () => {
    this.props.profileDataRequest(() => {
      this.setState({loading: false});
    });
  };

  //user click on logout
  handleLogout = () => {
    if (!this.props.onJob) {
      this.RBSheet.open();
    } else {
      util.topAlert('Con not logout while performing job', true);
    }
  };

  sureLogout = () => {
    this.RBSheet.close();
    this.props.driverLogoutRequest(() => {
      this.props.getCsrfTokenRequest();
      Actions.reset('login');
      // removing data from keychain
      util.resetGenericPassword();
    });
  };

  //logout bottom sheet cancel
  cancelLogout = () => {
    this.RBSheet.close();
  };

  render() {
    const {loading, logs} = this.state;

    return (
      <ProfileView
        {...this.props}
        onClick={this.onClick}
        driverProfile={this.props.driverProfile}
        loading={loading}
        handleLogout={this.handleLogout}
        bottomSheetRef={ref => {
          this.RBSheet = ref;
        }}
        cancelLogout={this.cancelLogout}
        sureLogout={this.sureLogout}
        startTracking={this.startTracking}
        stopTracking={this.stopTracking}
        logs={logs}
        clearLogs={this.clearLogs}
      />
    );
  }
}
const mapStateToProps = ({user, jobs}) => ({
  driverProfile: user.profileData,
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});
const actions = {profileDataRequest, driverLogoutRequest, getCsrfTokenRequest};
export default connect(mapStateToProps, actions)(ProfileController);

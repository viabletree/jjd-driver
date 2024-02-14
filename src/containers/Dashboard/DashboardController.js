import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import DashboardView from './DashboardView';
import _ from 'lodash';
import util from '../../util';
import {removePassword} from '../../actions/UserActions';

import {Platform} from 'react-native';

class DashboardController extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  static propTypes = {};
  static defaultProps = {};
  async componentDidMount() {
    Platform.OS === 'android'
      ? await this.registerAppWithFCM()
      : await this.requestPermission();
    /*checking if user has successfully completed the onboarding 
    process,so that the password can be stores to keychain for future use*/
    const {passData} = this.props;
    //if passData is not empty user have recently completed the onboarding and passData needs to be stored in keychain
    if (!_.isEmpty(passData)) {
      util.setGenericPassword(passData.phone, passData.pass);
      //once password is saved. remove it so on next login it dose not update the password
      this.props.removePassword();
    }
  }
  async requestPermission() {
    const granted = messaging().requestPermission();
    if (granted) {
      // console.log('User granted messaging permissions!');
      await this.registerAppWithFCM();
    } else {
      // console.log('User declined messaging permissions :(');
    }
  }
  async registerAppWithFCM() {
    await messaging().registerForRemoteNotifications();
  }
  render() {
    return <DashboardView {...this.props} />;
  }
}
const mapStateToProps = ({user}) => ({passData: user.passData});
const actions = {removePassword};
export default connect(mapStateToProps, actions)(DashboardController);

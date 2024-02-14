// @flow
import React from 'react';
import {connect} from 'react-redux';
import {Stack, Scene, Router, Actions, Tabs} from 'react-native-router-flux';

import styles from './styles';
import {Colors} from '../theme';

import {
  Login,
  Welcome,
  Tour,
  Otp,
  VehicleDetail,
  Dashboard,
  OnBoarding,
  AddressAutoComplete,
  AdditionalVehicleInfo,
  Approval,
  AvailableJobs,
  AcceptedJobs,
  AcceptedJobDetails,
  Availability,
  Profile,
  JobDetails,
  ChooseVehicle,
  PerformJob,
  JobCompleteDetail,
  NewJobReceiver,
} from '../containers';
import {Tabbar} from '../components';
import {from} from 'seamless-immutable';

function onBackPress() {
  if (Actions.state.index === 0) {
    return false;
  }
  Actions.pop();
  return true;
}

const navigator = Actions.create(
  <Stack
    key="root"
    titleStyle={styles.title}
    headerStyle={styles.header}
    headerTintColor={Colors.navbar.text}>
    <Tabs
      key="dashboard"
      swipeEnabled={false}
      tabBarComponent={() => <Tabbar />}
      hideNavBar>
      <Stack key="available_jobs" title="Available Jobs">
        <Scene key="available_jobs" component={AvailableJobs} hideNavBar />
      </Stack>
      <Stack key="accepted_jobs" title="My Jobs">
        <Scene key="accepted_jobs" component={AcceptedJobs} hideNavBar />
      </Stack>
      <Stack key="availability" title="Availability">
        <Scene key="availability" component={Availability} hideNavBar />
      </Stack>
      <Stack key="profile" title="Profile">
        <Scene key="profile" component={Profile} hideNavBar />
      </Stack>
    </Tabs>
    <Scene key="login" component={Login} hideNavBar />
    <Scene key="welcome" component={Welcome} hideNavBar initial />
    <Scene key="tour" component={Tour} hideNavBar />
    {/* <Scene key="dashboard" component={Dashboard} hideNavBar /> */}
    <Scene key="otp" component={Otp} hideNavBar />
    <Scene key="vehicleDetail" component={VehicleDetail} hideNavBar />
    <Scene key="onBoarding" component={OnBoarding} hideNavBar />
    <Scene key="chooseVehicle" component={ChooseVehicle} hideNavBar />
    <Scene
      key="addressAutoComplete"
      component={AddressAutoComplete}
      hideNavBar
    />
    <Scene
      key="additionalVehicleInfo"
      component={AdditionalVehicleInfo}
      hideNavBar
    />
    <Scene key="approval" component={Approval} hideNavBar />
    <Scene key="jobDetails" component={JobDetails} hideNavBar />
    <Scene key="acceptedJobDetails" component={AcceptedJobDetails} hideNavBar />
    <Scene key="performJob" component={PerformJob} hideNavBar />
    <Scene key="JobCompleteDetail" component={JobCompleteDetail} hideNavBar />
    <Scene key="newJobReceiver" component={NewJobReceiver} hideNavBar />
  </Stack>,
);

export default () => (
  <AppNavigator navigator={navigator} backAndroidHandler={onBackPress} />
);

const AppNavigator = connect()(Router);

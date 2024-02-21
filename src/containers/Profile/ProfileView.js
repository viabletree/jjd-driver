import React from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {CustomNavbar, BottomSheetAlert, Text} from '../../components';
import _ from 'lodash';
import styles from './ProfileStyles';
import {Colors, Fonts, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import util from '../../util';
import LinearGradient from 'react-native-linear-gradient';

export default function ProfileView(props) {
  const {
    driverProfile,
    loading,
    handleLogout,
    bottomSheetRef,
    cancelLogout,
    sureLogout,
    onJob,
    jobInProgress,
  } = props;

  return (
    // <NewJobReceiver />
    <View style={[styles.container, onJob && AppStyles.pBottom55]}>
      {onJob && (
        <TouchableOpacity
          onPress={() =>
            Actions.acceptedJobDetails({jobId: jobInProgress.delivery})
          }
          style={[AppStyles.boxShadow, styles.onJob]}>
          <LinearGradient
            colors={Colors.redGradient}
            style={[AppStyles.flex, AppStyles.centerInner]}>
            <Text size={Fonts.size.xx} color={Colors.white} numberOfLines={1}>
              Performing a job
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <CustomNavbar
        title={props.title}
        hasBack={false}
        titleColor={Colors.white}
        style={styles.navBar}
      />

      {loading && (
        <ActivityIndicator style={AppStyles.mTop20} color={Colors.accent} />
      )}

      {!loading && (
        <ScrollView>
          {/* profile row start */}
          <View style={styles.profileRow}>
            <Image
              source={{uri: driverProfile.driver_profile[0].image.secure_url}}
              blurRadius={2}
              style={styles.profileImgBlur}
            />
            <View style={styles.overlay} />

            <View style={styles.logoutRow}>
              <TouchableOpacity
                onPress={() => {
                  handleLogout();
                }}>
                <Text size={Fonts.size.xv} color={Colors.white} type="bold">
                  Logout
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.absoluteRow}>
              <Image
                source={{uri: driverProfile.driver_profile[0].image.secure_url}}
                style={styles.profileImgAvatar}
              />
              <View
                style={[
                  AppStyles.flexRow,
                  AppStyles.justifyContentCenter,
                  AppStyles.mTop15,
                ]}>
                <Text
                  style={styles.driverName}
                  type="bold"
                  size={Fonts.size.xx}
                  color={Colors.white}>
                  {driverProfile.firstName}{' '}
                </Text>
                <Text
                  style={styles.driverName}
                  type="bold"
                  size={Fonts.size.xx}
                  color={Colors.white}>
                  {driverProfile.lastName}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.profileWrapper}>
            <TouchableOpacity
              style={[styles.rectangleBox, {backgroundColor: 'red'}]}>
              <Text color={Colors.white} size={Fonts.size.xiv}>
                Delete Account
              </Text>
            </TouchableOpacity>
          </View>

          {/* profile row end*/}
          <View style={styles.profileWrapper}>
            {/* earning row end*/}
            <View style={styles.rectangleBox}>
              <Text size={Fonts.size.xiv}>Personal Details</Text>
              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Home Postcode :
                </Text>
                <Text style={AppStyles.flex2} size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.driver_profile[0].homeAddress)
                    ? '-'
                    : driverProfile.driver_profile[0].homeAddress}
                  ,
                  {_.isEmpty(driverProfile.driver_profile[0].homeArea)
                    ? '-'
                    : driverProfile.driver_profile[0].homeArea}
                </Text>
              </View>
              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Email :
                </Text>
                <Text style={AppStyles.flex2} size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.email) ? '-' : driverProfile.email}
                </Text>
              </View>
              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Phone :
                </Text>
                <Text style={AppStyles.flex2} size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.phone) ? '-' : driverProfile.phone}
                </Text>
              </View>
            </View>
            {/* rectangleBox end */}
            {/* rectangleBox start */}
            <View style={[styles.rectangleBox, AppStyles.mBottom15]}>
              <Text size={Fonts.size.xiv}>Vehicle Details</Text>
              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Registration# :
                </Text>
                <Text style={AppStyles.flex2} size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.driver_profile[0].reg)
                    ? '-'
                    : driverProfile.driver_profile[0].reg}
                </Text>
              </View>
              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Van type :
                </Text>
                <Text
                  style={[AppStyles.flex2, {textTransform: 'capitalize'}]}
                  size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.driver_profile[0].wheelBase)
                    ? '-'
                    : driverProfile.driver_profile[0].wheelBase}
                </Text>
              </View>

              <View style={[AppStyles.flexRow, AppStyles.mTop10]}>
                <Text
                  style={AppStyles.flex}
                  size={Fonts.size.xii}
                  color={Colors.grey}>
                  Make & Model
                </Text>
                <Text style={AppStyles.flex2} size={Fonts.size.xiii}>
                  {_.isEmpty(driverProfile.driver_profile[0].makeModel)
                    ? '-'
                    : driverProfile.driver_profile[0].makeModel}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      )}

      {/* bottom sheet start */}
      <BottomSheetAlert
        getRef={ref => bottomSheetRef(ref)}
        title="Are you sure?"
        positiveButtonText="Yes"
        positiveButtonBgColor={Colors.bitterSweet}
        positiveButtonTextColor={Colors.white}
        positiveButtonEvent={sureLogout}
        negativeButtonText="Cancel"
        negativeButtonBgColor={Colors.gallery}
        negativeButtonTextColor={Colors.black}
        negativeButtonEvent={cancelLogout}
      />
      {/* bottom sheet end */}
    </View>
  );
}

import React from 'react';
import {
  View,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  CustomNavbar,
  BookingStops,
  Button,
  BookingInfo,
  BottomSheetAlert,
  BookingDurationDetail,
  JobSummary,
  AnimatedButton,
} from '../../../components';
import LinearGradient from 'react-native-linear-gradient';

import styles from './AcceptedJobDetailsStyles';
import {Colors, Fonts, Metrics, AppStyles} from '../../../theme';
import util from '../../../util';
import _ from 'lodash';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Actions} from 'react-native-router-flux';

export default function AcceptedJobDetailsView(props) {
  const {
    job,
    jobInProgress,
    declineJobPress,
    startJob,
    startJobLoading,
    sureBtnLoading,
    loading,
    onJob,
    endJob,
    completeSheetRef,
    completeData,
    timeSpent,
  } = props;
  let isthisJobInProgress = job.delivery === jobInProgress.delivery;
  let book_number = '--';
  if (job.hasOwnProperty('booking_number')) {
    book_number = job.booking_number;
  }
  let show_buttons = true;
  if (job.hasOwnProperty('is_completed')) {
    if (job.is_completed) {
      show_buttons = false;
    }
  }
  return (
    <>
      <View style={styles.container}>
        <CustomNavbar
          style={styles.navBar}
          whiteBack
          titleColor={Colors.white}
          title={`Job# ${book_number}`}
        />
        {/* content start */}
        {loading && <ActivityIndicator color={Colors.accent} />}
        {!loading && _.isEmpty(job) && (
          <View style={styles.infoText}>
            <Text>No job found</Text>
          </View>
        )}

        {!loading && !_.isEmpty(job) && (
          <View style={AppStyles.flex}>
            <ScrollView
              contentContainerStyle={{
                paddingBottom: show_buttons ? 100 : Metrics.listBottomPadding,
              }}
              showsVerticalScrollIndicator={false}>
              {/* top Info start*/}
              <View style={styles.content}>
                <JobSummary
                  data={job}
                  startJobDetail={true}
                  acceptJobDetail={true}
                />
              </View>
              {/* content start */}
              {/* bottom sheet start */}

              {/* bottom sheet end */}
              {/* accept decline job end */}
              {/* content end */}
            </ScrollView>
            {show_buttons && (
              <View style={styles.buttonsParent}>
                <View style={{flex: 1}}>
                  {onJob && !isthisJobInProgress && (
                    <TouchableOpacity
                      onPress={() => {
                        Actions.pop();
                        Actions.acceptedJobDetails({
                          jobId: jobInProgress.delivery,
                          job: jobInProgress,
                        });
                      }}
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#6e6666',
                        paddingVertical: 15,
                        borderRadius: 30,
                      }}>
                      <Text color="white" type="bold">
                        Go back to active job
                      </Text>
                    </TouchableOpacity>
                  )}
                  {!onJob && (
                    <AnimatedButton
                      loading={startJobLoading}
                      text={'Hold to start timer'}
                      onPress={() => startJob()}
                      buttonColors={[Colors.redGradient, Colors.blackGradient]}
                    />
                  )}
                  {onJob && isthisJobInProgress && (
                    <View style={[AppStyles.centerInner, {marginVertical: 20}]}>
                      <Text
                        size={Fonts.size.xxx}
                        color={Colors.accentLight}
                        numberOfLines={1}>
                        {timeSpent}
                      </Text>
                    </View>
                  )}
                  {onJob && isthisJobInProgress && (
                    <AnimatedButton
                      loading={startJobLoading}
                      text={'Hold to end job'}
                      onPress={() => endJob()}
                      buttonColors={[Colors.blackGradient, Colors.redGradient]}
                    />
                  )}

                  {!isthisJobInProgress && (
                    <View style={{flex: 1, marginTop: 10}}>
                      <AnimatedButton
                        loading={sureBtnLoading}
                        text=" Hold to decline"
                        onPress={() => declineJobPress(job.delivery)}
                        buttonColors={[
                          Colors.blackGradient,
                          Colors.redGradient,
                        ]}
                      />
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        )}
        <RBSheet
          closeOnPressMask={false}
          animationType="fade"
          ref={ref => {
            completeSheetRef(ref);
          }}
          closeOnDragDown={false}
          height={Metrics.screenHeight / 2}
          duration={250}
          customStyles={{
            container: styles.bottomSheetContainer,
          }}>
          <ScrollView contentContainerStyle={styles.doneBs}>
            <Text style={AppStyles.mTop20} size={Fonts.size.xx}>
              Well done job done!
            </Text>
            <Text textAlign="center" color="#c50000" size={Fonts.size.xviii}>
              Your are responsible for collecting the cash from customer
            </Text>

            <View style={styles.detailBox}>
              {/* row */}
              <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
                <View style={AppStyles.mRight10}>
                  <Text size={Fonts.size.xiv}>
                    Total cash to collect from the customer :
                    <Text
                      style={
                        AppStyles.fontWeightBold
                      }>{` £${util.toFixedIfNecessary(
                      completeData.cashToCollect || 0,
                      2,
                    )}`}</Text>
                  </Text>
                  <Text size={Fonts.size.xiv}>
                    Time spent on job :
                    <Text
                      style={
                        AppStyles.fontWeightBold
                      }>{` ${util.getHoursMinutesFromMinutes(
                      completeData.durration,
                    )}`}</Text>
                  </Text>
                  <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                    <Text size={Fonts.size.xiv}>
                      Overtime duration :
                      <Text type="bold">{` ${util.getHoursMinutesFromMinutes(
                        completeData.overtime,
                      )}`}</Text>
                    </Text>
                  </View>
                  {/* original_reward_pence
              overtime_min */}
                  <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                    <Text size={Fonts.size.xv}>
                      Driver fee :
                      <Text type="bold">{` £${util.toFixedIfNecessary(
                        completeData.driverFee,
                        2,
                      )}`}</Text>
                    </Text>
                  </View>
                  <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                    <Text size={Fonts.size.xv}>Transfer to JJD :</Text>
                    <Text type="bold" style={AppStyles.mLeft5}>
                      {` £${util.toFixedIfNecessary(
                        completeData.returnJJD || 0,
                        2,
                      )}`}
                    </Text>
                  </View>
                </View>
              </View>
              {/* end row */}
            </View>

            <Button
              onPress={() => Actions.reset('dashboard')}
              background="#c50000"
              color="white"
              type="bold"
              style={{marginTop: 20, marginHorizontal: 30}}>
              Done
            </Button>
          </ScrollView>
        </RBSheet>
      </View>
    </>
  );
}

// cashToCollect: 48.96,
// deposit: 30.48,
// driverFee: 0,
// durration: 287,
// initalCost: 78.48,
// overtime: 167,
// overtimeCharge: 96,
// returnJJD: 0,
// totalCost: 79.44,

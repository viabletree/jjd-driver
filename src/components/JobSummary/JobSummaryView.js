import React from 'react';
import {View, ScrollView} from 'react-native';
import {
  BookingStops,
  Button,
  BookingInfo,
  BottomSheetAlert,
  BookingDurationDetail,
} from '../../components';
import styles from './JobSummaryStyles';
import {AppStyles, Colors, Metrics} from '../../theme';

export default function JobSummaryView(props) {
  const {
    data,
    acceptPress,
    acceptBtn,
    bottomSheetRef,
    handlePressOnCancle,
    helperTitle,
    helperSubeTitle,
    yesBtnLoader,
    acceptBtnLoading,
    jobCompleteDetail,
    acceptJobDetail,
    showStops,
    CompleteJob,
    extraScroll,
  } = props;

  const {delivery} = data;

  return (
    <>
      <ScrollView
        contentContainerStyle={{
          paddingBottom: extraScroll ? 100 : Metrics.listBottomPadding,
        }}
        showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.flex]}>
          <BookingInfo data={data} CompleteJob={CompleteJob} />
          <View
            style={[styles.bookingWrapper, acceptBtn && styles.marginBottom]}>
            <BookingStops job={data} callback={() => {}} />
            <BookingDurationDetail
              job={data}
              jobCompleteDetail={jobCompleteDetail}
              acceptJobDetail={acceptJobDetail}
            />
          </View>
        </View>
      </ScrollView>

      {acceptBtn && (
        <Button
          onPress={() => {
            acceptPress(delivery);
          }}
          style={styles.acceptButton}
          coloStartEndTime
          StartEndTimer={Colors.white}
          type="bold"
          isLoading={acceptBtnLoading}
          indicatorColor={Colors.white}
          textStyle={{zIndex: 2}}
          color={Colors.white}>
          Accept Job
        </Button>
      )}

      {/* bottom sheet start */}
      <BottomSheetAlert
        getRef={ref => bottomSheetRef(ref)}
        title={helperTitle}
        subTitle={helperSubeTitle}
        positiveButtonText="Yes"
        positiveButtonBgColor={Colors.accent}
        positiveButtonTextColor={Colors.white}
        positiveButtonEvent={() => {
          props.handlePressOnYes(delivery);
        }}
        positiveButtonLoading={yesBtnLoader}
        negativeButtonText="Cancel"
        negativeButtonBgColor={Colors.gallery}
        negativeButtonTextColor={Colors.black}
        negativeButtonEvent={() => {
          handlePressOnCancle();
        }}
      />
      {/* bottom sheet end */}
    </>
  );
}

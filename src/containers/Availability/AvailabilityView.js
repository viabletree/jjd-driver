import React from 'react';
import {
  View,
  Image as RnImage,
  StatusBar,
  Switch,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  AvailabilityListItem,
  StartEndTime,
  BottomSheetAlert,
} from '../../components';
import styles from './AvailabilityStyles';
import {Colors, AppStyles, Fonts, Metrics} from '../../theme';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import RBSheet from 'react-native-raw-bottom-sheet';
import OnlineSelector from './OnlineSelector';
import {Actions} from 'react-native-router-flux';
import LinearGradient from 'react-native-linear-gradient';

export default function AvailabilityView(props) {
  const {
    onlineToday,
    onlineTodayToggle,
    markedDates,
    availableDays,
    bottomSheetRef,
    timeItemClick,
    setTimeOf,
    endIndex,
    startIndex,
    cancelBottomSheet,
    timeUpdateDone,
    dayLoading,
    setGoOnline,
    goUnavailable,
    offlineMessage,
    confirmBottomSheetRef,
    cancelConfirmBottomSheet,
    onCalendarDateClick,
    unmarkDayConfirm,

    jobInProgress,
    onJob,
    calendarClickedData,
  } = props;
  let today = moment();
  const startDate = today.format('YYYY-MM-DD');
  let endDate = today.add(13, 'days').format('YYYY-MM-DD');
  let isToday = moment(calendarClickedData.dateString).isAfter(moment(), 'day');
  const cnfrmSheetMessage = !isToday
    ? "Today's availability will be removed."
    : moment(calendarClickedData.dateString).format('Do MMM YYYY') +
      "'s availability will be removed.";
  return (
    <View style={[styles.container, onJob && styles.pBottom65]}>
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
      <View style={styles.todayonline}>
        <View style={styles.onlineTodayLabelParent}>
          <Text size={Fonts.size.xvi} type="bold">
            Go available for today
          </Text>
          {onlineToday && (
            <Text size={Fonts.size.xii}>I am available full day from now</Text>
          )}
          {!onlineToday && (
            <Text size={Fonts.size.xii} color="#ff5d5d">
              {offlineMessage}
            </Text>
          )}
        </View>
        <Switch
          thumbColor={Colors.white}
          trackColor={{
            true: Colors.accent,
            false: Colors.grey,
          }}
          value={onlineToday}
          onChange={() => {
            onlineTodayToggle();
          }}
        />
      </View>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarHeading}>
          <Text color={Colors.white} style={{textAlign: 'center'}}>
            Your availability for full-day multi drop over the next 2 weeks
          </Text>
        </View>
        <View style={styles.calendar}>
          <Calendar
            theme={{
              selectedDayBackgroundColor: Colors.accent,
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#2d4150',
              arrowColor: Colors.accent,
            }}
            markedDates={markedDates}
            onDayPress={day => {
              onCalendarDateClick(day);
            }}
            minDate={startDate}
            maxDate={endDate}
            hideExtraDays
          />

          {/* Separator */}

          <View>
            <View style={styles.line} />
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.spaceBetween,
                AppStyles.paddingHorizontalBase,
              ]}>
              <Text size={Fonts.size.xiv} color={Colors.text.grey}>
                Timings of Selected Days
              </Text>
              <Text
                size={Fonts.size.xiv}
                color={Colors.linkBlue}
                style={styles.textUnderline}>
                Tap to change timings
              </Text>
            </View>
            {availableDays.length < 1 && (
              <View style={styles.noDataParent}>
                <Text
                  size={Fonts.size.xvi}
                  style={{textAlign: 'center'}}
                  color={Colors.bitterSweet1}>
                  Unavailable
                </Text>
              </View>
            )}
            {availableDays.length > 0 && (
              <FlatList
                style={[AppStyles.flex, AppStyles.mTop15]}
                data={availableDays}
                keyExtractor={item => item.title}
                renderItem={({item, index}) => {
                  return (
                    <AvailabilityListItem
                      item={item}
                      timeCallback={() => {
                        timeItemClick(index);
                      }}
                    />
                  );
                }}
              />
            )}
          </View>
        </View>
        <RBSheet
          animationType="fade"
          ref={ref => bottomSheetRef(ref)}
          closeOnDragDown={false}
          closeOnPressMask={false}
          height={setGoOnline ? 600 : 400}
          duration={250}
          customStyles={{
            container: {
              borderTopLeftRadius: 7,
              borderTopRightRadius: 7,
              paddingHorizontal: 20,
              paddingVertical: 20,
              alignItems: 'center',
              justifyContent: 'center',
            },
            wrapper: {
              backgroundColor: 'rgba(197 ,0, 0, 0.4)',
            },
          }}>
          {setGoOnline && (
            <OnlineSelector
              cancelCallback={cancelBottomSheet}
              goUnavailable={goUnavailable}
            />
          )}
          {!setGoOnline && (
            <StartEndTime
              title="Set time availability"
              dateInfo={`${moment(setTimeOf).format('dddd Do, MMMM')}`}
              cancelCallback={cancelBottomSheet}
              startIndex={startIndex}
              endIndex={endIndex}
              timeUpdateDone={timeUpdateDone}
              dayLoading={dayLoading}
            />
          )}
        </RBSheet>
        <BottomSheetAlert
          title="Are you sure ?"
          subTitle={cnfrmSheetMessage}
          getRef={ref => confirmBottomSheetRef(ref)}
          positiveButtonText="Sure"
          positiveButtonBgColor={Colors.bitterSweet}
          positiveButtonTextColor={Colors.white}
          positiveButtonEvent={() => {
            unmarkDayConfirm();
          }}
          negativeButtonText="Cancel"
          negativeButtonBgColor={Colors.gallery}
          negativeButtonTextColor={Colors.black}
          negativeButtonEvent={() => {
            cancelConfirmBottomSheet();
          }}
        />
      </ScrollView>
    </View>
  );
}

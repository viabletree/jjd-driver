import React from 'react';
import _ from 'lodash';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../components';
import styles from './BookingDurationDetailStyles';
import {Fonts, Colors, AppStyles} from '../../theme';
import util from '../../util';
import moment from 'moment';
export default function BookingDurationDetailView(props) {
  const {job, jobCompeleteDetail, acceptJobDetail, smsCall} = props;
  const {
    duration_minutes,
    user,
    note_driver,
    loading_time_minutes,
    unloading_time_minutes,
    accepted,
    inventory,
    pickup,
  } = job;

  let inventoryJson = JSON.parse(inventory);
  let diff = util.millisToMinutesAndSeconds(moment(pickup).diff(moment()));
  diff = util.minutesToHours(diff, false, true);
  const showCall = diff < 24;

  return (
    <>
      {(false || false) && (
        <View
          style={[
            styles.stopItemParent,
            {
              flexDirection: 'column',
              alignItems: 'flex-start',
              paddingVertical: 12,
              paddingHorizontal: 16,
            },
          ]}>
          <Text color={Colors.text.secondary} size={Fonts.size.xiv}>
            Booking Duration:
          </Text>
          <Text color={Colors.text.primary} size={Fonts.size.xvi} type="bold">
            {`Total Duration: ${util.minsToPresentableText(
              duration_minutes,
              true,
            )}`}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={styles.lShape} />
              <View style={styles.lShape} />
            </View>
            <View style={{marginStart: 10, marginTop: 16}}>
              <Text size={Fonts.size.xii} color={Colors.text.grey}>
                Drive time:
              </Text>
              <Text size={Fonts.size.xii} color={Colors.text.grey}>
                Loading/Unloading time:
              </Text>
            </View>
            <View style={{marginStart: 10, marginTop: 16}}>
              <Text size={Fonts.size.xii} color={Colors.text.primary}>
                {util.minsToPresentableText(
                  duration_minutes -
                    loading_time_minutes -
                    unloading_time_minutes,
                )}
              </Text>
              <Text size={Fonts.size.xii} color={Colors.text.primary}>
                {util.minsToPresentableText(
                  loading_time_minutes + unloading_time_minutes,
                )}
              </Text>
            </View>
          </View>
        </View>
      )}
      {/* duration Info end*/}
      {/* booked by start */}
      {(false || jobCompeleteDetail || acceptJobDetail) && (
        <View style={styles.stopItemParent}>
          <View style={[AppStyles.flex]}>
            <Text size={Fonts.size.xvi} color={Colors.text.grey}>
              Booked by:
            </Text>
            <Text
              size={Fonts.size.xvi}
              color={Colors.text.primary}
              type="bold"
              numberOfLines={1}
              ellipsizeMode="tail">
              {!_.isEmpty(user?.firstName) && user?.firstName}{' '}
              {!_.isEmpty(user?.lastName) && user?.lastName}
            </Text>
          </View>

          {accepted && (
            <View style={[AppStyles.flexRow, AppStyles.flex]}>
              <View style={[AppStyles.flex, AppStyles.mTop10]}>
                {showCall ? (
                  <>
                    <Text size={Fonts.size.xi}>Don’t make excuses!</Text>
                    <Text size={Fonts.size.xi}>Keep the customer informed</Text>
                  </>
                ) : (
                  <>
                    <Text size={Fonts.size.xi} color="black">
                      Calls/SMS & Go will be enabled
                    </Text>
                    <Text size={Fonts.size.xi}>24h before arrival time</Text>
                  </>
                )}
              </View>
              <View
                style={[
                  AppStyles.flex,
                  AppStyles.flexRow,
                  AppStyles.centerInner,
                ]}>
                <TouchableOpacity
                  activeOpacity={showCall ? 0 : 1}
                  onPress={() => (showCall ? smsCall(user.phone, false) : null)}
                  style={[
                    AppStyles.mRight15,
                    styles.callSmsButton,
                    showCall && {backgroundColor: Colors.accent},
                  ]}>
                  <Text color={Colors.white} type="bold" size={Fonts.size.xvi}>
                    SMS
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={showCall ? 0 : 1}
                  onPress={() => (showCall ? smsCall(user.phone, true) : null)}
                  style={[
                    styles.callSmsButton,
                    showCall && {backgroundColor: Colors.accent},
                  ]}>
                  <Text color={Colors.white} type="bold" size={Fonts.size.xvi}>
                    CALL
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
      {/* booked by end*/}
      {/*note start */}
      {(false || jobCompeleteDetail || acceptJobDetail) && (
        <View
          style={[
            styles.stopItemParent,
            {
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          ]}>
          <Text size={Fonts.size.xvi} color={Colors.text.grey}>
            Special instructions:
          </Text>
          <Text
            size={Fonts.size.xii}
            color={Colors.text.primary}
            style={AppStyles.mTop5}>
            {note_driver ? note_driver : 'No note found for the driver'}
          </Text>
        </View>
      )}
      {(false || jobCompeleteDetail || acceptJobDetail) && (
        <View
          style={[
            styles.stopItemParent,
            {
              paddingHorizontal: 16,
              paddingVertical: 12,
              flexDirection: 'column',
              alignItems: 'flex-start',
            },
          ]}>
          <Text size={Fonts.size.xvi} color={Colors.text.grey}>
            Inventory:
          </Text>
          {inventoryJson.length < 1 && (
            <Text
              size={Fonts.size.xii}
              color={Colors.text.primary}
              style={AppStyles.mTop5}>
              Not provided
            </Text>
          )}
          {inventoryJson.length > 0 && (
            <>
              {inventoryJson.map(item => {
                return (
                  <View>
                    <Text size={Fonts.size.xii} color={Colors.text.primary}>{`${
                      item.title
                    } : ${item.quantity}`}</Text>
                  </View>
                );
              })}
            </>
          )}
        </View>
      )}
    </>
  );
}

import React from 'react';
import {View, Image as RnImage} from 'react-native';
import _ from 'lodash';
import styles from './BookingInfoStyles';
import {Colors, AppStyles, Fonts, Images} from '../../theme';
import {Text, Image} from '../../components';
import util from '../../util';
import {liftingPowerConstants, TIME_FORMAT1} from '../../constants';

export default function BookingInfoView(props) {
  const {
    distance_meter,
    duration_minutes,
    reward_pence,
    location,
    vehicle,
    name,
    numberOfStops,
    ride_along,
    liftingpower,
    status,
    booking_number,
    extra_charge_value,
    extra_charge_mins,
    driver_overtime_fee_fraction,
  } = props.data;
  const {CompleteJob, data} = props;
  // calculate total stop
  const addtionalStop = location ? location.length : 0;
  return (
    <View style={styles.container}>
      {/* start row */}
      <View style={[styles.boxWrap]}>
        <View style={[AppStyles.flexRow, styles.colWrapper]}>
          <View
            style={[
              AppStyles.flex,
              styles.boxCol,
              {backgroundColor: '#c50000'},
            ]}>
            <Text
              size={Fonts.size.xx}
              color={Colors.white}
              style={[AppStyles.fontWeightBold]}>
              {util.meterToMiles(distance_meter)}
            </Text>
            <Text size={Fonts.size.x} color={Colors.white}>
              Distance
            </Text>
          </View>
          <View
            style={[
              AppStyles.flex,
              styles.boxCol,
              {backgroundColor: '#c50000'},
            ]}>
            <Text
              size={Fonts.size.xx}
              color={Colors.white}
              style={[AppStyles.fontWeightBold]}>
              {`${util.getHoursMinutesFromMinutes(duration_minutes)}`}
            </Text>
            <Text size={Fonts.size.x} color={Colors.white}>
              Duration
            </Text>
          </View>
          <View
            style={[
              AppStyles.flex,
              styles.boxCol,
              AppStyles.mRight0,
              {backgroundColor: '#c50000'},
            ]}>
            <Text
              size={Fonts.size.xx}
              color={Colors.white}
              style={[AppStyles.fontWeightBold]}>
              {CompleteJob
                ? util.penceToPoundsWithDecimal(props.data.quote?.reward)
                : util.penceToPoundsWithDecimal(reward_pence)}
            </Text>
            <Text size={Fonts.size.x} color={Colors.white}>
              Earning
            </Text>
          </View>
        </View>
      </View>
      {/* job id start */}
      <View style={styles.detailBox}>
        {/* row */}
        <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
          <View style={AppStyles.mRight10}>
            <Text
              type="bold"
              size={Fonts.size.xiv}>{`job# ${booking_number}`}</Text>
          </View>
        </View>
        {/* end row */}
      </View>
      {/* job id end */}
      {status == 'Complete' && (
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
                  data.cash_collect || 0,
                  2,
                )}`}</Text>
              </Text>
              <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                <Text size={Fonts.size.xiv}>
                  Overtime duration :
                  <Text type="bold">{` ${util.getHoursMinutesFromMinutes(
                    data.overtime_min,
                  )}`}</Text>
                </Text>
              </View>
              {/* original_reward_pence
              overtime_min */}
              <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                <Text size={Fonts.size.xv}>
                  Driver fee :
                  <Text type="bold">{` ${util.penceToPoundsWithDecimal(
                    data?.quote?.reward,
                  )}`}</Text>
                </Text>
              </View>
              <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
                <Text size={Fonts.size.xv}>Transfer to JJD :</Text>
                <Text type="bold" style={AppStyles.mLeft5}>
                  {` £${util.toFixedIfNecessary(data.jjd_return || 0, 2)}`}
                </Text>
              </View>
            </View>
          </View>
          {/* end row */}
        </View>
      )}

      <View style={styles.detailBox}>
        {/* row */}
        <View style={[AppStyles.flexRow, AppStyles.spaceBetween]}>
          <View style={AppStyles.mRight10}>
            <Text size={Fonts.size.xviii} style={AppStyles.fontWeightBold}>
              {name}
            </Text>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop15,
              ]}>
              <Text size={Fonts.size.xiv} type="bold">
                {vehicle?.title}
              </Text>
            </View>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop10,
              ]}>
              <Text size={Fonts.size.xiv} type="bold">
                {liftingPowerConstants[liftingpower || 0]}
              </Text>
            </View>

            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop10,
              ]}>
              <Text size={Fonts.size.xiv} type="bold">
                Passenger(s) :
              </Text>
              <Text size={Fonts.size.xiv} type="bold" style={AppStyles.mLeft5}>
                {ride_along}
              </Text>
            </View>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop10,
              ]}>
              <Text size={Fonts.size.xiv} type="bold">
                No. of Stops :
              </Text>
              <Text size={Fonts.size.xiv} type="bold" style={AppStyles.mLeft5}>
                {typeof numberOfStops === 'number'
                  ? numberOfStops
                  : numberOfStops.length}
              </Text>
            </View>
            <View
              style={[
                AppStyles.flexRow,
                AppStyles.alignItemsCenter,
                AppStyles.mTop10,
              ]}>
              <Text size={Fonts.size.xiv} type="bold">
                Overtime rate: :
              </Text>
              <Text size={Fonts.size.xiv} type="bold" style={AppStyles.mLeft5}>
                {`£${(
                  extra_charge_value *
                  (1 - driver_overtime_fee_fraction / 100)
                ).toFixed(2)} every ${extra_charge_mins} mins`}
              </Text>
            </View>
          </View>
        </View>
        {/* end row */}
      </View>
      {/* end row */}
    </View>
  );
}

import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image, AnimatedButton} from '../../components';
import styles from './AvailableJobItemStyles';
import {AppStyles, Colors, Fonts, Images} from '../../theme';
import util from '../../util';
import moment from 'moment';
export default function AvailableJobItemView(props) {
  const {job, type, onItemCLick, startJobLoading, acceptJob} = props;
  const {
    delivery,
    name,
    pickup,
    distance_meter,
    duration_minutes,
    location,
    reward_pence,
    numberOfStops,
    numberOfItems,
    collectionRange,
    accepted,
  } = job;
  const milies = moment(pickup).diff(moment());
  const prevDate = milies < 0;
  let today = false;
  if (!prevDate) {
    today = !moment(pickup).isAfter(moment(), 'date');
  }
  let tomorrow = false;
  if (!prevDate) {
    tomorrow = !moment(pickup).isAfter(moment().add(1, 'days', 'date'));
  }

  return (
    <TouchableOpacity onPress={() => onItemCLick()} style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {/* Top part headings of job & earning title  */}
        <View>
          <Text type="regular" size={Fonts.size.xviii}>
            {util.capitalizeFirstLetter(name)}
          </Text>
          {/* start time label and time value */}
          <View style={styles.topHeading}>
            <RnImage
              source={Images.small_clock_black}
              style={styles.infoIcon}
            />
            <Text style={AppStyles.mLeft5} size={Fonts.size.xiv}>
              Arrival time:{' '}
              <Text type="bold" size={Fonts.size.xiv}>
                {today
                  ? 'Today'
                  : tomorrow
                  ? 'Tom'
                  : moment(pickup).format('ddd Do MMM')}
              </Text>
            </Text>
          </View>
          <View style={styles.topHeading}>
            <Text style={AppStyles.mLeft15} size={Fonts.size.xiv} type="bold">
              {`btw ${moment(pickup).format('hha')} & ${moment(pickup)
                .add(collectionRange, 'hours')
                .format('hha')}`}
            </Text>
          </View>
          {/* there is no item in design */}
          {/* No of Items */}
          {/* <View style={styles.topHeading}>
            <RnImage source={Images.small_box_black} style={styles.infoIcon} />
            <Text style={AppStyles.mLeft5} size={Fonts.size.xiv}>
              Number of Items:{' '}
              <Text type="bold" size={Fonts.size.xiv}>
                {numberOfItems}
              </Text>
            </Text>
          </View> */}
          <View style={styles.topHeading}>
            <RnImage
              source={Images.small_location_black}
              style={styles.infoIcon}
            />
            <Text style={AppStyles.mLeft5} size={Fonts.size.xiv}>
              Start location:{' '}
              <Text type="bold" size={Fonts.size.xiv}>
                {location.length > 0 ? location[0].postcode : '--'}
              </Text>
            </Text>
          </View>
        </View>
        <View>
          {/* actualAmount */}
          <Text size={Fonts.size.xiv} style={{textAlign: 'right'}}>
            Earning
          </Text>
          <Text size={Fonts.size.xx} type="extraBold">
            {util.penceToPoundsWithDecimal(reward_pence)}
          </Text>
        </View>
      </View>

      {/* Distance Duration additional Stops */}
      <View style={styles.bottomView}>
        {/* Distance */}
        <View>
          <Text size={Fonts.size.xii}>Total Distance</Text>
          <Text size={Fonts.size.xvi} type="bold">
            {`${util.meterToMiles(distance_meter, true)}`}
          </Text>
        </View>
        {/* Duration */}
        <View>
          <Text size={Fonts.size.xii}>Duration</Text>
          <Text size={Fonts.size.xvi} type="bold">
            {`${util.getHoursMinutesFromMinutes(duration_minutes)}`}
          </Text>
        </View>
        {/* Stops */}
        <View>
          <Text size={Fonts.size.xii}>Additional Stops</Text>
          <Text size={Fonts.size.xvi} type="bold">
            {`${
              typeof numberOfStops === 'number'
                ? numberOfStops
                : numberOfStops.length
            } Stops`}
          </Text>
        </View>
      </View>
      {!accepted && (
        <View
          style={{marginTop: 10, paddingHorizontal: 40, paddingVertical: 5}}>
          <AnimatedButton
            loading={startJobLoading}
            text="Hold to accept"
            onPress={() => acceptJob(delivery)}
            buttonColors={[Colors.redGradient, Colors.blackGradient]}
          />
        </View>
      )}
    </TouchableOpacity>
  );
}

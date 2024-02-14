import React from 'react';
import {View, Image as RnImage, ActivityIndicator} from 'react-native';
import {Text, Image} from '../../components';
import styles from './BookingStopsStyles';
import {Images, Fonts, Colors} from '../../theme';
import moment from 'moment';
import BookingStopItem from './BookingStopItem';
import util from '../../util';
import {element} from 'prop-types';
export default function BookingStopsView(props) {
  const {job, data, accepted, status} = props;
  const {pickup, location} = job;
  let diff = util.millisToMinutesAndSeconds(moment(pickup).diff(moment()));
  diff = util.minutesToHours(diff, false, true);
  const enableGo = diff < 24;

  return (
    <View style={styles.container}>
      <ActivityIndicator
        color={Colors.accent}
        size="large"
        style={styles.activityIndicator}
      />
      <View style={styles.content}>
        {data.map((item, index) => {
          return (
            <BookingStopItem
              data={item}
              key={'qwqw' + index}
              index={index}
              multiStop={location.length > 2}
              accepted={accepted}
              status={status}
              enableGo={enableGo}
            />
          );
        })}
      </View>
    </View>
  );
}

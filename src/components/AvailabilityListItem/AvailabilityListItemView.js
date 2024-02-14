import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../components';
import styles from './AvailabilityListItemStyles';
import PropTypes from 'prop-types';
import {AppStyles, Colors, Fonts} from '../../theme';

export default function AvailabilityListItemView(props) {
  const {item, timeCallback} = props;
  const {title, selectedDay, dateString, start, end} = item;
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        timeCallback(dateString);
      }}
      style={styles.container}>
      <View style={AppStyles.flexRow}>
        <Text
          color={Colors.text.grey}
          size={Fonts.size.xii}>{`${title} -  `}</Text>
        <Text size={Fonts.size.xiv}>{selectedDay}</Text>
      </View>
      <Text size={Fonts.size.xiv}>{`${start} - ${end}`}</Text>
    </TouchableOpacity>
  );
}
AvailabilityListItemView.propTypes = {
  item: PropTypes.object.isRequired,
  timeCallback: PropTypes.func.isRequired,
  someText: PropTypes.string,
};
AvailabilityListItemView.defaultProps = {};

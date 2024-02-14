import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../../components';
import styles from './CompleteJobItemStyles';
import {Fonts, AppStyles, Images} from '../../../theme';
import {DATE_FORMAT3, DATE_FORMAT4, DATE_FORMAT5} from '../../../constants';
import util from '../../../util';

export default function CompleteJobItemView(props) {
  const {data, onPress} = props;
  const {name, quote, delivery} = data;

  return (
    // row start
    <TouchableOpacity style={styles.comRow} onPress={onPress}>
      <View style={styles.textRow}>
        <Text size={Fonts.size.xviii} type="bold">
          {name}
        </Text>
        <Text size={Fonts.size.xiv}>Earning</Text>
      </View>
      <View style={styles.textRow}>
        <View style={[AppStyles.flexRow, AppStyles.alignItemsCenter]}>
          <Image
            source={Images.date_icon}
            style={styles.dateIcon}
            resizeMode="contain"
          />
          <Text size={Fonts.size.xiv}>
            {util.getFormattedDateTime(delivery.end_time, DATE_FORMAT5)}
          </Text>
        </View>
        <Text size={Fonts.size.xx} type="bold">
          {util.penceToPoundsWithDecimal(quote?.reward)}
        </Text>
      </View>
    </TouchableOpacity>
    // row end
  );
}

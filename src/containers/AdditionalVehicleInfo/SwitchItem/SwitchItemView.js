import React from 'react';
import {View, Image as RnImage, Switch} from 'react-native';
import {Text, Image} from '../../../components';
import styles from './SwitchItemStyles';
import {Images, AppStyles, Fonts, Colors} from '../../../theme';

export default function SwitchItemView(props) {
  const {title, subTitle, image, onChange, value, slug, disabled} = props;
  return (
    <View style={[styles.switchItem, disabled && styles.opacityDisable]}>
      <View style={styles.imgWrapper}>
        <Image source={image} style={styles.vehicleImage} />
        <View style={styles.contentWrapper}>
          <Text size={Fonts.size.xviii} style={AppStyles.mBottom10} type="bold">
            {title}
          </Text>
          <Text size={Fonts.size.xxxii}>{subTitle}</Text>
        </View>
      </View>
      <Switch
        disabled={disabled}
        trackColor={{
          true: Colors.accent,
          false: '#e5f2ec',
        }}
        thumbColor={Colors.white}
        value={value}
        onChange={() => {
          onChange(slug);
        }}
      />
    </View>
  );
}

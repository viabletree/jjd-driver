import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../../components';
import styles from './HourItemStyles';
import {Colors} from '../../../theme';
export default function HourItemView(props) {
  const {item, onItemClick} = props;
  return (
    <TouchableOpacity
      onPress={onItemClick}
      style={
        item.selected
          ? [styles.container, {backgroundColor: Colors.accent, borderWidth: 0}]
          : styles.container
      }>
      <Text color={item.selected ? 'white' : 'black'}>{item.title}h</Text>
    </TouchableOpacity>
  );
}

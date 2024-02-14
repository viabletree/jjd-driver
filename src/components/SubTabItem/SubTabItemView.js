import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image} from '../../components';
import styles from './SubTabItemStyles';
import {Colors, Fonts, AppStyles} from '../../theme';
export default function SubTabItemView(props) {
  const {item, tabSelect} = props;
  const {title, selected, id} = item;

  return (
    <TouchableOpacity onPress={() => tabSelect(id)} style={styles.container}>
      <View style={styles.titleParent}>
        <Text
          color={selected ? Colors.text.white : Colors.text.secondary}
          type="semiBold"
          size={Fonts.size.xiv}>
          {title}
        </Text>
      </View>

      {selected && <View style={styles.line} />}
    </TouchableOpacity>
  );
}

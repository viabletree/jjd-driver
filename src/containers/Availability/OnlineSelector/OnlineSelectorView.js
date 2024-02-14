import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, Button} from '../../../components';
import styles from './OnlineSelectorStyles';
import {Fonts, AppStyles, Colors} from '../../../theme';
import HourItem from '../HourItem';

export default function OnlineSelectorView(props) {
  const {cancelCallback, data, onItemClick, unavailableMessage, onDone} = props;
  return (
    <View style={styles.container}>
      <Text size={Fonts.size.xxiv} style={AppStyles.textAlignCenter}>
        How long do you want to go offline?
      </Text>
      <View style={AppStyles.mTop20}>
        <View style={styles.hoursParent}>
          <HourItem item={data[0]} onItemClick={() => onItemClick(0)} />
          <View style={{width: 18}} />
          <HourItem item={data[1]} onItemClick={() => onItemClick(1)} />
        </View>
        <View style={styles.hoursParent}>
          <HourItem item={data[2]} onItemClick={() => onItemClick(2)} />
          <View style={{width: 18}} />
          <HourItem item={data[3]} onItemClick={() => onItemClick(3)} />
        </View>
        <View style={styles.hoursParent}>
          <HourItem item={data[4]} onItemClick={() => onItemClick(4)} />
          <View style={{width: 18}} />
          <HourItem item={data[5]} onItemClick={() => onItemClick(5)} />
        </View>
      </View>
      <View style={styles.offlineTextParent}>
        <Text size={Fonts.size.xiv} color="red">
          I am going unavailable from
        </Text>
        <Text size={Fonts.size.xviii} color="red">
          {unavailableMessage}
        </Text>
      </View>
      <View style={styles.buttonsParent}>
        <Button
          onPress={() => cancelCallback()}
          style={styles.button}
          color={Colors.text.primary}>
          Cancel
        </Button>
        <Button
          onPress={() => onDone()}
          color={Colors.text.white}
          style={[
            styles.button,
            {backgroundColor: Colors.bitterSweet, marginLeft: 10, flex: 1.5},
          ]}>
          Go Unavailable
        </Button>
      </View>
    </View>
  );
}

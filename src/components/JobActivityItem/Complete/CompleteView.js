import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, Button} from '../../../components';
import styles from './CompleteStyles';
import {Fonts, Colors} from '../../../theme';

export default function CompleteView(props) {
  return (
    <View style={styles.container}>
      <Text size={Fonts.size.xxiv} type="bold" style={{textAlign: 'center'}}>
        Great ! All stops done
      </Text>
      <Text size={Fonts.size.xxiv} type="bold" style={{textAlign: 'center'}}>
        Thank you
      </Text>
      <View style={styles.line} />
      <View style={styles.buttonParent}>
        <Button
          onPress={() => props.onPress()}
          style={styles.button}
          size={Fonts.size.xviii}
          color={Colors.white}>
          See summary of mileage and duration
        </Button>
      </View>
    </View>
  );
}

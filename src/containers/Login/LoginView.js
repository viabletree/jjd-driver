import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  Keyboard,
} from 'react-native';
import {Text, Image, CustomNavbar, PhoneInput, Fab} from '../../components';
import styles from './LoginStyles';
import {Fonts, AppStyles, Images} from '../../theme';
export default function LoginView(props) {
  return (
    <View style={styles.container}>
      <View
        style={styles.content}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <Text style={styles.codeHeading} size={Fonts.size.xv}>
          Enter Your Mobile Number
        </Text>
        <PhoneInput
          value={props.number}
          onChangeText={num => props.onNumberChange(num)}
          onSubmit={() => props.onSubmit()}
        />
        <Text size={Fonts.size.xv} style={AppStyles.mTop25}>
          You will be receiving a SMS on the above provided number.
        </Text>
        <Fab onPress={() => props.onSubmit()} loading={props.loading} />
      </View>
    </View>
  );
}

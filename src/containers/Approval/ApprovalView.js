import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import {Text, Image} from '../../components';
import styles from './ApprovalStyles';
import {Images, Fonts, Colors} from '../../theme';
import Communications from 'react-native-communications';
export default function ApprovalView(props) {
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <RnImage source={Images.test} style={styles.image} />
        <View style={styles.topText}>
          <Text size={Fonts.size.xxviii}>We got your request</Text>
          <Text
            size={Fonts.size.xiv}
            style={{textAlign: 'center', marginTop: 12}}>
            Thank you for signup with Kiffgo. Our Support team will be in touch
            with you shortly.
          </Text>
        </View>
        <View style={styles.switchMainParent}>
          <Text type="bold" size={Fonts.size.xiv}>
            Your Request Status:
          </Text>
          <View style={styles.switchParent}>
            <Text color="#ff3333">Pending</Text>
            <Switch
              disabled
              ios_backgroundColor="#ff3333"
              style={{marginHorizontal: 10}}
              thumbColor={Colors.white}
              trackColor={{
                true: Colors.accent,
                false: '#ff3333',
              }}
            />
            <Text color="#5edea8">Approved</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomText}>
        <Text>
          If you have any questions for us. Please feel free to reach us at{' '}
          <Text
            onPress={() =>
              Communications.email(['driver@kiffgo.io'], null, null, '', '')
            }
            style={styles.txtUnderline}>
            driver@kiffgo.io
          </Text>
        </Text>
      </View>
    </View>
  );
}

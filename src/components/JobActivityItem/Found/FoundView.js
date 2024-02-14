import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Image, Button} from '../../../components';
import styles from './FoundStyles';
import {AppStyles, Fonts, Colors} from '../../../theme';
import {receivers} from '../../../constants';
export default function FoundView(props) {
  const {timeSpent, item, initialFail, setDeliveredTo} = props;
  const {contact_name} = item;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      {/* timer start */}
      <View style={AppStyles.timer}>
        <Text
          size={Fonts.size.xiv}
          color={Colors.text.primary}
          style={AppStyles.mRight10}>
          Time spent on job
        </Text>
        <Text size={Fonts.size.xxiii} color={Colors.accent} type="bold">
          {timeSpent}
        </Text>
      </View>
      {/* timer end */}
      {/* main view start */}
      <View style={AppStyles.centerInner}>
        {/* who to deliver start */}
        <View style={AppStyles.centerInner}>
          <Text size={Fonts.size.xvi}>Who are you delivering to?</Text>
          <TouchableOpacity
            onPress={() => setDeliveredTo(receivers.self)}
            style={styles.positiveButton}>
            <Text color={Colors.white} type="bold">
              {contact_name !== '' ? contact_name : '--'} is here
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDeliveredTo(receivers.reception)}
            style={styles.blueButton}>
            <Text color={Colors.linkBlue} type="bold">
              Reception
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setDeliveredTo(receivers.neighbor)}
            style={styles.blueButton}>
            <Text color={Colors.linkBlue} type="bold">
              Neighbor or someone else
            </Text>
          </TouchableOpacity>
        </View>
        {/* who to deliver end */}
        {/* Fail job start */}
        <View style={styles.anyIssue}>
          <Text size={Fonts.size.xvi}>Have you tried everything?</Text>
          <Text size={Fonts.size.xvi}>Can’t deliver anywhere</Text>
          <TouchableOpacity
            onPress={() => initialFail()}
            style={styles.redButton}>
            <Text color={Colors.bitterSweet1} type="bold">
              Fail Job
            </Text>
          </TouchableOpacity>
        </View>
        {/* Fail job end */}
      </View>
      {/* main view end */}
    </ScrollView>
  );
}

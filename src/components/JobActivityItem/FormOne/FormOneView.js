import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Image, MultipleImageCapture} from '../../../components';
import styles from './FormOneStyles';
import {Images, Colors, Fonts, AppStyles} from '../../../theme';
export default function FormOneView(props) {
  const {timeSpent, item, revertInitialFail, updateImages, back, next} = props;
  const {internal_order, contact_name, is_delivery} = item;
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => back()} style={styles.backArrow}>
        <RnImage source={Images.back_dark} />
      </TouchableOpacity>
      <View style={styles.infoParent}>
        <Text color={Colors.text.grey} size={Fonts.size.xiv}>
          Order {internal_order !== '' ? internal_order : '--'}
        </Text>
        <Text size={Fonts.size.xx} type="bold">
          {contact_name !== '' ? contact_name : '--'}
        </Text>
      </View>
      <View style={styles.line} />
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
      <View>
        <Text type="bold" size={Fonts.size.xvi} style={styles.picturesParent}>
          {is_delivery
            ? 'Take pictures of where you have left the goods'
            : 'Take pictures of where you are collecting the goods'}
        </Text>
        <MultipleImageCapture
          title="Upload Image:"
          returnImages={updateImages}
        />
      </View>
      <View>
        <TouchableOpacity onPress={() => next()} style={styles.positiveButton}>
          <Text color={Colors.white} type="bold">
            Next
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

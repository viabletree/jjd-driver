import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Text, Image, MultipleImageCapture} from '../../../components';
import styles from './FailJobStyles';
import {Images, AppStyles, Colors, Fonts} from '../../../theme';
export default function FailJobView(props) {
  const {item, revertInitialFail, failPress, failLoading} = props;
  const {internal_order, contact_name} = item;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => revertInitialFail()}
          style={styles.backArrow}>
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
        <View>
          <Text
            size={Fonts.size.xx}
            type="bold"
            style={[
              AppStyles.textAlignCenter,
              AppStyles.mTop30,
              AppStyles.mLeft30,
              AppStyles.mRight30,
            ]}>
            Take a clear pic of the house or building to fail the job
          </Text>
          <Text
            color={Colors.text.grey}
            size={Fonts.size.xiv}
            style={[
              AppStyles.textAlignCenter,
              AppStyles.mTop10,
              AppStyles.mLeft30,
              AppStyles.mRight30,
            ]}>
            You couldn't reach anybody and you are failing the job
          </Text>
          <MultipleImageCapture style={AppStyles.mTop30} />
        </View>

        <View>
          <TouchableOpacity
            onPress={() => failPress()}
            style={styles.blueButton}>
            {!failLoading && (
              <Text color={Colors.white} type="bold">
                {'    Fail    '}
              </Text>
            )}
            {failLoading && <ActivityIndicator color={Colors.white} />}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

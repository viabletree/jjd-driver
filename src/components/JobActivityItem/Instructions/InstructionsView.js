import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Text, Image, Button} from '../../../components';
import styles from './InstructionsStyles';
import {Colors, Fonts, AppStyles, Images} from '../../../theme';
import util from '../../../util';

export default function InstructionsView(props) {
  const {item, index, orderNumber, timeSpent, buttonClick} = props;
  const {
    postcode,
    internal_order,
    contact_name,
    description,
    qty_items,
    stairs,
    full_address,
    instructions,
    is_delivery,
    images,
    showFind,
    duration_seconds,
    distance_miles,
    targetTime,
    latitude,
    longitude,
  } = item;
  const label = is_delivery ? 'Delivery' : 'Collection';
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text color={Colors.lightGrey} size={Fonts.size.xiv}>{`Stop#${index +
        1} ${label} details`}</Text>
      {/* <Text
          color={Colors.lightGrey}
          size={Fonts.size.xiv}>{`Order#${orderNumber}`}</Text> */}
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
      {/* item information start */}
      <View style={styles.locationDetails}>
        <Text color={Colors.black} size={Fonts.size.xx} type="bold">
          Item information
        </Text>
        {/* Floor description */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={[AppStyles.flex, AppStyles.mTop10]}>
            Internal Order # :
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {internal_order != '' ? internal_order : '--'}
          </Text>
        </View>
        {/* Full Address */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={AppStyles.flex}>
            # of items :
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {qty_items}
          </Text>
        </View>
        {/* Instruction: */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={AppStyles.flex}>
            Item Description :
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {description != '' ? description : '--'}
          </Text>
        </View>
      </View>
      {/* item information end */}
      {/* Location Details Start */}
      <View style={styles.locationDetails}>
        <Text color={Colors.black} size={Fonts.size.xx} type="bold">
          Location Details
        </Text>
        {/* Floor description */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={[AppStyles.flex, AppStyles.mTop10]}>
            Floor description:
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {stairs}
          </Text>
        </View>
        {/* Full Address */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={AppStyles.flex}>
            Full Address:
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {full_address}
          </Text>
        </View>
        {/* Instruction: */}
        <View style={styles.locationDetailsItem}>
          <Text
            size={Fonts.size.xiv}
            color={Colors.text.grey}
            style={AppStyles.flex}>
            Instruction:
          </Text>
          <Text size={Fonts.size.xvi} style={AppStyles.flex}>
            {instructions}
          </Text>
        </View>
        <View style={styles.buttonParent}>
          <TouchableOpacity
            activeOpacity={3}
            style={styles.button}
            onPress={() => buttonClick()}>
            <Text color="white" style={styles.textAlignCenter}>
              I read the instructions
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Location Details End */}
    </ScrollView>
  );
}

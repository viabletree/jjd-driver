import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, Button} from '../../components';
import styles from './StopInstructionStyles';
import {Fonts, AppStyles, Colors} from '../../theme';
export default function StopInstructionView(props) {
  return (
    <View style={[styles.container, AppStyles.spaceBetween]}>
      {/* section wrapper start*/}
      <View>
        {/* section start */}
        <View>
          <View style={AppStyles.mBottom20}>
            <Text
              color={Colors.lightGrey}
              size={Fonts.size.xiv}
              style={AppStyles.mBottom15}>
              Stop#1
            </Text>
            <Text size={Fonts.size.xx} type="bold">
              Items Information
            </Text>
          </View>

          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                Internal Order#
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.internal_order}</Text>
            </View>
          </View>
          {/* row end */}
          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                # of items:
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.qty_items}</Text>
            </View>
          </View>
          {/* row end */}
          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                Item Description:
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.description}</Text>
            </View>
          </View>
          {/* row end */}
        </View>
        {/* section end */}
        {/* section start */}
        <View>
          <View style={[AppStyles.mBottom20, AppStyles.mTop30]}>
            <Text size={Fonts.size.xx} type="bold">
              Location Details
            </Text>
          </View>
          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                Floor description:
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.stairs}</Text>
            </View>
          </View>
          {/* row end */}
          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                Full Address
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.full_address}</Text>
            </View>
          </View>
          {/* row end */}
          {/* row start */}
          <View style={[AppStyles.flexRow, AppStyles.mBottom5]}>
            <View style={AppStyles.flex2}>
              <Text size={Fonts.size.xiv} color={Colors.boulder}>
                Instruction
              </Text>
            </View>
            <View style={[AppStyles.flex3]}>
              <Text size={Fonts.size.xiv}>{props.location.instructions}</Text>
            </View>
          </View>
          {/* row end */}
        </View>
        {/* section end */}
      </View>
      {/* section wrapper end */}
      <View
        style={[
          AppStyles.mTop40,
          AppStyles.justifyContentCenter,
          AppStyles.alignItemsCenter,
        ]}>
        <Button
          color={Colors.white}
          style={AppStyles.btnGreen}
          size={Fonts.size.xvi}
          type="bold">
          I read the instructions I read the instructions
        </Button>
      </View>
    </View>
  );
}

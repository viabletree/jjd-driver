import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
  Clipboard,
} from 'react-native';
import {Text, Image} from '../../../components';
import styles from './MapAlertViewStyles';
import {Fonts, Colors, Images, AppStyles} from '../../../theme';
import util from '../../../util';
import {duration} from 'moment';
import {MAP_TYPES} from '../../../constants';
export default function MapAlertViewView(props) {
  const {item, onNavBtnPress, currentLocation} = props;
  const {latitude, longitude, des} = item;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* map icons view start */}
      <View style={styles.mapPortionParent}>
        <Text type="bold" color={Colors.black} size={Fonts.size.xvi}>
          Choose navigation app
        </Text>
        <View style={styles.mapIconParentView}>
          <TouchableOpacity
            onPress={() =>
              onNavBtnPress(MAP_TYPES.WAZE, currentLocation, {
                latitude,
                longitude,
              })
            }>
            <RnImage source={Images.waze_maps} style={styles.mapIconWaze} />
          </TouchableOpacity>
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() =>
              onNavBtnPress(MAP_TYPES.GOOGLE, currentLocation, {
                latitude,
                longitude,
              })
            }>
            <RnImage source={Images.google_map_icon} style={styles.mapIcon} />
          </TouchableOpacity>
        </View>
        <View style={AppStyles.mTop10}>
          <Text color="black" size={Fonts.size.xvii}>
            {des}
          </Text>
        </View>
        <View>
          <TouchableOpacity onPress={() => Clipboard?.setString(des)}>
            <View>
              <Text
                style={{
                  color: 'red',
                  fontSize: 14,
                  fontFamily: 'Arial',
                  fontStyle: 'bold',
                  textAlign: 'center',
                  marginTop: 3,
                  marginLeft: 25,
                  marginBottom: 17,
                  textDecorationLine: 'underline',
                }}>
                Copy address
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {/* Location Details End */}
    </ScrollView>
  );
}

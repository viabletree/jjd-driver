import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Text, Image, CustomNavbar, Fab} from '../../components';
import styles from './VehicleDetailStyles';
import {Fonts, AppStyles, Colors, Images} from '../../theme';
import _ from 'lodash';
import util from '../../util';
export default function VehicleDetailView(props) {
  const {vehicles, vehicleDetails, selectedVehicle} = props;
  const {
    make,
    model,
    year,
    fuel,
    dimL,
    dimW,
    dimH,
    tons,
    chassi_number,
    consumptionMpg,
    wheelbase,
    euroStatus,
    loading_length_mm,
    loading_width_mm,
    loading_height_mm,
    payload_ton,
    chasis_number,
    consumption_mpg,
    euro_status,
  } = vehicleDetails;
  return (
    <View style={styles.container}>
      <CustomNavbar hasBorder={false} />

      <ScrollView
        style={styles.content}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={[AppStyles.mBottom40, AppStyles.pBottom10]}>
          <View style={AppStyles.mLeft20}>
            <Text size={Fonts.size.xxv}>Your Vehicle Information,</Text>
            <Text size={Fonts.size.xiv}>
              We use your vehicle details to match you with the right job.
            </Text>
          </View>
          {vehicles.length === 0 && (
            <View style={styles.loader}>
              <ActivityIndicator color={Colors.accent} size="large" />
            </View>
          )}
          {vehicles.length > 0 && (
            <View style={styles.vehicleTypeParent}>
              {vehicles.map((vehicle, index) => {
                return (
                  <View
                    style={
                      _.isEqual(selectedVehicle, vehicle.slug)
                        ? styles.vehicleTypeSelected
                        : styles.vehicleType
                    }>
                    <Image
                      source={{uri: vehicle.mobile_image.secure_url}}
                      style={styles.vehicleImage}
                      resizeMode="contain"
                    />
                    <Text
                      style={[AppStyles.mTop10, styles.vehicleTitle]}
                      size={Fonts.size.xv}
                      type={
                        selectedVehicle === vehicle.slug ? 'bold' : 'regular'
                      }>
                      {vehicle.title}
                    </Text>
                    <View
                      style={{
                        zIndex: selectedVehicle === vehicle.slug ? -1 : 1,
                        position: 'absolute',
                        backgroundColor:
                          selectedVehicle === vehicle.slug
                            ? 'rgba(244, 253, 249, 1)'
                            : 'rgba(255,255,255,0.7)',
                        height: '100%',
                        width: '100%',
                      }}
                    />
                  </View>
                );
              })}
            </View>
          )}
          {/* basic Information */}
          <View style={styles.infoParent}>
            <Text type="bold" size={Fonts.size.xv}>
              Basic Details
            </Text>
            {/* make */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Make:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(make) ? '---' : util.titleCase(make)}
              </Text>
            </View>
            {/* model */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Model:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(model) ? '---' : util.titleCase(model)}
              </Text>
            </View>
            {/* year */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Year:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(year) ? '---' : year}
              </Text>
            </View>
            {/* Fuel */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Fuel:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(fuel) ? '---' : util.titleCase(fuel)}
              </Text>
            </View>
          </View>
          {/* Dimensions */}
          <View style={styles.infoParent}>
            <Text type="bold" size={Fonts.size.xv}>
              Dimensions
            </Text>
            {/* make */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Loading length:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isNil(loading_length_mm) ? '---' : loading_length_mm + ' mm'}
              </Text>
            </View>
            {/* model */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Loading width:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isNil(loading_width_mm) ? '---' : loading_width_mm + ' mm'}
              </Text>
            </View>
            {/* year */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Loading height:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isNil(loading_height_mm) ? '---' : loading_height_mm + ' mm'}
              </Text>
            </View>
            {/* Fuel */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Payload:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isNil(payload_ton) ? '---' : payload_ton + ' kg'}
              </Text>
            </View>
          </View>

          {/* Technical Details */}
          <View style={styles.infoParent}>
            <Text type="bold" size={Fonts.size.xv}>
              Technical Details
            </Text>
            {/* make */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Chassis number:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvi}>
                {_.isNil(chasis_number) ? '---' : chasis_number}
              </Text>
            </View>
            {/* model */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Consumption:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isNil(consumption_mpg) ? '---' : consumption_mpg + ' MPG'}
              </Text>
            </View>
            {/* year */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Wheel base:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(wheelbase) ? '---' : util.titleCase(wheelbase)}
              </Text>
            </View>
            {/* Fuel */}
            <View style={styles.infoItemParent}>
              <Text
                style={styles.infoText}
                size={Fonts.size.xv}
                color={Colors.text.grey}>
                Euro Status:
              </Text>
              <Text style={styles.infoText} size={Fonts.size.xvii}>
                {_.isEmpty(euro_status) ? '---' : euro_status}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <Fab onPress={() => props.onSubmit()} />
    </View>
  );
}

import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import styles from './ChooseVehicleStyles';
import {Text, Image, TextInput, CustomNavbar, Fab} from '../../components';
import {Fonts} from '../../theme';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import _ from 'lodash';

export default function ChooseVehicle(props) {
  const {
    onSubmit,
    onChange,
    vanRegNumber,
    vanRegNumberError,
    loading,
    btnLoading,
    txtInputRef,
  } = props;

  return (
    <>
      <CustomNavbar />

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.content}
        style={styles.scrollStyle}>
        <View style={styles.container}>
          {/* start heading row*/}
          <View>
            <Text size={Fonts.size.xxiv}>Choose Your Vehicle,</Text>
            <Text size={Fonts.size.xxxii}>
              We use your vehicle details to match you with the right job.
            </Text>
          </View>
          {/* end heading row */}
          {/* loading start*/}
          {loading && (
            <ActivityIndicator
              color={Colors.accent}
              size="large"
              style={styles.activityIndicator}
            />
          )}
          {/* loading end */}
          {/* start Vehicle row */}
          <View style={styles.vehicleWrapper}>
            <View style={styles.vehicleRow}>
              {props.vehicleList.map((item, index) => {
                return (
                  <TouchableOpacity
                    style={[
                      styles.vehicleCol,
                      props.activeVanSlug === item.slug && styles.activeVehicle,
                    ]}
                    onPress={() => {
                      props.checkVanType(item.slug);
                    }}>
                    {!_.isNil(item.mobile_image) &&
                      !_.isNil(item.mobile_image.secure_url) && (
                        <Image
                          source={{uri: item.mobile_image.secure_url}}
                          style={styles.vehicleImg}
                          resizeMode="contain"
                        />
                      )}

                    <Text size={Fonts.size.xiv} style={styles.vehicleTitle}>
                      {item.title}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* end Vehicle row */}
          {/* start vehicle registration field row */}
          {props.showRegFiled && (
            <View style={styles.regFieldWrapper}>
              <TextInput
                autoCapitalize="characters"
                ref={ref => {
                  txtInputRef(ref);
                }}
                label="Van registration:"
                onChangeText={value => {
                  onChange(value);
                }}
                value={vanRegNumber}
                error={vanRegNumberError}
                style={[
                  styles.vanRegField,
                  vanRegNumberError && styles.errorBorder,
                ]}
              />
              {/* <KeyboardSpacer /> */}
            </View>
          )}

          {/* end vehicle registration field row */}
        </View>
      </KeyboardAwareScrollView>
      <Fab onPress={onSubmit} loading={btnLoading} />
    </>
  );
}

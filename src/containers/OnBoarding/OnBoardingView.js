import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  AppState,
  Keyboard,
} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  CircularImage,
  TextInput,
  PhoneInput,
  Fab,
} from '../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from './OnBoardingStyles';
import {Fonts, Images, AppStyles, Colors} from '../../theme';
import {Actions} from 'react-native-router-flux';
export default function OnBoardingView(props) {
  const {
    capturePress,
    imagePath,
    onSubmit,
    name,
    email,
    updateData,
    homeAddress,
    homeAddressError,
    loading,
    num,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar hasBorder={false} hasBack={false} />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={styles.content}>
        <Text size={Fonts.size.xxv}>Welcome,</Text>
        <Text size={Fonts.size.xiv}>
          Request your driver account asap and start earning money.
        </Text>
        <View style={styles.profilePicParent}>
          {imagePath === '' && (
            <View style={styles.userPhParent}>
              <RnImage
                source={Images.user_ph}
                resizeMode="contain"
                style={{height: 80, width: 80}}
              />
            </View>
          )}
          {imagePath != '' && (
            <CircularImage
              placeholderStyle={{
                zIndex: -10,
                position: 'absolute',
                backgroundColor: 'red',
              }}
              placeholderSource={Images.user_ph}
              noShadow
              size={110}
              image={imagePath}
            />
          )}
          <TouchableOpacity
            onPress={() => capturePress()}
            style={styles.camIconParent}>
            <RnImage source={Images.camera} style={styles.camIcon} />
          </TouchableOpacity>
        </View>

        <TextInput
          label="Full Name:"
          value={name}
          autoCorrect={false}
          onChangeText={text => updateData({name: text})}
          autoCapitalize="words"
          editable={false}
        />
        <View style={{marginTop: 28}}>
          <Text size={Fonts.size.xv}>Phone Number</Text>
          <PhoneInput
            value={num}
            verified={true}
            containerStyles={{marginTop: 5}}
            active={false}
          />
        </View>
        <TextInput
          containerStyle={[{marginTop: 18}]}
          value={homeAddress.description}
          label=" Home Postcode:"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="home-address"
          editable={false}
        />
        <TextInput
          containerStyle={[{marginTop: 18, marginBottom: 90}]}
          value={email}
          label="Email Address:"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="email-address"
          editable={false}
        />
      </KeyboardAwareScrollView>
      <Fab onPress={onSubmit} loading={loading} />
    </View>
  );
}

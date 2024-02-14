import React from 'react';
import {
  View,
  Image as RnImage,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {Text, Image, TextInput, Button} from '../../../components';
import styles from './FormTwoStyles';
import {Images, Colors, Fonts, AppStyles} from '../../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {receivers} from '../../../constants';

export default function FormTwoView(props) {
  const {
    item,
    back,
    nameError,
    houseError,
    editName,
    editHouse,
    name,
    house,
    nameRef,
    houseRef,
    nameSubmit,
    submit,
    passLoading,
    timeSpent,
  } = props;
  const {internal_order, contact_name, full_address, deliveredTo} = item;
  const isSelf = deliveredTo === receivers.self;
  const isNeighbor = deliveredTo === receivers.neighbor;
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="always">
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
      <View style={styles.formParent}>
        <Text>Who is receiving the goods?</Text>
        <TextInput
          ref={ref => nameRef(ref)}
          editable={!isSelf}
          value={name}
          label="Name:"
          error={nameError}
          onChangeText={name => editName(name)}
          onSubmitEditing={() => nameSubmit()}
        />
        {isNeighbor && (
          <TextInput
            ref={ref => houseRef(ref)}
            label="House#:"
            value={house}
            error={houseError}
            onChangeText={house => editHouse(house)}
          />
        )}
        <TextInput
          editable={false}
          label="Street Address & Postcode:"
          value={full_address}
        />
      </View>
      <View style={styles.buttonParent}>
        <Button
          indicatorColor={Colors.white}
          isLoading={passLoading}
          onPress={() => submit()}
          color={Colors.white}
          style={styles.buttonStyles}>
          Task complete
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
}

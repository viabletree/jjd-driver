import React from 'react';
import {
  View,
  Image as RnImage,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  Platform,
} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import {Text, Image, CustomNavbar, TextInput} from '../../components';
import styles from './AddressAutoCompleteStyles';
import {Images, Colors} from '../../theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import util from '../../util';

export default function AddressAutoCompleteView(props) {
  const {
    getLocations,
    locations,
    loading,
    clearText,
    text,
    onItemSelect,
  } = props;
  return (
    <View style={styles.container}>
      <CustomNavbar hasBorder={false} title="Search location" />
      <View style={styles.content}>
        <View style={styles.textInput}>
          <TextInput
            value={text}
            autoFocus={true}
            placeholder="Search"
            returnKeyType="done"
            onSubmitEditing={() => {
              Keyboard.dismiss();
            }}
            onChangeText={text => getLocations(text)}
          />
          <View style={styles.loaderCrossParent}>
            {!loading && text.length > 0 && (
              <TouchableOpacity onPress={() => clearText()}>
                <RnImage source={Images.cross} style={styles.crossIcon} />
              </TouchableOpacity>
            )}
            {loading && <ActivityIndicator color={Colors.accent} />}
          </View>
        </View>
        {locations.length < 1 && text.length > 1 && !loading && (
          <View style={styles.infoText}>
            <Text>No data found</Text>
          </View>
        )}
        <View>
          <Text />
        </View>
        <FlatList
          keyExtractor={(item, index) => {
            util.keyExtractor(index);
          }}
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={styles.list}
          data={locations}
          renderItem={({item}, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => onItemSelect(item)}
                style={styles.addressItem}>
                <Text>{item.description}</Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      {Platform.OS === 'ios' && <KeyboardSpacer />}
    </View>
  );
}

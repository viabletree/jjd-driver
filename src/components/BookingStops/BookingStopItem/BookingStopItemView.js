import React from 'react';
import {View, Image as RnImage, TouchableOpacity} from 'react-native';
import {Text, Image, MapAlertView} from '../../../components';
import styles from './BookingStopItemStyles';
import {Fonts, Colors, Metrics} from '../../../theme';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function BookingStopItemView(props) {
  const {
    data,
    index,
    multiStop,
    accepted,
    status,
    mapSheetRef,
    mapClick,
    goClick,
    enableGo,
  } = props;

  const {eta, info, item, postcode, title} = data;
  return (
    <View style={styles.stopItem}>
      <Text size={Fonts.size.xiv} color={Colors.text.grey} style={styles.title}>
        {title}
      </Text>

      <View>
        {!multiStop && <View style={styles.line} />}
        {multiStop && index === 0 && <View style={styles.multiStopTopLine} />}
        {multiStop && index === 1 && <View style={styles.line} />}
        {multiStop && index > 1 && <View style={styles.line} />}

        <View style={styles.circle} />
      </View>

      {/* Captions */}
      <View style={styles.infoCaption}>
        <View>
          {postcode && (
            <View>
              <Text
                size={Fonts.size.xii}
                color={Colors.text.grey}
                style={styles.lineHeight}>
                Postcode:
                <Text>{'  ' + data.postcode}</Text>
              </Text>
            </View>
          )}
          {info && (
            <Text
              size={Fonts.size.xii}
              color={Colors.text.grey}
              style={styles.lineHeight}>
              {data.info}
            </Text>
          )}
          {eta && (
            <Text
              size={Fonts.size.xv}
              color={Colors.accent}
              style={styles.lineHeight}>
              Arrival time : {data.eta}
            </Text>
          )}
        </View>
      </View>
      {/* values */}
      {accepted && status !== 'Complete' && (
        <View style={styles.infoValue}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              activeOpacity={enableGo ? 0 : 1}
              onPress={enableGo ? goClick : null}
              style={{
                backgroundColor: enableGo ? Colors.accent : '#d6d5d5',
                paddingHorizontal: 20,
                borderRadius: 50,
              }}>
              <Text type="bold" color={Colors.white}>
                Go
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      <RBSheet
        animationType="fade"
        ref={ref => {
          mapSheetRef(ref);
        }}
        closeOnDragDown={true}
        height={Metrics.screenHeight / 2.5}
        duration={250}
        customStyles={{
          container: styles.bottomSheetContainer,
        }}>
        <MapAlertView item={item} mapOnClick={mapClick} />
      </RBSheet>
    </View>
  );
}

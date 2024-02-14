import React from 'react';
import {
  View,
  Image as RnImage,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {Text, Image} from '../../../components';
import styles from './NotFoundStyles';
import {AppStyles, Fonts, Colors} from '../../../theme';
import util from '../../../util';

export default function NotFoundView(props) {
  const {timeSpent, item, initialFail, resetFlags, hideMainSheet} = props;
  const {
    postcode,
    internal_order,
    contact_name,
    contact_phone,
    description,
    qty_items,
    stairs,
    full_address,
    instructions,
    is_delivery,
    images,
    showFind,
    targetTime,
    instructionsRead,
    foundLocation,
  } = item;
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
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
      {/* main view start */}
      <View style={AppStyles.centerInner}>
        {/* who to deliver start */}
        <View style={AppStyles.centerInner}>
          <Text size={Fonts.size.xvi}>You can’t find the location?</Text>
          <TouchableOpacity
            style={styles.positiveButton}
            onPress={() => {
              if (contact_phone !== '') {
                Linking.openURL(`tel:${contact_phone}`);
                hideMainSheet();
                resetFlags();
              } else {
                util.topAlert('No contact number found');
              }
            }}>
            <Text color={Colors.white} type="bold">
              Call customer
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.redButton,
              {backgroundColor: 'white', borderColor: '#f7b500'},
            ]}
            onPress={() => {
              Linking.openURL(`tel:${'+44 7557 857540'}`);
              hideMainSheet();
              resetFlags();
            }}>
            <Text color={'#f7b500'} type="bold">
              Call Kiffgo
            </Text>
          </TouchableOpacity>
        </View>
        {/* who to deliver end */}
        {/* Fail job start */}
        <View style={styles.anyIssue}>
          <Text size={Fonts.size.xvi}>Have you tried everything?</Text>
          <TouchableOpacity
            onPress={() => initialFail()}
            style={styles.redButton}>
            <Text color={Colors.bitterSweet1} type="bold">
              No one is answering: fail
            </Text>
          </TouchableOpacity>
        </View>
        {/* Fail job end */}
      </View>
      {/* main view end */}
    </ScrollView>
  );
}

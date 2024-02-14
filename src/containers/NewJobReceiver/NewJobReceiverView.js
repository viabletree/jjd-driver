import React from 'react';
import {
  View,
  Image as RnImage,
  ActivityIndicator,
  AppState,
} from 'react-native';
import {
  Text,
  Image,
  JobSummary,
  StatusBar,
  CustomNavbar,
} from '../../components';
import styles from './NewJobReceiverStyles';
import util from '../../util';
import {Fonts, Colors, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';
import _ from 'lodash';

export default function NewJobReceiverView(props) {
  const {data, timer, loading, acceptBtn} = props;

  let minute = Math.floor(timer / 60);
  let second = Math.floor(timer % 60);
  let time = ('0' + minute).slice(-2) + ':' + ('0' + second).slice(-2);
  return (
    <View style={styles.container}>
      <CustomNavbar
        title="New job"
        hasBack={false}
        leftBtnPress={() => Actions.pop()}
        leftBtnImage={Images.back_white}
        titleColor={Colors.white}
        style={styles.navBar}
      />
      {loading && <ActivityIndicator style={{marginTop: 30}} />}
      {!loading && _.isEmpty(data) && (
        <View style={styles.infoText}>
          <Text>No Data Found</Text>
        </View>
      )}
      {!loading && !_.isEmpty(data) && (
        <>
          <View style={styles.alertBox}>
            <Text
              color={Colors.white}
              type="bold"
              style={AppStyles.textAlignCenter}
              size={Fonts.size.xviii}>
              {timer > 0
                ? `Time left to accept this job (${time})`
                : 'Job expired'}
            </Text>
          </View>
          <JobSummary data={data} acceptBtn={acceptBtn} />
        </>
      )}
    </View>
  );
}

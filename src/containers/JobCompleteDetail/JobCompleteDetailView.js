import _ from 'lodash';
import React from 'react';
import {ActivityIndicator, View, StatusBar} from 'react-native';
import {JobSummary, CustomNavbar, Text} from '../../components';
import styles from './JobCompleteDetailStyles';
import {Colors, AppStyles, Images} from '../../theme';
import {Actions} from 'react-native-router-flux';

export default function JobCompleteDetailView(props) {
  const {loading, job, CompleteJob} = props;

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />

      <CustomNavbar
        title={_.isNil(job) ? 'Loading...' : `Job# ${job.booking_number}`}
        hasBack={false}
        titleColor={Colors.white}
        style={styles.navBar}
        leftBtnImage={Images.back_white}
        leftBtnPress={() => Actions.pop()}
      />

      <View style={styles.container}>
        {loading && <ActivityIndicator style={AppStyles.mTop10} />}
        {!loading && !job && (
          <View style={[AppStyles.centerInner, AppStyles.mTop20]}>
            <Text>No data found</Text>
          </View>
        )}
        {!loading && job && (
          <>
            <JobSummary
              CompleteJob={CompleteJob}
              data={job}
              acceptJobDetail={true}
            />
          </>
        )}
      </View>
    </>
  );
}

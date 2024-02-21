import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import {
  CustomNavbar,
  JobSummary,
  JobListEmptyComponent,
  Text,
  SubTabs,
  AvailableJobItem,
} from '../../components';
import messaging from '@react-native-firebase/messaging';

import styles from './AvailableJobsStyles';
import {Colors, Metrics, AppStyles, Fonts} from '../../theme';
import Carousel from 'react-native-snap-carousel';
import {Actions} from 'react-native-router-flux';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export default function AvailableJobsView(props) {
  const {
    title,
    availableJobs,
    loading,
    onJob,
    jobInProgress,
    onRefresh,
    isFetching,
  } = props;

  return (
    <View style={[styles.container, onJob && AppStyles.pBottom55]}>
      {onJob && (
        <TouchableOpacity
          onPress={() =>
            Actions.acceptedJobDetails({jobId: jobInProgress.delivery})
          }
          style={[AppStyles.boxShadow, styles.onJob]}>
          <LinearGradient
            colors={Colors.redGradient}
            style={[AppStyles.flex, AppStyles.centerInner]}>
            <Text size={Fonts.size.xx} color={Colors.white} numberOfLines={1}>
              Performing a job
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )}
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <CustomNavbar
        title={title}
        hasBack={false}
        titleColor={Colors.white}
        style={styles.navBar}
      />

      {/* loader start */}
      {loading && <ActivityIndicator style={AppStyles.mTop20} />}
      {/* loader end */}

      {!loading && (
        //Carousel end //if job is zero then show this

        // Carousel start
        <FlatList
          data={availableJobs}
          style={AppStyles.pTop10}
          showsVerticalScrollIndicator={false}
          onRefresh={() => onRefresh()}
          refreshing={isFetching}
          renderItem={({item}) => {
            return <AvailableJobItem job={item} />;
          }}
          ListEmptyComponent={() => {
            return (
              <JobListEmptyComponent
                title="Have you marked your next 14 days availability?"
                buttonText="Mark Availability Now"
                action={() => {
                  Actions.jump('availability');
                }}
              />
            );
          }}
        />
      )}
    </View>
  );
}

import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  BookingStops,
  Button,
  JobSummary,
  AnimatedButton,
} from '../../components';
import styles from './JobDetailsStyles';
import {Colors, Fonts} from '../../theme';
import util from '../../util';
export default function JobDetailsView(props) {
  const {job, callback, acceptAvailable, acceptPress, loading} = props;
  const {booking_number, delivery, accepted} = job;
  return (
    <View style={styles.container}>
      <CustomNavbar
        style={styles.navBar}
        whiteBack
        titleColor={Colors.white}
        title={`job# ${booking_number}`}
      />
      {/* content start */}
      <View style={styles.content}>
        {/* */}
        <JobSummary
          data={job}
          acceptJobDetail={true}
          extraScroll={acceptAvailable && !accepted}
        />
      </View>
      {/* content end */}
      {acceptAvailable && !accepted && (
        <View style={styles.acceptButton}>
          <AnimatedButton
            loading={loading}
            text="Hold to accept"
            onPress={() => acceptPress(delivery)}
            buttonColors={[Colors.redGradient, Colors.blackGradient]}
          />
        </View>
      )}
    </View>
  );
}

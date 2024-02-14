import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import {
  Text,
  Image,
  CustomNavbar,
  SubTabs,
  JobActivityItem,
} from '../../components';
import styles from './PerformJobStyles';
import {Colors, Metrics} from '../../theme';
import util from '../../util';
import RBSheet from 'react-native-raw-bottom-sheet';

export default function PerformJobView(props) {
  const {jobInProgress, startClick} = props;
  const {
    booking_number,
    duration_minutes,
    user,
    note_driver,
    loading_time_minutes,
    unloading_time_minutes,
    vehicle,
    location,
    delivery,
  } = jobInProgress;
  //   pickup: "2020-02-25T08:31:00.000Z"
  // name: "No title"
  // delivery: 262
  // required_time: 2
  // size: "small"
  // stairs: 0
  // ride_along: 0
  // distance_meter: 43.8
  // route_id: 285
  // client_id: 158
  // duration_minutes: 194.13
  // booking_number: "2502200636003"
  // service_id: 1
  // vehicle_id: 2
  // note_driver: ""
  // loading_time_minutes: 10
  // unloading_time_minutes: 10
  // reward_pence: 7094
  // extra_charge_value: 50
  // extra_charge_mins: 1
  // inital_total_pence: 8868
  // user: {id: 158, email: "zainmusani@gmail.com", firstName: "Zain", lastName: "Abbas", admin: false, …}
  // accepted: true
  // grace_time_minutes: 10
  // location: (5) [{…}, {…}, {…}, {…}, {…}, keys: ƒ, map: ƒ, filter: ƒ, slice: ƒ, concat: ƒ, …]
  // numberOfStops: 5
  // vehicle: {createdAt: "2019-09-24T11:29:35.162Z", updatedAt: "2019-09-24T11:29:35.162Z", id: 1, title: "Cargo Bike", order: 1, …}
  // numberOfItems: 0
  return (
    <View style={styles.container}>
      <CustomNavbar
        style={styles.navBar}
        whiteBack
        titleColor={Colors.white}
        title={`Job# ${booking_number}`}
      />
      <View style={styles.content}>
        <FlatList
          data={location}
          keyExtractor={(item, index) => util.keyExtractor(index)}
          renderItem={({item, index}) => {
            return (
              <JobActivityItem
                location={item}
                index={index}
                startClick={startClick}
                orderNumber={booking_number}
                delivery={delivery}
                jobInProgress={jobInProgress}
              />
            );
          }}
        />
      </View>
    </View>
  );
}

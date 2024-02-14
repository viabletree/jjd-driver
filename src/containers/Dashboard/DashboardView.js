import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, CustomNavbar} from '../../components';
import styles from './DashboardStyles';
export default function DashboardView(props) {
  return (
    <View style={styles.container}>
      <CustomNavbar />
      <Text>welcome to Dashboard</Text>
    </View>
  );
}

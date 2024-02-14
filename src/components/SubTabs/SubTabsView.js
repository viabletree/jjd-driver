import React from 'react';
import {View, Image as RnImage, FlatList} from 'react-native';
import {Text, Image, SubTabItem} from '../../components';
import styles from './SubTabsStyles';
export default function SubTabsView(props) {
  const {tabs, tabSelect} = props;
  return (
    <View style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(item => {
          return (
            <SubTabItem item={item} tabSelect={index => tabSelect(index)} />
          );
        })}
      </View>
    </View>
  );
}

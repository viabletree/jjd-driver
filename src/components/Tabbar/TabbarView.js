import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, ButtonView} from '../../components';
import styles from './TabbarStyles';
import {Fonts, Colors} from '../../theme';
export default function TabbarView(props) {
  const {
    tabData,
    selectedTab,
    onTabSelect,
    showAvailabilityMark,
    showCounter,
    availableJobsUpcoming,
  } = props;
  return (
    <View style={styles.container}>
      {tabData.map((element, index) => {
        let selected = selectedTab === index;
        return (
          <ButtonView
            key={index}
            style={styles.itemWrapper}
            onPress={() => {
              onTabSelect(index);

              element.onPress();
            }}>
            <View style={styles.btn1}>
              <RnImage
                style={{height: 50, width: 18}}
                resizeMode="contain"
                source={selected ? element.selectedImage : element.image}
              />
            </View>
            <Text
              size={Fonts.size.xi}
              type="bold"
              color={selected ? Colors.text.primary : Colors.text.grey}>
              {element.name}
            </Text>
            {selected && <View style={styles.line} />}
            {index === 2 && showAvailabilityMark && (
              <View style={styles.redDot} />
            )}
            {index === 1 && availableJobsUpcoming.length > 0 && (
              <View style={styles.counter}>
                <Text color={Colors.text.white} size={Fonts.size.x} type="bold">
                  {availableJobsUpcoming.length}
                </Text>
              </View>
            )}
          </ButtonView>
        );
      })}
    </View>
  );
}

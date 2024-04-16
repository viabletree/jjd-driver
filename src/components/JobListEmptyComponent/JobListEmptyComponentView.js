import React from 'react';
import {View, Image as RnImage} from 'react-native';
import {Text, Image, Button} from '../../components';
import styles from './JobListEmptyComponentStyles';
import {AppStyles, Fonts, Images, Colors, Metrics} from '../../theme';
export default function JobListEmptyComponentView(props) {
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            alignSelf: 'center',
            marginTop: Metrics.screenHeight / 3,
          },
          AppStyles.flex,
        ]}>
        <Text
          color={Colors.accent}
          style={{textAlign: 'center'}}
          size={Fonts.size.xxii}>
          {props.title}
        </Text>
        {props.subTitle && (
          <Text
            color={Colors.text.darkGrey}
            style={{paddingHorizontal: 32, textAlign: 'center'}}
            size={Fonts.size.xii}>
            Start earning today. Tap the search button below to search open jobs
            for you.
          </Text>
        )}
        {props.buttonText && (
          <Button
            onPress={props.action}
            style={styles.searchButton}
            color={Colors.white}
            type="bold"
            textStyle={{zIndex: 2}}>
            {props.buttonText}
          </Button>
        )}
      </View>
    </View>
  );
}

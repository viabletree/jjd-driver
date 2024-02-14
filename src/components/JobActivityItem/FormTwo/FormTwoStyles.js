import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  backArrow: {marginTop: 20, marginLeft: 20, alignSelf: 'flex-start'},
  infoParent: {marginTop: 15, marginStart: 20, alignSelf: 'flex-start'},
  line: {
    width: Metrics.screenWidth,
    height: 1,
    backgroundColor: Colors.silver,
  },
  formParent: {marginHorizontal: 20, marginVertical: 10},
  buttonParent: {
    paddingHorizontal: Metrics.screenWidth / 4,
    marginVertical: 20,
  },
  buttonStyles: {
    backgroundColor: Colors.accent,
  },
});

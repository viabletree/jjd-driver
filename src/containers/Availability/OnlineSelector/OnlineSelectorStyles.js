import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', alignItems: 'center'},
  buttonsParent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: Metrics.screenWidth,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  button: {height: 38, flex: 0.5},
  hoursParent: {flexDirection: 'row', marginTop: 12},
  offlineTextParent: {marginVertical: 40, alignItems: 'center'},
});

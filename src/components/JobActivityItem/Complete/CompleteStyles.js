import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', marginTop: 20},
  line: {
    width: Metrics.screenWidth,
    height: 1,
    backgroundColor: Colors.silver,
    marginTop: 10,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 10,
  },
  buttonParent: {
    marginTop: 80,
    paddingHorizontal: 30,
  },
});

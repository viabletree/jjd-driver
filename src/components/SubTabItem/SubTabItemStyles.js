import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
    alignItems: 'center',
    backgroundColor: Colors.text.primary,
  },
  titleParent: {
    flex: 1,
    justifyContent: 'center',
  },
  line: {
    backgroundColor: Colors.white,
    height: 3,
    width: 40,
    borderRadius: 100,
  },
});

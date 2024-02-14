import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.accentLight,
    flex: 1,
  },
  navBar: {
    backgroundColor: Colors.accent,
  },
  alertBox: {
    backgroundColor: '#ff7474',
    paddingHorizontal: 50,
    paddingVertical: 10,
  },
  infoText: {marginTop: 50, alignItems: 'center', justifyContent: 'center'},
});

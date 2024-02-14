import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {backgroundColor: Colors.accent},
  tabs: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: Colors.text.primary,
    borderRadius: Metrics.borderRadius,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: -1,
  },
});

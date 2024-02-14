import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    paddingHorizontal: Metrics.ratio(20),
    paddingTop: 60,
    flex: 1,
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: Colors.fab,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  codeHeading: {
    marginBottom: 20,
  },
});

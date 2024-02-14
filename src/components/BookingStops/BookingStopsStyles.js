import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {minHeight: 100},
  content: {
    backgroundColor: 'white',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 4,
  },
  stopItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'pink',
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.border,
  },
  activityIndicator: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

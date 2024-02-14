import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  content: {
    flex: 1,
  },
  onJob: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    zIndex: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 60,
    borderRadius: 15,
  },
});

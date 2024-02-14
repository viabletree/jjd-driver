import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    height: Metrics.navBarHeight,

    backgroundColor: Colors.white,
    shadowColor: Colors.white,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderTopColor: Colors.border,
    borderTopWidth: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    ...AppStyles.flexRow,
    ...AppStyles.spaceAround,
  },
  itemWrapper: {
    alignItems: 'center',
  },
  btn1: {
    width: 50,
    height: 35,
    ...AppStyles.centerInner,
  },
  line: {
    marginTop: 6,
    height: 4,
    width: 40,
    backgroundColor: Colors.accent,
  },
  redDot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: Colors.bitterSweet1,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  counter: {
    height: 15,
    width: 15,
    borderRadius: 8,
    backgroundColor: Colors.linkBlue,
    position: 'absolute',
    top: 10,
    right: 20,
    ...AppStyles.centerInner,
  },
});

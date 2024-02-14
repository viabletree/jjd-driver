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
  picturesParent: {
    margin: 20,
  },
  positiveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    marginVertical: 20,
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 44,
    borderWidth: 2,
    borderColor: Colors.transparent,
    // position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
});

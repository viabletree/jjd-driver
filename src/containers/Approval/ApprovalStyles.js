import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  topPart: {
    alignItems: 'center',
    flex: 1,
    marginTop: '20%',
  },
  image: {},
  topText: {
    alignItems: 'center',
    marginTop: 50,
  },
  switchMainParent: {
    marginTop: 85,
    alignItems: 'center',
  },
  switchParent: {
    alignItems: 'center',
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  bottomText: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: Metrics.borderRadius,
  },
  txtUnderline: {
    textDecorationLine: 'underline',
  },
});

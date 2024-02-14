import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    borderRadius: Metrics.borderRadius,
    padding: 14,
    paddingTop: 8,
    backgroundColor: 'white',
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginHorizontal: 15,
    marginBottom: 8,
  },
  topHeading: {
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  infoIcon: {
    marginTop: 2,
    height: 12,
    width: 12,
    resizeMode: 'contain',
  },
  bottomView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
});

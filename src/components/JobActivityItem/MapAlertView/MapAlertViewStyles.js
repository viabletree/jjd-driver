import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 16},
  mapPortionParent: {alignItems: 'center', marginTop: 10},
  mapIcon: {height: 60, width: 60, resizeMode: 'contain'},
  mapIconWaze: {height: 55, width: 60, resizeMode: 'contain'},
  mapIconParentView: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 20,
  },
  spacer: {width: 20},
  box: {
    flex: 1,
    borderColor: '#b4b3b3',
    borderWidth: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    ...AppStyles.boxShadow,
  },
  boxViewParent: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
  },
  locationDetails: {marginTop: 10},
  locationDetailsItem: {flexDirection: 'row'},

  lineHeight: {
    lineHeight: 20,
  },
});

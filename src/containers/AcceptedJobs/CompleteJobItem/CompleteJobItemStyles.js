import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../../theme';

export default StyleSheet.create({
  //
  comRow: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 4,
    marginBottom: 10,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textRow: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
  },
  dateIcon: {
    width: 13,
    height: 13,
    marginRight: 5,
  },
});

import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.accentLight},
  bookingWrapper: {
    ...AppStyles.flex,
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 17,
  },
  acceptButton: {
    alignSelf: 'center',
    bottom: 15,
    position: 'absolute',
    width: 145,
    backgroundColor: '#f8bd55',
  },
  marginBottom: {
    marginBottom: 80,
  },
  extraDetailRow: {
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 4,
    marginBottom: 12,

    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  minHeight: {
    minHeight: 130,
  },
  jobCompleteWrap: {
    paddingHorizontal: 15,
  },
  borderStyle: {
    width: 8,
    height: 20,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderLeftColor: Colors.lightGrey,
    borderBottomColor: Colors.lightGrey,
  },
});

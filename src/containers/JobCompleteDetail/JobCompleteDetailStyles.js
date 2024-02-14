import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  navBar: {
    backgroundColor: Colors.accent,
  },
  detailBox: {
    paddingHorizontal: 17,
    paddingTop: 16,
    borderRadius: 4,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 10,
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
});

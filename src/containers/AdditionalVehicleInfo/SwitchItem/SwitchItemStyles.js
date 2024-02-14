import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    paddingHorizontal: 20,
  },
  switchItem: {
    marginBottom: 45,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    marginTop: 50,
    paddingHorizontal: 10,
  },
  vehicleTypeParent: {
    marginTop: 25,
    flexDirection: 'row',
  },
  vehicleType: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleTypeSelected: {
    flex: 1,
    alignItems: 'center',
  },
  vehicleImage: {
    ...AppStyles.mRight15,
    width: 75,
    height: 65,
    resizeMode: 'contain',
  },

  imgWrapper: {
    ...AppStyles.flexRow,
  },
  opacityDisable: {
    opacity: 0.3,
  },
});

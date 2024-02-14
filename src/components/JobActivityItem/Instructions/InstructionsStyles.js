import {StyleSheet, AppState} from 'react-native';
import {Colors, AppStyles} from '../../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingBottom: 50,
    paddingHorizontal: 16,
  },
  locationDetails: {marginTop: 10},
  locationDetailsItem: {flexDirection: 'row'},
  buttonParent: {
    paddingHorizontal: 20,
    marginTop: 40,
    marginBottom: 20,
  },
  button: {
    backgroundColor: Colors.accent,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
  },
  textAlignCenter: {
    textAlign: 'center',
  },
});

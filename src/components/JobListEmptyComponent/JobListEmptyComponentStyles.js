import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,

    height: Metrics.screenHeight / 2,
  },
  searchButton: {
    marginTop: 25,
    alignSelf: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.accent,
  },
});

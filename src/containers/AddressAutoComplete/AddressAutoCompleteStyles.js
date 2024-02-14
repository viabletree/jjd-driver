import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    flex: 1,
  },
  textInput: {
    paddingHorizontal: 20,
  },
  list: {
    paddingTop: 10,

    flex: 1,
  },
  addressItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  loaderCrossParent: {
    position: 'absolute',
    right: 30,
    bottom: 15,
  },
  crossIcon: {height: 20, width: 20},
  infoText: {marginTop: 50, alignItems: 'center', justifyContent: 'center'},
});

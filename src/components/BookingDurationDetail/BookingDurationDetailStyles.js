import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 14,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  stopItemParent: {
    backgroundColor: Colors.white,
    marginTop: 10,
    shadowColor: Colors.black,
    borderRadius: 3,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  lShape: {
    height: 23,
    width: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#dedede',
    borderBottomWidth: 2,
    borderBottomColor: '#dedede',
  },
  callSmsButton: {
    backgroundColor: '#d6d5d5',
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 2,
    height: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

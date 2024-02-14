import {StyleSheet} from 'react-native';
import {Colors, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  content: {
    padding: 16,
    flex: 1,
  },
  topValuesParent: {
    flexDirection: 'row',
  },
  topItem: {
    backgroundColor: Colors.accent,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: Metrics.borderRadius,
  },
  stopItemParent: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.border,
  },
  innerText: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    flex: 1,
    justifyContent: 'center',
  },
  acceptButton: {
    alignSelf: 'center',
    bottom: 40,
    position: 'absolute',
    width: Metrics.screenWidth - 50,
  },
});

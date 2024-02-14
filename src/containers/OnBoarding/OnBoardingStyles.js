import {StyleSheet} from 'react-native';
import {Colors, Fonts, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  profilePicParent: {
    marginTop: 25,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    height: 111,
    width: 111,
    alignSelf: 'center',
  },
  camIconParent: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 44 / 2,
    height: 44,
    width: 44,
    zIndex: 100,
  },
  camIcon: {
    height: 16,
    width: 20,
    resizeMode: 'contain',
  },
  fab: {
    height: 60,
    width: 60,
    borderRadius: 60 / 2,
    backgroundColor: Colors.fab,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  inputField: {
    marginTop: 5,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Metrics.borderRadius,
    padding: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.xviii,
    color: Colors.text.primary,
  },
  userPhParent: {
    backgroundColor: '#eeeeee',
    height: 110,
    width: 110,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
});

import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  stopItem: {
    height: 130,

    flexDirection: 'row',
    paddingStart: 15,
  },
  title: {flex: 1, marginTop: 15, lineHeight: 20, marginEnd: 8},
  lineHeight: {lineHeight: 24},
  line: {
    height: '100%',
    width: 2,
    backgroundColor: Colors.border,
  },
  multiStopTopLine: {
    height: '100%',
    borderColor: Colors.border,
    borderWidth: 1,
  },
  multiStopMiddleLine: {
    marginTop: 10,
    height: '80%',
    borderColor: Colors.border,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 1,
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: Colors.accent,
    position: 'absolute',
    top: 20,
    left: -4,
  },
  infoCaption: {
    flex: 3,
    marginStart: 15,
    marginTop: 15,
    marginRight: 15,
  },
  infoValue: {
    flex: 2,
    marginTop: 15,
    marginStart: -10,
  },
});

// @flow
import {StyleSheet} from 'react-native';
import {Colors, Metrics, Fonts, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    marginTop: 5,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Metrics.borderRadius,
    padding: 12,
    fontFamily: Fonts.type.base,
    fontSize: Fonts.size.xviii,
    color: Colors.text.primary,
  },
  buttonOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  arrowIcon: {
    width: 18 * 0.58,
    height: 18,
    ...AppStyles.mRight10,
  },
  multilineInput: {
    height: 120,
    paddingTop: 10,
    paddingBottom: 10,
    textAlignVertical: 'top',
  },
});

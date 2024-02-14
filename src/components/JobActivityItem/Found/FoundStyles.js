import {StyleSheet} from 'react-native';
import {Colors} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white', paddingHorizontal: 16},
  positiveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.accent,
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: Colors.transparent,
  },
  blueButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.linkBlue,
    borderRadius: 24,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  anyIssue: {
    marginTop: 30,
    alignItems: 'center',
  },
  redButton: {
    backgroundColor: Colors.white,
    borderColor: Colors.bitterSweet1,
    borderRadius: 24,
    borderWidth: 2,
    marginTop: 15,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
});

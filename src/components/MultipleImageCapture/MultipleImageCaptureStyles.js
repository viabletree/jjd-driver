import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  imageCaptureWrap: {
    ...AppStyles.flex,
    ...AppStyles.mLeft20,
    ...AppStyles.mRight20,
  },
  headingWrapper: {
    ...AppStyles.mTop40,
    ...AppStyles.pRight50,
    ...AppStyles.pLeft50,
    justifyContent: 'center',
  },
  imgSelectorWrapper: {
    ...AppStyles.flexRow,
    ...AppStyles.mTop5,
    ...AppStyles.justifyContentCenter,
    flexWrap: 'wrap',
  },
  imgSelectorCol: {
    width: '30.6%',
    ...AppStyles.mLeft5,
    ...AppStyles.mRight5,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.justifyContentCenter,
    height: 90,
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dashed',
    borderColor: Colors.athensGray,
    ...AppStyles.mBottom10,
    overflow: 'hidden',
  },
  addImg: {
    width: 31,
    height: 31,
  },
  doneBtn: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 103,
    height: 38,
    borderRadius: 24.5,
    backgroundColor: Colors.accent,
  },
  uploadImg: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  borderWidth: {
    borderStyle: 'solid',
  },
  closeBtn: {
    ...AppStyles.alignItemsCenter,
    ...AppStyles.justifyContentCenter,
    position: 'absolute',
    width: 22,
    height: 22,
    right: 2,
    top: 2,
  },
  closeBtnIcon: {
    width: 25,
    height: 25,
  },
});

import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  collectionBox: {
    backgroundColor: 'white',
    borderRadius: 4,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 7,
    // marginHorizontal: 15,
    ...AppStyles.shadow1,
  },
  collectionBoxWrapper: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
    alignItems: 'center',
  },
  descriptionRow: {
    ...AppStyles.flexRow,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.mTop5,
  },
  nameRow: {
    ...AppStyles.flexRow,
    ...AppStyles.mTop10,
    ...AppStyles.mBottom10,
    ...AppStyles.alignItemsCenter,
  },
  mapIcon: {
    width: 20,
    height: 20,
  },
  sadIcon: {
    width: 30,
    height: 30,
  },
  phoneIcon: {
    width: 20,
    height: 20,
  },
  sliderSize: {
    width: 89,
    height: 89,
  },
  acceptJobListSection: {paddingHorizontal: 15},
  acceptJobListWrap: {
    backgroundColor: Colors.white,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 7,
    // marginHorizontal: 15,
    ...AppStyles.shadow1,
    borderRadius: 4,
  },
  acceptJobList: {
    ...AppStyles.flexRow,
    ...AppStyles.spaceBetween,
  },
  startButton: {
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.linkBlue,
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  findLocationButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 24,
    borderColor: Colors.linkBlue,
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacer: {flex: 0.1},
  bottomSheetContainer: {
    overflow: 'visible',
    paddingTop: 10,
    borderRadius: 9,
  },
  imageItem: {
    borderWidth: 1,
    marginHorizontal: 15,
    borderColor: Colors.border,
  },
});

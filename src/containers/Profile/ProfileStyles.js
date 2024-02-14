import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  profileWrapper: {
    ...AppStyles.pRight15,
    ...AppStyles.pLeft15,
  },
  rectangleBox: {
    ...AppStyles.pTop10,
    ...AppStyles.pBottom10,
    ...AppStyles.pRight15,
    ...AppStyles.pLeft15,
    ...AppStyles.mTop15,
    backgroundColor: Colors.white,
    borderRadius: 4,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  colorBox: {
    ...AppStyles.flex,
    ...AppStyles.pTop20,
    ...AppStyles.pBottom20,
    ...AppStyles.pRight20,
    ...AppStyles.pLeft20,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.justifyContentCenter,
    ...AppStyles.textAlignCenter,
    borderRadius: 4,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  accentBg: {
    backgroundColor: Colors.accent,
  },
  selectiveYellowBg: {
    backgroundColor: Colors.selectiveYellow,
  },
  profileRow: {
    height: (Metrics.screenHeight * 30) / 100,
    ...AppStyles.alignItemsCenter,
    ...AppStyles.justifyContentCenter,
  },
  profileImgBlur: {
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  absoluteRow: {
    position: 'absolute',
    zIndex: 999,
  },
  profileImgAvatar: {
    resizeMode: 'cover',
    width: 110,
    height: 110,
    borderRadius: 100,
  },
  driverName: {
    textTransform: 'capitalize',
  },
  overlay: {
    backgroundColor: '#0000009e',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: 99,
  },
  logoutRow: {
    position: 'absolute',
    zIndex: 999999,
    top: 15,
    right: 15,
  },

  onJob: {
    position: 'absolute',
    bottom: 10,
    right: 0,
    left: 0,
    zIndex: 10,
    marginHorizontal: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    overflow: 'hidden',
    height: 60,
    borderRadius: 15,
  },
  tempButtonItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: Colors.grey,
    borderRadius: 10,
    marginLeft: 5,
  },
  signature: {
    flex: 1,
    borderColor: '#000033',
    borderWidth: 1,
  },
});

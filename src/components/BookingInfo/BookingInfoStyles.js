import {StyleSheet} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1},
  navBar: {
    backgroundColor: Colors.accent,
  },

  detailBox: {
    paddingHorizontal: 17,
    paddingTop: 16,
    borderRadius: 4,
    paddingBottom: 15,
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 10,
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
  colorWhite: {
    color: Colors.white,
  },
  imgSize: {
    width: 115,
    height: 130,
    marginLeft: 15,
  },
  iconImgCock: {
    width: 17,
    height: 17,
    resizeMode: 'contain',
  },
  iconImgBox: {
    width: 17,
    height: 15,
    resizeMode: 'contain',
  },
  earningBox: {
    ...AppStyles.flexRow,

    ...AppStyles.justifyContentCenter,
    ...AppStyles.spaceBetween,
    ...AppStyles.alignItemsCenter,
    backgroundColor: Colors.accent,
    width: '85%',
    marginRight: 'auto',
    marginLeft: 'auto',
    paddingTop: 11,
    paddingBottom: 11,
    borderRadius: 4,
    marginTop: -25,
    paddingLeft: 20,
    paddingRight: 20,
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
  boxWrap: {
    paddingLeft: 16,
    paddingRight: 16,

    flex: 1,
  },
  colWrapper: {
    marginTop: 16,
  },
  boxCol: {
    borderRadius: 4,
    shadowColor: 'green',
    backgroundColor: Colors.white,
    marginRight: 15,
    justifyContent: 'center',
    paddingTop: 13,
    paddingBottom: 13,
    alignItems: 'center',
    ...AppStyles.shadow3,
  },
});

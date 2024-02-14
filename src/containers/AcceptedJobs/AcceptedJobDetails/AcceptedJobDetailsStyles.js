import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  content: {
    flex: 1,
    marginBottom: 65,
  },
  topValuesParent: {
    flexDirection: 'row',
  },
  topItem: {
    backgroundColor: Colors.text.primary,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginRight: 8,
    borderRadius: Metrics.borderRadius,
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
  carImage: {
    width: 56,
    height: 47,
    resizeMode: 'contain',
    marginRight: 20,
  },
  lShape: {
    height: 23,
    width: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#dedede',
    borderBottomWidth: 2,
    borderBottomColor: '#dedede',
  },
  buttonsParent: {
    margin: 'auto',

    flex: 1,
    justifyContent: 'center',
    marginTop: 35,
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    zIndex: 999,
    paddingHorizontal: 10,
  },
  acceptButton: {
    backgroundColor: Colors.accent,
  },
  infoText: {marginTop: 50, alignItems: 'center', justifyContent: 'center'},
  doneBs: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  detailBox: {
    paddingHorizontal: 17,
    paddingTop: 16,
    borderRadius: 4,
    paddingBottom: 15,
    backgroundColor: Colors.white,

    width: Metrics.screenWidth - 30,
    marginTop: 10,
    //shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 5,
  },
});

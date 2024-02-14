import {StyleSheet, AppState} from 'react-native';
import {Colors, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 30,
    ...AppStyles.pLeft20,
    ...AppStyles.pRight20,
    //...AppStyles.pBottom40,
    ...AppStyles.flex,
    marginBottom: 90,
  },
  scrollStyle: {
    backgroundColor: '#fff',
  },
  vehicleWrapper: {
    ...AppStyles.mTop50,
  },
  vehicleRow: {
    ...AppStyles.flexRow,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activeVehicle: {
    backgroundColor: Colors.accentLight,
  },
  vehicleCol: {
    ...AppStyles.pTop15,
    ...AppStyles.pLeft15,
    ...AppStyles.pRight15,
    ...AppStyles.pBottom15,
    ...AppStyles.mBottom20,
    ...AppStyles.alignItemsCenter,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ebebeb',
    width: '47%',
  },
  vehicleImg: {
    width: 55,
    height: 60,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  regFieldWrapper: {
    ...AppStyles.mTop25,
  },
  vanRegField: {
    ...AppStyles.mTop10,
    ...AppStyles.pLeft10,
    ...AppStyles.pRight10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    height: 47,
    color: Colors.text.primary,
  },
  errorBorder: {
    borderColor: Colors.red,
  },
  activityIndicator: {
    backgroundColor: '#fff',
    ...AppStyles.margin20,
  },
  vehicleTitle: {
    ...AppStyles.mTop10,
  },
});

import {StyleSheet} from 'react-native';
import {Colors} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {},
  vehicleTypeParent: {
    marginTop: 25,
    flexDirection: 'row',
  },
  vehicleType: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleTypeSelected: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleImage: {
    marginTop: 21,
    height: 52,
    width: 60,
  },
  infoParent: {
    marginHorizontal: 15,
    marginTop: 18,
    paddingTop: 11,
    paddingStart: 20,
    paddingEnd: 10,
  },
  infoItemParent: {
    marginTop: 6,
    flexDirection: 'row',
  },
  infoText: {
    flex: 1,
    lineHeight: 24,
  },
  fab: {
    zIndex: 1,
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
  loader: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    padding: 10,
  },
  vehicleTitle: {
    marginBottom: 21,
  },
});

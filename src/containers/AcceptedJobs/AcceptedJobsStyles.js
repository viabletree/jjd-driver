import {StyleSheet} from 'react-native';
import {Colors, Metrics, AppStyles} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  content: {
    paddingTop: 12,
    flex: 1,
  },
  listSectionHeaderParent: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  listSectionHeaderText: {
    marginHorizontal: 11,
  },
  searchButton: {
    alignSelf: 'center',
    marginTop: 25,
    width: 165,
    backgroundColor: Colors.accent,
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
  //
});

import {StyleSheet} from 'react-native';
import {Colors, AppStyles, Metrics} from '../../theme';

export default StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.white},
  navBar: {
    backgroundColor: Colors.accent,
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  todayonline: {
    margin: 16,
    marginBottom: 10,
    ...AppStyles.boxShadow,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    minHeight: 60,
  },
  onlineTodayLabelParent: {
    flex: 1,
  },
  calendarHeading: {
    ...AppStyles.boxShadow,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginTop: 10,
    backgroundColor: Colors.black,
    borderRadius: Metrics.borderRadius,
    zIndex: 1,
  },
  calendar: {
    ...AppStyles.boxShadow,
    marginTop: -5,
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  flatListParent: {
    ...AppStyles.boxShadow,
    flex: 1,
    height: 200,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 16,
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
  noDataParent: {
    textAlignVertical: 'center',
    justifyContent: 'center',
    marginVertical: 15,
  },
  pBottom65: {
    paddingBottom: 65,
  },
});

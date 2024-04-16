import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AvailabilityView from './AvailabilityView';
import {
  setSelectedTab,
  updateLastAvailabilityVisit,
} from '../../actions/GeneralActions';
import {
  markAvailabilityRequest,
  getAvailabilityRequest,
  postAvalabilityToggleRequest,
} from '../../actions/AvailabilityActions';
import {profileDataRequest} from '../../actions/UserActions';
import _ from 'lodash';
import moment from 'moment';
import util from '../../util';
import {timeLaps} from '../../constants';

class AvailabilityController extends React.Component {
  constructor() {
    super();
    let markedDates = {};
    markedDates[moment().format('YYYY-MM-DD')] = {marked: true};
    this.state = {
      availability: [],
      onlineToday: false,
      availableDays: [],
      markedDates,
      setTimeOf: {},
      timeChangeIndex: -1,
      startIndex: -1,
      endIndex: -1,
      dayLoading: false,
      setGoOnline: false,
      offlineMessage: 'Notification Off. You can still see jobs',
      calendarClickedData: {},
      isLoaderAvailability: false,
    };
    AvailabilityController.instance = this;
  }

  static onExit() {
    if (AvailabilityController.instance) {
      AvailabilityController.instance._onExit();
    }
  }

  static onEnter() {
    if (AvailabilityController.instance) {
      AvailabilityController.instance._onEnter();
    }
  }
  _onExit() {}

  _onEnter() {
    this.props.setSelectedTab(2);
    this.props.updateLastAvailabilityVisit(moment().unix());
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {availability} = nextProps;
    let availableDays = [];
    // let onlineToday = false;
    // let offlineMessage = 'I am going unavailable for full day';
    let markedDates = {};
    markedDates[moment().format('YYYY-MM-DD')] = {marked: true};
    if (availability.length != prevState.availability.length) {
      // console.log('here in getDerivedStateFromProps', availability);
      availability.forEach(element => {
        let avDate = element.availabilityDate;
        let today = moment();
        let isToday = !moment(avDate).isAfter(today, 'day');
        let tempMarkDate = {};
        tempMarkDate.selected = true;
        tempMarkDate.marked = isToday;

        markedDates[moment(avDate).format('YYYY-MM-DD')] = tempMarkDate;
        let selected = moment(avDate).format('DD/MM');
        let selectedDay = moment(avDate).format('dddd');
        let tempAvailableDay = {};
        tempAvailableDay.title = selected;
        tempAvailableDay.selectedDay = selectedDay;
        tempAvailableDay.dateString = moment(avDate).format('YYYY-MM-DD');
        tempAvailableDay.start = moment(element.startTime, 'HH:mm').format(
          'HH:mm',
        );
        tempAvailableDay.end = moment(element.endTime, 'HH:mm').format('HH:mm');
        availableDays.push(tempAvailableDay);
        if (isToday) {
          const startTime = moment(tempAvailableDay.start, 'HH:mm');
          const endTime = moment(tempAvailableDay.end, 'HH:mm');
          // if (today.isBetween(startTime, endTime)) {
          //   onlineToday = true;
          // } else {
          //   offlineMessage = today.isAfter(endTime)
          //     ? "you're unavailable"
          //     : 'Today you will be available from ' + tempAvailableDay.start;
          // }
        }
        // console.log({availableDays});
      });
      return {
        markedDates,
        availableDays,
        availability,
        // onlineToday,
        // offlineMessage,
      };
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.props.getAvailabilityRequest();
    this.props.profileDataRequest((status, data) => {
      this.setState({onlineToday: data.app_notification});
      if (data.app_notification) {
        this.setState({offlineMessage: 'New job notification on'});
      } else {
        this.setState({
          offlineMessage: 'Notification off. You can still see jobs',
        });
      }
    });
  }
  static propTypes = {};
  static defaultProps = {};
  onlineTodayToggle = () => {
    let current = moment().format('HH');
    let markedDates = _.cloneDeep(this.state.markedDates);
    let tempMarkDate = {};
    let availableDays = _.cloneDeep(this.state.availableDays);
    console.log({current});
    if (this.state.onlineToday || current < 20) {
      const {onlineToday} = this.state;
      let newState = !onlineToday;
      if (onlineToday) {
        // this.setState({setGoOnline: true}, () => {
        //   this.bottomSheetRef.open();
        // });
      }
      this.setState({onlineToday: false});
      tempMarkDate.selected = true;
      tempMarkDate.marked = true;
      markedDates[moment().format('YYYY-MM-DD')] = tempMarkDate;
      let selected = moment().format('DD/MM');
      let selectedDay = moment().format('dddd');
      let tempAvailableDay = {};
      tempAvailableDay.title = selected;
      tempAvailableDay.selectedDay = selectedDay;
      let today = moment();
      today.set({h: 6, m: 0});
      tempAvailableDay.start = moment(today).format('HH:mm');
      today.set({h: 20, m: 0});
      tempAvailableDay.end = moment(today).format('HH:mm');
      tempAvailableDay.dateString = today.format('YYYY-MM-DD');
      if (
        availableDays.length > 0 &&
        availableDays[0].dateString == today.format('YYYY-MM-DD')
      ) {
        availableDays[0] = tempAvailableDay;
      } else {
        availableDays.push(tempAvailableDay);
        availableDays.sort(function (a, b) {
          // Turn your strings into dates, and then subtract them
          // to get a value that is either negative, positive, or zero.
          return new Date(a.dateString) - new Date(b.dateString);
        });
      }

      let tempAvailability = [];
      let tempAvailabilityObj = {};
      tempAvailabilityObj.date = today.format('YYYY-MM-DD');
      tempAvailabilityObj.time = [
        [tempAvailableDay.start, tempAvailableDay.end],
      ];
      tempAvailability.push(tempAvailabilityObj);
      // console.log(tempAvailability);
      const payload = {
        availability: JSON.stringify(tempAvailability),
      };
      console.log({onlineToday: this.state.onlineToday});
      if (!this.state.onlineToday) {
        this.props.markAvailabilityRequest(payload, status => {
          if (status) {
            this.setState({onlineToday: true, markedDates, availableDays});
          } else {
            this.setState({onlineToday: false});
          }
        });
      }
    } else {
      this.setState({
        offlineMessage:
          'We have no jobs after 20:00. Update your availability for next 2 week',
      });
    }
  };

  onlineTodayToggleApi = onlineToday => {
    console.log({onlineTodayToggleApi: 'here'});
    // this.setState({onlineToday: !this.state.onlineToday});
    this.setState({onlineToday: !onlineToday});
    if (!onlineToday) {
      this.setState({offlineMessage: 'New job notification on'});
    } else {
      this.setState({
        offlineMessage: 'Notification off. You can still see jobs',
      });
    }

    this.props.postAvalabilityToggleRequest(status => {
      console.log({statusstatus: status});
      if (status) {
        this.props.profileDataRequest((status, data) => {
          if (!status) {
            this.setState({onlineToday: !onlineToday});
            if (onlineToday) {
              this.setState({offlineMessage: 'New job notification on'});
            } else {
              this.setState({
                offlineMessage: 'Notification off. You can still see jobs',
              });
            }
          }
        });
      }
    });
  };

  addDaysToAvailable = data => {
    //     year: 2020
    // month: 1
    // day: 27
    // timestamp: 1580083200000
    // dateString: "2020-01-27"
    let remove = false;
    const {onlineToday, offlineMessage} = this.state;
    let backUpMarkDates = _.cloneDeep(this.state.markedDates);
    let backUpAvailableDays = _.cloneDeep(this.state.availableDays);
    let isOnlineToday = _.clone(onlineToday);
    let backUpIsOnlineToday = _.clone(onlineToday);
    let message = _.clone(offlineMessage);
    let isToday = moment().format('YYYY-MM-DD') === data.dateString;
    let markedDates = _.cloneDeep(this.state.markedDates);
    let availableDays = _.cloneDeep(this.state.availableDays);
    let test = _.has(markedDates, data.dateString);
    if (test && markedDates[data.dateString].selected) {
      if (isToday) {
        markedDates[data.dateString] = {marked: true};
        if (isOnlineToday) {
          isOnlineToday = !isOnlineToday;
          message = 'I am going unavailable for full day';
        }
      } else {
        markedDates = _.omit(markedDates, data.dateString);
      }
    } else {
      let tempMarkDate = {};
      let todayCon = moment().format('YYYY-MM-DD') === data.dateString;
      tempMarkDate.selected = true;
      tempMarkDate.marked = todayCon;
      markedDates[data.dateString] = tempMarkDate;
      if (todayCon) {
        if (!isOnlineToday) {
          isOnlineToday = !isOnlineToday;
          message = '';
        }
      }
    }
    let selected = moment(data.dateString).format('DD/MM');
    let selectedDay = moment(data.dateString).format('dddd');
    let tempAvailableDay = {};
    tempAvailableDay.title = selected;
    tempAvailableDay.selectedDay = selectedDay;
    let today = moment(data.dateString);
    today.set({h: 6, m: 0});
    tempAvailableDay.start = moment(today).format('HH:mm');
    today.set({h: 20, m: 0});
    tempAvailableDay.end = moment(today).format('HH:mm');
    tempAvailableDay.dateString = data.dateString;
    let hasDay = _.findIndex(availableDays, item => {
      return item.title === selected;
    });
    if (hasDay !== -1) {
      availableDays.splice(hasDay, 1);
      remove = true;
    } else {
      availableDays.push(tempAvailableDay);
    }
    availableDays.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.dateString) - new Date(b.dateString);
    });
    this.setState({
      markedDates,
      availableDays,
      onlineToday: isOnlineToday,
      offlineMessage: message,
    });
    let tempAvailability = [];
    let tempAvailabilityObj = {};
    tempAvailabilityObj.date = data.dateString;
    tempAvailabilityObj.time = remove
      ? []
      : [[tempAvailableDay.start, tempAvailableDay.end]];
    tempAvailability.push(tempAvailabilityObj);
    // console.log(tempAvailability);
    const payload = {
      availability: JSON.stringify(tempAvailability),
    };
    this.props.markAvailabilityRequest(payload, status => {
      this.setState({isLoaderAvailability: false});
      if (!status) {
        this.setState({
          markedDates: backUpMarkDates,
          availableDays: backUpAvailableDays,
          onlineToday: backUpIsOnlineToday,
          offlineMessage: message,
        });
      }
    });
  };
  onCalendarDateClick = data => {
    const {markedDates} = this.state;
    const test = _.has(markedDates, data.dateString);
    if (test) {
      if (markedDates[data.dateString].selected) {
        this.setState({calendarClickedData: data}, () => {
          this.confirmBottomSheetRef.open();
        });
      } else {
        this.setState({isLoaderAvailability: true});

        this.addDaysToAvailable(data);
      }
    } else {
      this.setState({isLoaderAvailability: true});

      this.addDaysToAvailable(data);
    }
  };

  unmarkDayConfirm = () => {
    this.addDaysToAvailable(this.state.calendarClickedData);
    this.confirmBottomSheetRef.close();
  };
  timeClick = index => {
    let tempDay = this.state.availableDays[index];

    let startIndex = _.findIndex(timeLaps, item => {
      return item == tempDay.start;
    });
    let endIndex = _.findIndex(timeLaps, item => {
      return item == tempDay.end;
    });
    // console.log({startIndex, endIndex});
    // console.log({tempDay});
    this.setState(
      {
        setTimeOf: tempDay.dateString,
        timeChangeIndex: index,
        startIndex,
        endIndex,
        setGoOnline: false,
      },
      () => {
        this.bottomSheetRef.open();
      },
    );
  };
  cancelBottomSheet = () => {
    this.bottomSheetRef.close();
  };
  cancelConfirmBottomSheet = () => {
    this.confirmBottomSheetRef.close();
  };

  timeUpdateDone = (start, end) => {
    const {timeChangeIndex, availableDays} = this.state;
    let tempAvlDays = _.cloneDeep(availableDays);
    let timeChangeDay = tempAvlDays[timeChangeIndex];
    timeChangeDay.start = timeLaps[start];
    timeChangeDay.end = timeLaps[end];
    tempAvlDays[timeChangeIndex] = timeChangeDay;
    let tempAvailability = [];
    let tempAvailabilityObj = {};
    tempAvailabilityObj.date = timeChangeDay.dateString;
    tempAvailabilityObj.time = [[timeChangeDay.start, timeChangeDay.end]];
    tempAvailability.push(tempAvailabilityObj);
    // console.log(tempAvailability);
    const payload = {
      availability: JSON.stringify(tempAvailability),
    };
    this.setState({dayLoading: true});
    this.props.markAvailabilityRequest(payload, status => {
      if (status) {
        this.setState({availableDays: tempAvlDays, dayLoading: false}, () => {
          this.bottomSheetRef.close();
        });
      } else {
        this.setState({dayLoading: false});
      }
    });
  };

  goUnavailable = data => {
    let message = 'Today you will be available from ' + data.end;
    let currentTime = moment();
    let tempAvailability = [];
    let tempAvailabilityObj = {};
    tempAvailabilityObj.date = currentTime.format('YYYY-MM-DD');
    const {markedDates, availableDays} = this.state;
    const tempMarkedDates = _.cloneDeep(markedDates);
    const tempAvailableDays = _.cloneDeep(availableDays);
    let todayAvailableDay = tempAvailableDays[0];
    const todayAvailableDayEnd = moment(todayAvailableDay.end, 'HH:mm');
    let timeDiff = todayAvailableDayEnd.diff(currentTime, 'hours');
    if (data.offHours >= timeDiff) {
      tempAvailableDays.splice(0, 1);
      tempMarkedDates[currentTime.format('YYYY-MM-DD')] = {marked: true};
      message = 'I am going unavailable for full day';
      tempAvailabilityObj.time = [];
    } else {
      todayAvailableDay.start = data.end;
      tempAvailabilityObj.time = [
        [todayAvailableDay.start, todayAvailableDay.end],
      ];
    }
    tempAvailability.push(tempAvailabilityObj);
    // console.log(tempAvailability);
    const payload = {
      availability: JSON.stringify(tempAvailability),
    };
    this.props.markAvailabilityRequest(payload, status => {
      this.setState({isLoaderAvailability: false});
      if (status) {
        this.setState(
          {
            onlineToday: false,
            offlineMessage: message,
            availableDays: tempAvailableDays,
            markedDates: tempMarkedDates,
          },
          () => {
            this.bottomSheetRef.close();
          },
        );
      }
    });
  };
  render() {
    const {
      onlineToday,
      markedDates,
      availableDays,
      setTimeOf,
      startIndex,
      endIndex,
      dayLoading,
      setGoOnline,
      offlineMessage,

      calendarClickedData,
      isLoaderAvailability,
    } = this.state;
    return (
      <AvailabilityView
        {...this.props}
        onlineToday={onlineToday}
        onlineTodayToggle={this.onlineTodayToggleApi}
        addDaysToAvailable={this.addDaysToAvailable}
        markedDates={markedDates}
        availableDays={availableDays}
        bottomSheetRef={ref => (this.bottomSheetRef = ref)}
        confirmBottomSheetRef={ref => (this.confirmBottomSheetRef = ref)}
        cancelConfirmBottomSheet={this.cancelConfirmBottomSheet}
        timeItemClick={this.timeClick}
        setTimeOf={setTimeOf}
        startIndex={startIndex}
        endIndex={endIndex}
        cancelBottomSheet={this.cancelBottomSheet}
        timeUpdateDone={this.timeUpdateDone}
        dayLoading={dayLoading}
        setGoOnline={setGoOnline}
        goUnavailable={this.goUnavailable}
        offlineMessage={offlineMessage}
        onCalendarDateClick={this.onCalendarDateClick}
        unmarkDayConfirm={this.unmarkDayConfirm}
        calendarClickedData={calendarClickedData}
        isLoaderAvailability={isLoaderAvailability}
      />
    );
  }
}
const mapStateToProps = ({availability, jobs}) => ({
  availability: availability.availability,
  onJob: jobs.onJob,
  jobInProgress: jobs.jobInProgress,
});
const actions = {
  markAvailabilityRequest,
  getAvailabilityRequest,
  setSelectedTab,
  updateLastAvailabilityVisit,
  postAvalabilityToggleRequest,
  profileDataRequest,
};
export default connect(mapStateToProps, actions)(AvailabilityController);

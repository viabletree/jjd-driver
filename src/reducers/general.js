// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_CSRF_TOKEN,
  SET_TRACKING_MODE,
  GET_VEHICLES,
  SET_SELECTED_TAB,
  SET_FIRST_TIME,
  LOGOUT,
  DRIVER_LOGOUT,
  AVAILABILITY_LAST_VISIT,
} from '../actions/ActionTypes';
import {TRACKING_MODE} from '../constants';
import moment from 'moment-timezone';

const initialState = Immutable({
  csrf_token: '',
  trackingMode: TRACKING_MODE.NONE,
  vehicles: [],
  selectedTab: 0,
  isFirstTime: true,
  lastAvailabilityVisit: -1,
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CSRF_TOKEN.SUCCESS: {
      return Immutable.merge(state, {
        csrf_token: action.token,
      });
    }
    case SET_TRACKING_MODE: {
      return Immutable.merge(state, {
        trackingMode: action.modeName,
      });
    }
    case GET_VEHICLES.SUCCESS: {
      return Immutable.merge(state, {
        vehicles: action.data,
      });
    }
    case SET_SELECTED_TAB: {
      return Immutable.merge(state, {
        selectedTab: action.selectedTab,
      });
    }
    case SET_FIRST_TIME: {
      return Immutable.merge(state, {
        isFirstTime: false,
      });
    }
    case LOGOUT: {
      return Immutable.merge(state, {
        csrf_token: '',
      });
    }
    // when user logout then empty data
    case DRIVER_LOGOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case AVAILABILITY_LAST_VISIT: {
      return Immutable.merge(state, {
        lastAvailabilityVisit: action.data,
      });
    }
    default:
      return state;
  }
};

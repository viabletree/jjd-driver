import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  MARK_AVAILABILITY,
  GET_AVAILABILITY,
  AVAILABLE_TOGGLE_API,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, SOMETHING_WRONG} from '../constants';
import {
  markAvailabilitySuccess,
  getAvailabilitySuccess,
} from '../actions/AvailabilityActions';

import {
  MARK_AVAILABILITY as MARK_AVAILABILITY_URL,
  GET_AVAILABILITY as GET_AVAILABILITY_URL,
  AVAILABLE_TOGGLE_API as AVAILABLE_TOGGLE_API_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import Helper from '../Helper';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message);
  }, SAGA_ALERT_TIMEOUT);
}
function* markAvailability() {
  while (true) {
    const {payload, responseCallback} = yield take(MARK_AVAILABILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        MARK_AVAILABILITY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        console.log(response);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
      alert(err.message);
    }
  }
}
function* getAvailability() {
  while (true) {
    const {responseCallback} = yield take(GET_AVAILABILITY.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_AVAILABILITY_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback();
        yield put(getAvailabilitySuccess(response.data[0]));
      } else {
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback();
      alert(err.message);
    }
  }
}
function* postAvailabilityToggle() {
  while (true) {
    const {responseCallback} = yield take(AVAILABLE_TOGGLE_API.REQUEST);
    console.log('responseCallback', responseCallback);
    try {
      const response = yield call(
        callRequest,
        AVAILABLE_TOGGLE_API_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response) {
        if (responseCallback) responseCallback(true);
      } else {
      }
    } catch (err) {
      if (responseCallback) responseCallback();
      alert(err.message);
    }
  }
}
export default function* root() {
  yield fork(markAvailability);
  yield fork(getAvailability);
  yield fork(postAvailabilityToggle);
}

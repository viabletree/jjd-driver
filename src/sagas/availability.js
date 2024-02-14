import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {MARK_AVAILABILITY, GET_AVAILABILITY} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, SOMETHING_WRONG} from '../constants';
import {
  markAvailabilitySuccess,
  getAvailabilitySuccess,
} from '../actions/AvailabilityActions';

import {
  MARK_AVAILABILITY as MARK_AVAILABILITY_URL,
  GET_AVAILABILITY as GET_AVAILABILITY_URL,
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
export default function* root() {
  yield fork(markAvailability);
  yield fork(getAvailability);
}

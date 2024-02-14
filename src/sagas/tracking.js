import {take, put, call, fork} from 'redux-saga/effects';
import {GET_TRACKING_TOKEN} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {requestTrackingTokenSuccess} from '../actions/TrackingActions';
import {
  GET_TRACKING_TOKEN as GET_TRACKING_TOKEN_URL,
  callRequest,
  ERROR_SOMETHING_WENT_WRONG,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message);
  }, SAGA_ALERT_TIMEOUT);
}

function* getTrackingToken() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_TRACKING_TOKEN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_TRACKING_TOKEN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(requestTrackingTokenSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || ERROR_SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(getTrackingToken);
}

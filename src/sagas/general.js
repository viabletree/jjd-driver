import {take, put, call, fork} from 'redux-saga/effects';
import {
  GET_CSRF_TOKEN,
  UPDATE_DEVICE_ID,
  UPLOAD_IMAGE,
  GET_VEHICLES,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT} from '../constants';
import {
  getCsrfTokenSuccess,
  getVehiclesSuccess,
} from '../actions/GeneralActions';
import {
  GET_CSRF_TOKEN as GET_CSRF_TOKEN_URL,
  UPDATE_DEVICE_ID as UPDATE_DEVICE_ID_URL,
  UPLOAD_IMAGE as UPLOAD_IMAGE_URL,
  GET_VEHICLES as GET_VEHICLES_URL,
  callRequest,
  CLOUDINARY_URL,
  ERROR_SOMETHING_WENT_WRONG,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message);
  }, SAGA_ALERT_TIMEOUT);
}

function* getCsrfToken() {
  while (true) {
    const {responseCallback} = yield take(GET_CSRF_TOKEN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_CSRF_TOKEN_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response) {
        yield put(getCsrfTokenSuccess(response._csrf));
        if (responseCallback) responseCallback(true, null);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* updateDeviceToken() {
  while (true) {
    const {payload, responseCallback} = yield take(UPDATE_DEVICE_ID.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPDATE_DEVICE_ID_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      console.log({response, payload});
      if (response) {
        if (responseCallback) responseCallback(true, null);
      } else {
        alert('Something went wrong');
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* uploadImage() {
  while (true) {
    const {payload, responseCallback} = yield take(UPLOAD_IMAGE.REQUEST);
    console.log('1');
    try {
      const response = yield call(
        callRequest,
        UPLOAD_IMAGE_URL,
        payload,
        '',
        {
          'Content-Type': 'multipart/form-data',
        },
        ApiSauce,
        CLOUDINARY_URL,
      );
      console.log('2');
      if (response.secure_url) {
        if (responseCallback) responseCallback(true, response);
        // yield put(uploadUserImageSuccess(response.url));
      } else {
        if (responseCallback) responseCallback(false, {});
        alert(ERROR_SOMETHING_WENT_WRONG);
      }
    } catch (err) {
      console.log('3');

      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getVehicles() {
  while (true) {
    const {responseCallback} = yield take(GET_VEHICLES.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_VEHICLES_URL,
        {},
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        if (responseCallback) responseCallback(true);

        yield put(getVehiclesSuccess(response.data));
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
  yield fork(getCsrfToken);
  yield fork(updateDeviceToken);
  yield fork(getVehicles);
  yield fork(uploadImage);
}

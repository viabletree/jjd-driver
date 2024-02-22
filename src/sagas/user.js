import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  REQUEST_CODE,
  VERIFY_CODE,
  GET_LOCATIONS,
  CREATE_DRIVER_PROFILE,
  PROFILE_DATA,
  DRIVER_LOGOUT,
  GET_JOBS,
  //old
  USER_LOGIN_RESET,
  VERIFY_LOGIN_CODE,
  USER_LOGIN,
  GET_USER_PROFILE,
  UPLOAD_USER_IMAGE,
  USER_LOGOUT,
  CHECK_FORBIDDEN,
  VALIDATE_POSTCODE,
  USER_SIGNUP,
  CHANGE_DRIVER_AVAILABILITY,
  SET_ADDITIONAL_VEHICLE_DATA,
  GET_VEHICLE_DETAIL_DATA_REQUEST,
  DELETE_ACCOUNT,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, SOMETHING_WRONG} from '../constants';
import {
  userLoginSuccess,
  userLoginFailure,
  createDriverProfileSuccess,
  verifyCodeSuccess,
  profileDataSuccess,
  getVehicleDetailDataSuccess,
  driverLogoutSuccess,
  driverDeleteAccountSuccess,
} from '../actions/UserActions';
// import {
//   getUserProfileSuccess,
//   uploadUserImageSuccess,
//   userLogoutSuccess,
//   changeDriverAvailabilitySuccess,
// } from '../containers/Dashboard/ProfileTab/action';

import {
  REQUEST_CODE as REQUEST_CODE_URL,
  VERIFY_CODE as VERIFY_CODE_URL,
  GET_LOCATIONS as GET_LOCATIONS_URL,
  CREATE_DRIVER_PROFILE as CREATE_DRIVER_PROFILE_URL,
  SET_ADDITIONAL_VEHICLE_DATA as SET_ADDITIONAL_VEHICLE_DATA_URL,
  GET_JOBS as GET_JOBS_URL,
  //old
  USER_LOGIN_RESET as USER_LOGIN_RESET_URL,
  VERIFY_LOGIN_CODE as VERIFY_LOGIN_CODE_URL,
  USER_LOGIN as USER_LOGIN_URL,
  GET_USER_PROFILE as GET_USER_PROFILE_URL,
  UPLOAD_USER_IMAGE as UPLOAD_USER_IMAGE_URL,
  USER_LOGOUT as USER_LOGOUT_URL,
  CHECK_FORBIDDEN as CHECK_FORBIDDEN_URL,
  VALIDATE_POSTCODE as VALIDATE_POSTCODE_URL,
  USER_SIGNUP as USER_SIGNUP_URL,
  CHANGE_DRIVER_AVAILABILITY as CHANGE_DRIVER_AVAILABILITY_URL,
  PROFILE_DATA as PROFILE_DATA_URL,
  GET_VEHICLE_DETAIL_DATA as GET_VEHICLE_DETAIL_DATA_URL,
  DRIVER_LOGOUT as DRIVER_LOGOUT_URL,
  DELETE_ACCOUNT as DELETE_ACCOUNT_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import {make_user_data} from '../Helper';

function alert(message, type = 'error') {
  setTimeout(() => {
    Util.topAlert(message);
  }, SAGA_ALERT_TIMEOUT);
}

function* requestCode() {
  while (true) {
    const {payload, responseCallback} = yield take(REQUEST_CODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        REQUEST_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, '');
        // if (responseCallback) responseCallback(true, response.data[0].code);
        // yield put(userLoginSuccess(response));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* verifyCode() {
  while (true) {
    const {payload, responseCallback} = yield take(VERIFY_CODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VERIFY_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, response.data);
        yield put(
          verifyCodeSuccess({phone: payload.phone, pass: payload.password}),
        );
        // yield Util.setGenericPassword(payload.phone, payload.password);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* userLogin() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_LOGIN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_LOGIN_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, null);
        yield put(
          userLoginSuccess(make_user_data(response.data)),
          //userLoginSuccess(Helper.make_user_vehicle_data(response.data)),
        );
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
        if (response.err) {
          yield put(userLoginFailure());
        }
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* getLocations(action) {
  const {payload, responseCallback} = action;
  try {
    const response = yield call(
      callRequest,
      GET_LOCATIONS_URL,
      payload,
      '',
      {},
      ApiSauce,
    );
    if (response.status) {
      if (responseCallback) responseCallback(true, response.data.predictions);
    } else {
      if (responseCallback) responseCallback(false, []);
    }
  } catch (err) {
    if (responseCallback) responseCallback(null, err);
    alert(err.message);
  }
}
function* createDriverProfile() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CREATE_DRIVER_PROFILE.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CREATE_DRIVER_PROFILE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(
          createDriverProfileSuccess(response.data),
          // createDriverProfileSuccess(
          //   Helper.make_user_vehicle_data(response.data),
          // ),
        );
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* setAdditionalVehicleData() {
  while (true) {
    const {payload, responseCallback} = yield take(
      SET_ADDITIONAL_VEHICLE_DATA.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        SET_ADDITIONAL_VEHICLE_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(createDriverProfileSuccess(response.data));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getVehicleDetailDataRequest() {
  while (true) {
    const {payload, responseCallback} = yield take(
      GET_VEHICLE_DETAIL_DATA_REQUEST.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        GET_VEHICLE_DETAIL_DATA_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        yield put(getVehicleDetailDataSuccess(response.data[0]));
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* profileDataRequest() {
  while (true) {
    const {responseCallback} = yield take(PROFILE_DATA.REQUEST);

    try {
      const response = yield call(
        callRequest,
        PROFILE_DATA_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        console.log('profile data', response.data);
        yield put(profileDataSuccess(response.data));

        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* driverLogoutRequest() {
  while (true) {
    const {responseCallback} = yield take(DRIVER_LOGOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DRIVER_LOGOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(driverLogoutSuccess());
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}
function* deleteAccountRequest() {
  while (true) {
    const {responseCallback} = yield take(DELETE_ACCOUNT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        DELETE_ACCOUNT_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        yield put(driverDeleteAccountSuccess());
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

//old
//************************************************************************************************** */
function* userLoginReset() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_LOGIN_RESET.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_LOGIN_RESET_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* verifyLoginCode() {
  while (true) {
    const {payload, responseCallback} = yield take(VERIFY_LOGIN_CODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VERIFY_LOGIN_CODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.mp_distinct_id) {
        if (responseCallback) responseCallback(true, null);
        yield Util.setGenericPassword(payload.phone, payload.password);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* getUserProfile() {
  while (true) {
    const {responseCallback} = yield take(GET_USER_PROFILE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_USER_PROFILE_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.wheelBase) {
        if (responseCallback) responseCallback(response, null);
        // yield put(getUserProfileSuccess(response));
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* uploadUserImage() {
  while (true) {
    const {payload, responseCallback} = yield take(UPLOAD_USER_IMAGE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        UPLOAD_USER_IMAGE_URL,
        payload,
        '',
        {
          Accept: 'multipart/form-data',
        },
        ApiSauce,
      );
      if (response.url) {
        if (responseCallback) responseCallback(response.url, null);
        // yield put(uploadUserImageSuccess(response.url));
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* userLogout() {
  while (true) {
    const {responseCallback} = yield take(USER_LOGOUT.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_LOGOUT_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
        // yield put(userLogoutSuccess());
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* checkForbidden() {
  while (true) {
    const {responseCallback} = yield take(CHECK_FORBIDDEN.REQUEST);
    try {
      const response = yield call(
        callRequest,
        CHECK_FORBIDDEN_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* validatePostcode() {
  while (true) {
    const {payload, responseCallback} = yield take(VALIDATE_POSTCODE.REQUEST);
    try {
      const response = yield call(
        callRequest,
        VALIDATE_POSTCODE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response) {
        if (responseCallback) responseCallback(response, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* userSignup() {
  while (true) {
    const {payload, responseCallback} = yield take(USER_SIGNUP.REQUEST);
    try {
      const response = yield call(
        callRequest,
        USER_SIGNUP_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

function* changeDriverAvailability() {
  while (true) {
    const {payload, responseCallback} = yield take(
      CHANGE_DRIVER_AVAILABILITY.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        CHANGE_DRIVER_AVAILABILITY_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.success) {
        yield put();
        // changeDriverAvailabilitySuccess({available: payload.available}),
        if (responseCallback) responseCallback(true, null);
      } else {
        if (responseCallback) responseCallback(null, true);
        alert(response.err || SOMETHING_WRONG);
      }
    } catch (err) {
      if (responseCallback) responseCallback(null, err);
      alert(err.message);
    }
  }
}

export default function* root() {
  yield fork(requestCode);
  yield fork(verifyCode);
  yield fork(createDriverProfile);
  yield fork(setAdditionalVehicleData);
  yield takeLatest(GET_LOCATIONS.REQUEST, getLocations);
  yield fork(getVehicleDetailDataRequest);
  yield fork(profileDataRequest);
  yield fork(driverLogoutRequest);
  //old
  yield fork(userLoginReset);
  yield fork(verifyLoginCode);
  yield fork(userLogin);
  yield fork(getUserProfile);
  yield fork(uploadUserImage);
  yield fork(userLogout);
  yield fork(checkForbidden);
  yield fork(validatePostcode);
  yield fork(userSignup);
  yield fork(changeDriverAvailability);
  yield fork(deleteAccountRequest);
}

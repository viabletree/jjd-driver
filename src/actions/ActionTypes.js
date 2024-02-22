// @flow
const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const CANCEL = 'CANCEL';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE, CANCEL].forEach(type => {
    res[type] = `${base}_${type}`;
  });
  return res;
}

export const NETWORK_INFO = 'NETWORK_INFO';
export const SET_FIRST_TIME = 'SET_FIRST_TIME';

export const USER_SIGNUP = createRequestTypes('USER_SIGNUP');
export const REQUEST_CODE = createRequestTypes('REQUEST_CODE');
export const VERIFY_CODE = createRequestTypes('VERIFY_CODE');
export const USER_LOGIN = createRequestTypes('USER_LOGIN');
export const GET_LOCATIONS = createRequestTypes('GET_LOCATIONS');
export const UPLOAD_IMAGE = createRequestTypes('UPLOAD_IMAGE');
export const CREATE_DRIVER_PROFILE = createRequestTypes(
  'CREATE_DRIVER_PROFILE',
);
export const GET_VEHICLES = createRequestTypes('GET_VEHICLES');
export const SET_ADDITIONAL_VEHICLE_DATA = createRequestTypes(
  'SET_ADDITIONAL_VEHICLE_DATA',
);
export const REMOVE_PASSWORD = 'REMOVE_PASSWORD';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const GET_JOBS = createRequestTypes('GET_JOBS');
export const EMPTY_AVAILABLE_JOBS = 'EMPTY_AVAILABLE_JOBS';
export const ACCEPT_JOB = createRequestTypes('ACCEPT_JOB');
export const GET_ACCEPTED_UPCOMING_JOBS = createRequestTypes(
  'GET_ACCEPTED_UPCOMING_JOBS',
);
export const MARK_AVAILABILITY = createRequestTypes('MARK_AVAILABILITY');
export const GET_AVAILABILITY = createRequestTypes('GET_AVAILABILITY');
export const LEFT_FOR_JOB = createRequestTypes('LEFT_FOR_JOB');
export const ARRIVED_DESTINATION = createRequestTypes('ARRIVED_DESTINATION');
export const STOP_COMPLETE = createRequestTypes('STOP_COMPLETE');
export const UPDATE_LOCATION = 'UPDATE_LOCATION';
export const UPDATE_JON_IN_PROGRESS = 'UPDATE_JON_IN_PROGRESS';

export const USER_SIGNIN = createRequestTypes('USER_SIGNIN');
export const USER_SIGNOUT = createRequestTypes('USER_SIGNOUT');
export const UPDATE_USER_PROFILE = createRequestTypes('UPDATE_USER_PROFILE');
export const USER_FORGOT_PASSWORD = createRequestTypes('USER_FORGOT_PASSWORD');
export const USER_CONFIRM_OTP_FGPASS = createRequestTypes(
  'USER_CONFIRM_OTP_FGPASS',
);
export const USER_UPDATE_PASSWORD = createRequestTypes('USER_UPDATE_PASSWORD');
export const CONTACT_ADMIN = createRequestTypes('CONTACT_ADMIN');
export const GET_SERVICE_TYPES = createRequestTypes('GET_SERVICE_TYPES');
export const GET_NEARBY_SERVICE_PROVIDERS = createRequestTypes(
  'GET_NEARBY_SERVICE_PROVIDERS',
);
export const CLEAR_SERVICE_PROVIDERS_DATA = 'CLEAR_SERVICE_PROVIDERS_DATA';
export const GET_NEWS = createRequestTypes('GET_NEWS');
export const GET_EVENTS = createRequestTypes('GET_EVENTS');
export const GET_MONTLY_EVENTS = createRequestTypes('GET_MONTLY_EVENTS');
export const GET_SEARCH_EVENTS = createRequestTypes('GET_SEARCH_EVENTS');
export const GET_ORGANIZATIONS = createRequestTypes('GET_ORGANIZATIONS');
export const GET_REVIEWS = createRequestTypes('GET_REVIEWS');
export const GET_PROFILE_SECTIONS = createRequestTypes('GET_PROFILE_SECTIONS');
export const POST_PROFILE_DATA = createRequestTypes('POST_PROFILE_DATA');
export const DELETE_PROFILE_SUBSECTION_DATA = createRequestTypes(
  'DELETE_PROFILE_SUBSECTION_DATA',
);

export const GET_BRAIN_TREE_TOKEN = createRequestTypes('GET_BRAIN_TREE_TOKEN');
export const BRAIN_TREE_PAYMENT = createRequestTypes('BRAIN_TREE_PAYMENT');
export const LOGOUT = 'LOGOUT';

export const EMPTY = createRequestTypes('EMPTY');
export const GET_CSRF_TOKEN = createRequestTypes('GET_CSRF_TOKEN');
export const UPDATE_DEVICE_ID = createRequestTypes('UPDATE_DEVICE_ID');
export const USER_LOGIN_RESET = createRequestTypes('USER_LOGIN_RESET');
export const VERIFY_LOGIN_CODE = createRequestTypes('VERIFY_LOGIN_CODE');

export const GET_USER_PROFILE = createRequestTypes('GET_USER_PROFILE');
export const UPLOAD_USER_IMAGE = createRequestTypes('UPLOAD_USER_IMAGE');
export const USER_LOGOUT = createRequestTypes('USER_LOGOUT');
export const CHECK_FORBIDDEN = createRequestTypes('CHECK_FORBIDDEN');
export const VALIDATE_POSTCODE = createRequestTypes('VALIDATE_POSTCODE');
export const CHANGE_DRIVER_AVAILABILITY = createRequestTypes(
  'CHANGE_DRIVER_AVAILABILITY',
);
export const GET_VEHICLE_DETAIL_DATA_REQUEST = createRequestTypes(
  'GET_VEHICLE_DETAIL_DATA_REQUEST',
);
export const DECLINE_JOB = createRequestTypes('DECLINE_JOB');
export const DECLINE_JOB_CANCEL_CONFIRM = createRequestTypes(
  'DECLINE_JOB_CANCEL_CONFIRM',
);
export const PROFILE_DATA = createRequestTypes('PROFILE_DATA');
export const DRIVER_LOGOUT = createRequestTypes('DRIVER_LOGOUT');
export const DELETE_ACCOUNT = createRequestTypes('DELETE_ACCOUNT');
export const JOB_DETAIL = createRequestTypes('JOB_DETAIL');
export const GET_SINGLE_JOB = createRequestTypes('GET_SINGLE_JOB');
export const COMPLETE_JOBS = createRequestTypes('COMPLETE_JOBS');
export const GET_COMPLETE_JOBS_DETAIL = createRequestTypes(
  'GET_COMPLETE_JOBS_DETAIL',
);
export const AVAILABILITY_LAST_VISIT = 'AVAILABILITY_LAST_VISIT';
export const SET_TRACKING_MODE = createRequestTypes('SET_TRACKING_MODE');
export const GET_TRACKING_TOKEN = createRequestTypes('GET_TRACKING_TOKEN');
export const END_JOB = createRequestTypes('END_JOB');
export const START_JOB = createRequestTypes('START_JOB');

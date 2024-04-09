import _ from 'lodash';
import Util from '../util';

// export let BASE_URL = 'https://jjd-api-v2.herokuapp.com/'; //staging
export let BASE_URL = 'https://api.jjdvans.com/'; //live
// export const BASE_URL = 'https://kiffgo-staging.herokuapp.com/';
//export let BASE_URL = 'https://api.kiffgo.com/';
// export const BASE_URL = 'http://192.168.1.18/'; // tasneem's machine ip
// export function changeBase(val) {
//   if (val) {
//     BASE_URL = 'https://kiffgo-development.herokuapp.com/';
//     TRACKING_BASE_URL = 'https://kiffgo-realtime-dev.herokuapp.com/';
//   } else {
//     BASE_URL = 'https://kiffgo-staging.herokuapp.com/';
//     TRACKING_BASE_URL = 'https://kiffgo-realtime-staging.herokuapp.com/';
//   }
// }
// export let TRACKING_BASE_URL = 'https://kiffgo-realtime-dev.herokuapp.com/'; //dev
// export const TRACKING_BASE_URL = 'https://kiffgo-realtime-staging.herokuapp.com/'; //staging
// export const TRACKING_BASE_URL = 'https://kiffgo-realtime-prod.herokuapp.com/'; //live
export const TRACKING_BASE_URL = 'https://jjd-realtime-v2.herokuapp.com/';

export const TRACKING_AUTH = '9d9c326f-5049-d23e-bece-f59416e65290';
export const WAZE_BASE_URL = 'https://waze.com/ul?';
export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/';
export const API_TIMEOUT = 30000;

// API USER ROUTES
export const API_LOG = true;

export const ERROR_SOMETHING_WENT_WRONG =
  'Something went wrong, Please try again later';

export const ERROR_NETWORK_NOT_AVAILABLE = {
  message: 'Please connect to the working Internet',
  error: 'Please connect to the working Internet',
};

export const ERROR_TIMEOUT = {
  message: 'Request timeout, please check you internet!',
  error: 'Request timeout, please check you internet!',
};

export const REQUEST_TYPE = {
  GET: 'get',
  POST: 'post',
  DELETE: 'delete',
  PUT: 'put',
};

// API USER ROUTES

export const GET_CSRF_TOKEN = {
  route: 'csrfToken',
  type: REQUEST_TYPE.GET,
};

export const REQUEST_CODE = {
  route: 'd/r/login/request-code',
  type: REQUEST_TYPE.POST,
};
export const VERIFY_CODE = {
  route: 'd/r/login/verify-code',
  type: REQUEST_TYPE.POST,
};
export const USER_LOGIN = {
  route: 'd/r/login/phone',
  type: REQUEST_TYPE.POST,
};
export const GET_LOCATIONS = {
  route: '/w/google/v1/address-autocomplete',
  type: REQUEST_TYPE.POST,
};
export const UPLOAD_IMAGE = {
  route: 'kiffgo/image/upload',
  type: REQUEST_TYPE.POST,
};
export const CREATE_DRIVER_PROFILE = {
  route: '/onboarding/create-driver-profile-v2',
  type: REQUEST_TYPE.POST,
};
export const GET_VEHICLES = {
  route: '/b/get-single-vehicles',
  type: REQUEST_TYPE.POST,
};
export const SET_ADDITIONAL_VEHICLE_DATA = {
  route: '/onboarding/create-driver-profile/step3',
  type: REQUEST_TYPE.POST,
};

// export const GET_JOBS = {
//   route: '/d/jobs',
//   type: REQUEST_TYPE.POST,
// };

export const GET_JOBS = {
  route: '/d/available/jobs',
  type: REQUEST_TYPE.POST,
};
export const GET_SINGLE_JOB = {
  route: '/d/driver/single-job',
  type: REQUEST_TYPE.POST,
};
export const JOB_DETAIL = {
  route: '/d/jobs',
  type: REQUEST_TYPE.POST,
};
export const ACCEPT_JOB = {
  route: '/d/job/accept',
  type: REQUEST_TYPE.POST,
};
export const GET_ACCEPTED_UPCOMING_JOBS = {
  route: '/d/jobs/accepted/upcoming',
  type: REQUEST_TYPE.POST,
};
export const MARK_AVAILABILITY = {
  route: '/d/r/availability',
  type: REQUEST_TYPE.POST,
};
export const GET_AVAILABILITY = {
  route: '/d/r/availability/driver',
  type: REQUEST_TYPE.POST,
};
export const DECLINE_JOB = {
  route: '/d/jobs/decline/warn',
  type: REQUEST_TYPE.POST,
};
export const DECLINE_JOB_CONFIRM = {
  route: '/d/jobs/decline/',
  type: REQUEST_TYPE.POST,
};
export const LET_FOR_JOB = {
  route: '/d/left-for-job/',
  type: REQUEST_TYPE.POST,
};
export const ARRIVED_DESTINATION = {
  route: '/d/arrived-destination/',
  type: REQUEST_TYPE.POST,
};
export const STOP_COMPLETE = {
  route: '/d/stop-complete/',
  type: REQUEST_TYPE.POST,
};
export const COMPLETE_JOBS = {
  route: '/d/driver/completed',
  type: REQUEST_TYPE.POST,
};

export const UPDATE_DEVICE_ID = {
  route: '/d/device-id',
  type: REQUEST_TYPE.POST,
};
export const GET_TRACKING_TOKEN = {
  route: '/d/request-token',
  type: REQUEST_TYPE.POST,
};
// old

export const USER_LOGIN_RESET = {
  route: 'd/login/reset',
  type: REQUEST_TYPE.POST,
};

export const VERIFY_LOGIN_CODE = {
  route: 'd/login/reset-code',
  type: REQUEST_TYPE.POST,
};

// export const USER_LOGIN = {
//   route: 'd/login/phone',
//   type: REQUEST_TYPE.POST,
// };

export const GET_AVAILABLE_JOBS = {
  route: '/d/available/jobs',
  type: REQUEST_TYPE.POST,
};

export const GET_JOB_DETAIL = {
  route: '/d/available-jobs/single-details',
  type: REQUEST_TYPE.POST,
};

export const GET_MY_JOBS = {
  route: '/d/delivery/driver2',
  type: REQUEST_TYPE.POST,
};

export const CANCEL_JOB = {
  route: '/d/cancel',
  type: REQUEST_TYPE.POST,
};

export const START_JOB = {
  route: '/d/start-job',
  type: REQUEST_TYPE.POST,
};

export const GET_USER_PROFILE = {
  route: '/d/profile/driver',
  type: REQUEST_TYPE.POST,
};

export const UPLOAD_USER_IMAGE = {
  route: '/image3',
  type: REQUEST_TYPE.POST,
};

export const USER_LOGOUT = {
  route: '/d/logout',
  type: REQUEST_TYPE.POST,
};

export const END_JOB = {
  route: '/d/end-job',
  type: REQUEST_TYPE.POST,
};

export const CHECK_FORBIDDEN = {
  route: '/token-test',
  type: REQUEST_TYPE.POST,
};

export const INFORM_JOB_STARTING_SOON = {
  route: '/d/job-starting-soon',
  type: REQUEST_TYPE.POST,
};

export const TRACK_DRIVER = {
  route: 'd/tracking',
  type: REQUEST_TYPE.POST,
};

export const VALIDATE_POSTCODE = {
  route: '/d/postcode/validate',
  type: REQUEST_TYPE.POST,
};

export const USER_SIGNUP = {
  route: '/d/driver/apply',
  type: REQUEST_TYPE.POST,
};

export const CHANGE_DRIVER_AVAILABILITY = {
  route: '/d/set-available',
  type: REQUEST_TYPE.POST,
};

export const PROFILE_DATA = {
  route: '/d/r/profile',
  type: REQUEST_TYPE.POST,
};

export const GET_VEHICLE_DETAIL_DATA = {
  route: '/onboarding/create-driver-profile/step2',
  type: REQUEST_TYPE.POST,
};
export const DRIVER_LOGOUT = {
  route: '/d/logout',
  type: REQUEST_TYPE.POST,
};
export const DELETE_ACCOUNT = {
  route: '/d/driver/request-delete',
  type: REQUEST_TYPE.POST,
};
export const GET_COMPLETE_JOBS_DETAIL = {
  route: '/d/driver/completed',
  type: REQUEST_TYPE.POST,
};
export const AVAILABLE_TOGGLE_API = {
  route: '/d/driver/toggle-notification',
  type: REQUEST_TYPE.POST,
};

export const callRequest = function (
  url,
  data,
  parameter,
  header = {},
  ApiSauce,
  baseUrl = BASE_URL,
) {
  // note, import of "ApiSause" has some problem, thats why I am passing it through parameters

  /* let _header = header;
  if (url.access_token_required) {
    const _access_token = Util.getCurrentUserAccessToken();
    if (_access_token) {
      _header = {
        ..._header,
        ...{
          Authorization: `Bearer ${_access_token}`
        }
      };
    }
  } */

  const _url =
    parameter && !_.isEmpty(parameter)
      ? `${url.route}/${parameter}`
      : url.route;
  if (url.type === REQUEST_TYPE.POST) {
    // ;
    if (baseUrl === BASE_URL) {
      data._csrf = Util.getCurrentCsrfToken();
    }
    // data._csrf = Util.getCurrentCsrfToken();
    return ApiSauce.post(_url, data, header, baseUrl);
  } else if (url.type === REQUEST_TYPE.GET) {
    return ApiSauce.get(_url, data, header, baseUrl);
  } else if (url.type === REQUEST_TYPE.PUT) {
    data._csrf = Util.getCurrentCsrfToken();
    return ApiSauce.put(_url, data, header, baseUrl);
  } else if (url.type === REQUEST_TYPE.DELETE) {
    return ApiSauce.delete(_url, data, header, baseUrl);
  }
  // return ApiSauce.post(url.route, data, _header);
};

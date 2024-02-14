// @flow

import {
  REQUEST_CODE,
  VERIFY_CODE,
  USER_LOGIN,
  GET_LOCATIONS,
  CREATE_DRIVER_PROFILE,
  SET_ADDITIONAL_VEHICLE_DATA,
  REMOVE_PASSWORD,
  PROFILE_DATA,
  GET_VEHICLE_DETAIL_DATA_REQUEST,
  DRIVER_LOGOUT,
} from './ActionTypes';

//Requesting otp from server
export function requestCode(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: REQUEST_CODE.REQUEST,
  };
}
//Verify otp request to server
export function verifyCodeRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: VERIFY_CODE.REQUEST,
  };
}
//success action when otp is verified by yhe server
export function verifyCodeSuccess(data) {
  return {
    data,
    type: VERIFY_CODE.SUCCESS,
  };
}
//removing password from user reducer after successful onboarding and password saved to keychain
export function removePassword() {
  return {
    type: REMOVE_PASSWORD,
  };
}

export function userLoginRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: USER_LOGIN.REQUEST,
  };
}
export function userLoginSuccess(data) {
  console.log(data, 'user login data');
  return {
    data,
    type: USER_LOGIN.SUCCESS,
  };
}

export function userLoginFailure() {
  return {
    type: USER_LOGIN.FAILURE,
  };
}
export function getLocations(payload, responseCallback) {
  return {payload, responseCallback, type: GET_LOCATIONS.REQUEST};
}
export function createDriverProfileRequest(payload, responseCallback) {
  return {payload, responseCallback, type: CREATE_DRIVER_PROFILE.REQUEST};
}
export function createDriverProfileSuccess(data) {
  return {data, type: CREATE_DRIVER_PROFILE.SUCCESS};
}
export function setAdditionalVehicleDataRequest(payload, responseCallback) {
  return {payload, responseCallback, type: SET_ADDITIONAL_VEHICLE_DATA.REQUEST};
}
export function setAdditionalVehicleDataSuccess(data) {
  return {data, type: SET_ADDITIONAL_VEHICLE_DATA.SUCCESS};
}
export function profileDataRequest(responseCallback) {
  return {responseCallback, type: PROFILE_DATA.REQUEST};
}
export function profileDataSuccess(data) {
  return {data, type: PROFILE_DATA.SUCCESS};
}

export function getVehicleDetailDataRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_VEHICLE_DETAIL_DATA_REQUEST.REQUEST,
  };
}
export function getVehicleDetailDataSuccess(data) {
  return {
    data,
    type: GET_VEHICLE_DETAIL_DATA_REQUEST.SUCCESS,
  };
}
export function driverLogoutRequest(responseCallback) {
  return {responseCallback, type: DRIVER_LOGOUT.REQUEST};
}
export function driverLogoutSuccess(data) {
  return {data, type: DRIVER_LOGOUT.SUCCESS};
}

// export function userSignupRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: USER_SIGNUP.REQUEST
//   };
// }

// export function userSignupSuccess(data) {
//   return {
//     data,
//     type: USER_SIGNUP.SUCCESS
//   };
// }

// export function userSigninRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: USER_SIGNIN.REQUEST
//   };
// }

// export function userSigninSuccess(data, access_token, save_token) {
//   return {
//     data,
//     access_token,
//     save_token,
//     type: USER_SIGNIN.SUCCESS
//   };
// }

// export function userSignOutRequest(responseCallback) {
//   return {
//     responseCallback,
//     type: USER_SIGNOUT.REQUEST
//   };
// }

// export function userSignOutSuccess() {
//   return {
//     type: USER_SIGNOUT.SUCCESS
//   };
// }

// export function updateUserProfileRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: UPDATE_USER_PROFILE.REQUEST
//   };
// }

// export function updateUserProfileSuccess(data) {
//   return {
//     data,
//     type: UPDATE_USER_PROFILE.SUCCESS
//   };
// }

// export function forgotPasswordRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: USER_FORGOT_PASSWORD.REQUEST
//   };
// }

// export function confirmOTPRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: USER_CONFIRM_OTP_FGPASS.REQUEST
//   };
// }

// export function updatePasswordRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: USER_UPDATE_PASSWORD.REQUEST
//   };
// }

// export function contactAdminRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: CONTACT_ADMIN.REQUEST
//   };
// }

// export function getProfileSectionsRequest(responseCallback) {
//   return {
//     responseCallback,
//     type: GET_PROFILE_SECTIONS.REQUEST
//   };
// }

// export function getProfileSectionsSuccess(data) {
//   return {
//     data,
//     type: GET_PROFILE_SECTIONS.SUCCESS
//   };
// }

// export function postProfileDataRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: POST_PROFILE_DATA.REQUEST
//   };
// }

// export function deleteProfileSubSectionDataRequest(payload, responseCallback) {
//   return {
//     payload,
//     responseCallback,
//     type: DELETE_PROFILE_SUBSECTION_DATA.REQUEST
//   };
// }

// @flow

import {
  GET_CSRF_TOKEN,
  UPDATE_DEVICE_ID,
  UPLOAD_IMAGE,
  GET_VEHICLES,
  SET_SELECTED_TAB,
  SET_FIRST_TIME,
  LOGOUT,
  AVAILABILITY_LAST_VISIT,
  SET_TRACKING_MODE,
} from './ActionTypes';

export function getCsrfTokenRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_CSRF_TOKEN.REQUEST,
  };
}

export function getCsrfTokenSuccess(token) {
  return {
    token,
    type: GET_CSRF_TOKEN.SUCCESS,
  };
}

export function updateDeviceTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPDATE_DEVICE_ID.REQUEST,
  };
}

export function uploadImage(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: UPLOAD_IMAGE.REQUEST,
  };
}
export function getVehiclesRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_VEHICLES.REQUEST,
  };
}
export function getVehiclesSuccess(data) {
  return {
    data,
    type: GET_VEHICLES.SUCCESS,
  };
}
export function setSelectedTab(selectedTab) {
  return {
    selectedTab,
    type: SET_SELECTED_TAB,
  };
}
export function setFirstTime() {
  return {
    type: SET_FIRST_TIME,
  };
}
export function logout() {
  return {type: LOGOUT};
}
export function updateLastAvailabilityVisit(data) {
  return {data, type: AVAILABILITY_LAST_VISIT};
}
export function setTrackingMode(modeName) {
  return {
    modeName,
    type: SET_TRACKING_MODE,
  };
}

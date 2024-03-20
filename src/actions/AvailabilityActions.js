import {
  MARK_AVAILABILITY,
  GET_AVAILABILITY,
  AVAILABLE_TOGGLE_API,
} from './ActionTypes';

export function markAvailabilityRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: MARK_AVAILABILITY.REQUEST,
  };
}
export function markAvailabilitySuccess(data) {
  return {
    data,
    type: MARK_AVAILABILITY.SUCCESS,
  };
}
export function getAvailabilityRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_AVAILABILITY.REQUEST,
  };
}
export function getAvailabilitySuccess(data) {
  return {
    data,
    type: GET_AVAILABILITY.SUCCESS,
  };
}

export function postAvalabilityToggleRequest(responseCallback) {
  return {
    responseCallback,
    type: AVAILABLE_TOGGLE_API.REQUEST,
  };
}

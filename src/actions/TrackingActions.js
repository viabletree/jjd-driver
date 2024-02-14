import {GET_TRACKING_TOKEN} from './ActionTypes';

export function requestTrackingTokenRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_TRACKING_TOKEN.REQUEST,
  };
}
export function requestTrackingTokenSuccess(token) {
  return {
    token,
    type: GET_TRACKING_TOKEN.SUCCESS,
  };
}

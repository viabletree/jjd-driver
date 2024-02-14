import {
  GET_JOBS,
  EMPTY_AVAILABLE_JOBS,
  ACCEPT_JOB,
  GET_ACCEPTED_UPCOMING_JOBS,
  DECLINE_JOB,
  DECLINE_JOB_CANCEL_CONFIRM,
  LEFT_FOR_JOB,
  UPDATE_LOCATION,
  UPDATE_JON_IN_PROGRESS,
  STOP_COMPLETE,
  COMPLETE_JOBS,
  ARRIVED_DESTINATION,
  GET_COMPLETE_JOBS_DETAIL,
  JOB_DETAIL,
  GET_SINGLE_JOB,
  END_JOB,
  START_JOB,
} from './ActionTypes';

//Accept Job request
export function acceptJobRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: ACCEPT_JOB.REQUEST,
  };
}
//Accept job request success
export function acceptJobSuccess(id) {
  return {id, type: ACCEPT_JOB.SUCCESS};
}
//end Job request
export function endJobRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: END_JOB.REQUEST,
  };
}
//end job request success
export function endJobSuccess(id) {
  return {id, type: END_JOB.SUCCESS};
}
//start Job request
export function startJobRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: START_JOB.REQUEST,
  };
}
//start job request success
export function startJobSuccess(id) {
  return {id, type: START_JOB.SUCCESS};
}
export function getJobsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_JOBS.REQUEST,
  };
}
//Get new jobs Success
export function getJobsSuccess(data) {
  return {
    data,
    type: GET_JOBS.SUCCESS,
  };
}
//Empty available jobs
export function emptyJobs() {
  return {
    type: EMPTY_AVAILABLE_JOBS,
  };
}

//get ACCEPTED_UPCOMING_JOBS request
export function getAcceptedUpcomingJobsRequest(responseCallback) {
  return {
    responseCallback,
    type: GET_ACCEPTED_UPCOMING_JOBS.REQUEST,
  };
}
//Get new jobs Success
export function getAcceptedUpcomingJobsSuccess(data) {
  return {
    data,
    type: GET_ACCEPTED_UPCOMING_JOBS.SUCCESS,
  };
}

export function declineJobRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DECLINE_JOB.REQUEST,
  };
}

export function declineJobCancelConfirm(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: DECLINE_JOB_CANCEL_CONFIRM.REQUEST,
  };
}
//Left for job Request
export function leftForJobRequest(payload, responseCallback) {
  return {payload, responseCallback, type: LEFT_FOR_JOB.REQUEST};
}
//Left for job success
export function leftForJobSuccess(data) {
  return {data, type: LEFT_FOR_JOB.SUCCESS};
}
//Arrived at destination Request
export function arrivedDestinationRequest(payload, responseCallback) {
  return {payload, responseCallback, type: ARRIVED_DESTINATION.REQUEST};
}
//Arrived at destination success
export function arrivedDestinationSuccess(data) {
  return {data, type: ARRIVED_DESTINATION.SUCCESS};
}
//update job in progress current location
export function updateLocation(location) {
  return {
    location,
    type: UPDATE_LOCATION,
  };
}
//update job in progress
export function updateJobInProgress(job) {
  return {
    job,
    type: UPDATE_JON_IN_PROGRESS,
  };
}
// stop complete request
export function stopCompleteRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: STOP_COMPLETE.REQUEST,
  };
}
// stop complete success
export function stopCompleteSuccess(data) {
  return {
    data,
    type: STOP_COMPLETE.SUCCESS,
  };
}
export function jobDetailRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: JOB_DETAIL.REQUEST,
  };
}
export function jobDetailSuccess(data) {
  return {
    data,
    type: JOB_DETAIL.SUCCESS,
  };
}
export function getSingleJobRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_SINGLE_JOB.REQUEST,
  };
}
export function getSingleJobSuccess(data) {
  return {
    data,
    type: GET_SINGLE_JOB.SUCCESS,
  };
}
//complete Jobs Listing request
export function completeJobsRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: COMPLETE_JOBS.REQUEST,
  };
}

export function completeJobsSuccess(data, page) {
  return {
    data,
    page,
    type: COMPLETE_JOBS.SUCCESS,
  };
}

//complete Jobs detail request
export function getCompleteJobsDetailRequest(payload, responseCallback) {
  return {
    payload,
    responseCallback,
    type: GET_COMPLETE_JOBS_DETAIL.REQUEST,
  };
}
//complete Jobs detail success
export function getCompleteJobsDetailSuccess(data) {
  return {
    data,
    type: GET_COMPLETE_JOBS_DETAIL.SUCCESS,
  };
}

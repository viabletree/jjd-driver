import {take, put, call, fork, takeLatest} from 'redux-saga/effects';
import {
  ACCEPT_JOB,
  GET_ACCEPTED_UPCOMING_JOBS,
  DECLINE_JOB,
  DECLINE_JOB_CANCEL_CONFIRM,
  GET_JOBS,
  LEFT_FOR_JOB,
  STOP_COMPLETE,
  COMPLETE_JOBS,
  ARRIVED_DESTINATION,
  GET_COMPLETE_JOBS_DETAIL,
  GET_SINGLE_JOB,
  START_JOB,
  END_JOB,
} from '../actions/ActionTypes';
import {SAGA_ALERT_TIMEOUT, SOMETHING_WRONG} from '../constants';
import {
  acceptJobSuccess,
  getAcceptedUpcomingJobsSuccess,
  getJobsSuccess,
  leftForJobSuccess,
  stopCompleteSuccess,
  getSingleJobSuccess,
  completeJobsSuccess,
  getCompleteJobsDetailSuccess,
  startJobSuccess,
  endJobSuccess,
} from '../actions/JobsActions';

import {
  ACCEPT_JOB as ACCEPT_JOB_URL,
  GET_ACCEPTED_UPCOMING_JOBS as GET_ACCEPTED_UPCOMING_JOBS_URL,
  DECLINE_JOB as DECLINE_JOB_URL,
  DECLINE_JOB_CONFIRM as DECLINE_JOB_CONFIRM_URL,
  GET_JOBS as GET_JOBS_URL,
  LET_FOR_JOB as LET_FOR_JOB_URL,
  STOP_COMPLETE as STOP_COMPLETE_URL,
  COMPLETE_JOBS as COMPLETE_JOBS_URL,
  ARRIVED_DESTINATION as ARRIVED_DESTINATION_URL,
  GET_COMPLETE_JOBS_DETAIL as GET_COMPLETE_JOBS_DETAIL_URL,
  GET_SINGLE_JOB as GET_SINGLE_JOB_URL,
  START_JOB as START_JOB_URL,
  END_JOB as END_JOB_URL,
  callRequest,
} from '../config/WebService';
import ApiSauce from '../services/ApiSauce';
import Util from '../util';
import Helper from '../Helper';
import {
  getManipulatedAvailableJobsData,
  getManipulatedCompleteJob,
  getManipulatedCompleteJobDetail,
} from '../Helper/jobsHelper';

function alert(message, action = false) {
  setTimeout(() => {
    Util.topAlert(message, action);
  }, SAGA_ALERT_TIMEOUT);
}
function* getJobs() {
  while (true) {
    const {payload, responseCallback} = yield take(GET_JOBS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_JOBS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getJobsSuccess({
            jobs: getManipulatedAvailableJobsData(response.data),
          }),
        );
        if (responseCallback) responseCallback(true, response.data);
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
function* acceptJob() {
  while (true) {
    const {payload, responseCallback} = yield take(ACCEPT_JOB.REQUEST);
    try {
      const response = yield call(
        callRequest,
        ACCEPT_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, response.data);
        yield put(acceptJobSuccess(payload.delivery_id));
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
function* getAcceptedUpcomingJobs() {
  while (true) {
    const {responseCallback} = yield take(GET_ACCEPTED_UPCOMING_JOBS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        GET_ACCEPTED_UPCOMING_JOBS_URL,
        {},
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        console.log(response.data);
        if (responseCallback) responseCallback(true);
        yield put(getAcceptedUpcomingJobsSuccess(response.data));
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

function* declineJobRequest() {
  while (true) {
    const {responseCallback, payload} = yield take(DECLINE_JOB.REQUEST);

    try {
      const response = yield call(
        callRequest,
        DECLINE_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true, response.message);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);

        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}

function* declineJobCancelConfirm() {
  while (true) {
    const {responseCallback, payload} = yield take(
      DECLINE_JOB_CANCEL_CONFIRM.REQUEST,
    );

    try {
      const response = yield call(
        callRequest,
        DECLINE_JOB_CONFIRM_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        console.log({hellos: response});
        if (responseCallback) responseCallback(true, response.message);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);

        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
function* leftForJob() {
  while (true) {
    const {responseCallback, payload} = yield take(LEFT_FOR_JOB.REQUEST);

    try {
      const response = yield call(
        callRequest,
        LET_FOR_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
        yield put(leftForJobSuccess(payload));
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);

        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
function* arrivedDestination() {
  while (true) {
    const {responseCallback, payload} = yield take(ARRIVED_DESTINATION.REQUEST);

    try {
      const response = yield call(
        callRequest,
        ARRIVED_DESTINATION_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG, true);

        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
}
function* stopComplete() {
  while (true) {
    const {responseCallback, payload} = yield take(STOP_COMPLETE.REQUEST);

    try {
      const response = yield call(
        callRequest,
        STOP_COMPLETE_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status > 200 || response.status) {
        yield put(stopCompleteSuccess(payload));
        setTimeout(() => {
          if (responseCallback) responseCallback(true);
        }, 1000);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);

        if (response.err) {
          // yield put(userLoginFailure());
        }
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
      alert(err.message || SOMETHING_WRONG);
    }
  }
}
function* getSingleJob() {
  while (true) {
    const {responseCallback, payload} = yield take(GET_SINGLE_JOB.REQUEST);

    try {
      const response = yield call(
        callRequest,
        GET_SINGLE_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status >= 200 || response.status) {
        yield put(getSingleJobSuccess(response.data[0]));
        if (responseCallback) responseCallback(true);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
      alert(err.message || SOMETHING_WRONG);
    }
  }
}
function* startJob() {
  while (true) {
    const {responseCallback, payload} = yield take(START_JOB.REQUEST);

    try {
      const response = yield call(
        callRequest,
        START_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status >= 200 || response.status || response.success) {
        yield put(startJobSuccess(payload.deliveryId));
        if (responseCallback) responseCallback(response.data, true);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
      alert(err.message || SOMETHING_WRONG);
    }
  }
}
function* endJob() {
  while (true) {
    const {responseCallback, payload} = yield take(END_JOB.REQUEST);

    try {
      const response = yield call(
        callRequest,
        END_JOB_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status >= 200 || response.status || response.success) {
        yield put(endJobSuccess(response.data));
        if (responseCallback) responseCallback(response.data, true);
      } else {
        if (responseCallback) responseCallback(false);
        alert(response.message || SOMETHING_WRONG);
      }
    } catch (err) {
      console.log(err);
      if (responseCallback) responseCallback(false);
      alert(err.message || SOMETHING_WRONG);
    }
  }
}
function* completeJobs() {
  while (true) {
    const {responseCallback, payload} = yield take(COMPLETE_JOBS.REQUEST);
    try {
      const response = yield call(
        callRequest,
        COMPLETE_JOBS_URL,
        payload,
        '',
        {},
        ApiSauce,
      );
      if (response.status) {
        //  yield put(completeJobsSuccess(response.data));
        yield put(
          completeJobsSuccess(
            // getManipulatedCompleteJob(response.data),
            response.data,
            payload.page,
          ),
        );
        if (responseCallback) responseCallback(true);
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

function* getCompleteJobsDetail() {
  while (true) {
    const {responseCallback, payload} = yield take(
      GET_COMPLETE_JOBS_DETAIL.REQUEST,
    );
    try {
      const response = yield call(
        callRequest,
        GET_COMPLETE_JOBS_DETAIL_URL,
        payload,
        '',
        {},
        ApiSauce,
      );

      if (response.status) {
        yield put(
          getCompleteJobsDetailSuccess(
            getManipulatedCompleteJobDetail(response.data),
          ),
        );

        // yield put(
        //   completeJobsSuccess(
        //     getManipulatedCompleteJob(response.data),
        //     payload.page,
        //   ),
        // );

        console.log({ahsan: 'i am success'});
        if (responseCallback) responseCallback(true);
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

export default function* root() {
  yield fork(getJobs);
  yield fork(acceptJob);
  yield fork(getAcceptedUpcomingJobs);
  yield fork(declineJobRequest);
  yield fork(declineJobCancelConfirm);
  yield fork(leftForJob);
  yield fork(arrivedDestination);
  yield fork(stopComplete);
  yield fork(getSingleJob);
  yield fork(completeJobs);
  yield fork(getCompleteJobsDetail);
  yield fork(startJob);
  yield fork(endJob);
}

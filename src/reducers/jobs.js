// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  GET_JOBS,
  EMPTY_AVAILABLE_JOBS,
  GET_ACCEPTED_UPCOMING_JOBS,
  ACCEPT_JOB,
  DRIVER_LOGOUT,
  LEFT_FOR_JOB,
  UPDATE_LOCATION,
  UPDATE_JON_IN_PROGRESS,
  STOP_COMPLETE,
  GET_SINGLE_JOB,
  COMPLETE_JOBS,
  GET_COMPLETE_JOBS_DETAIL,
  START_JOB,
  END_JOB,
} from '../actions/ActionTypes';
import {reducer} from 'redux-storage';
import moment from 'moment';

const initialState = Immutable({
  availableJobs: [],
  availableJobsUpcoming: [],
  job: {},
  onJob: false,
  jobInProgress: {},
  completeJobsListing: [],
  completedJobDetail: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_JOBS.SUCCESS: {
      const {jobs} = action.data;

      return Immutable.merge(state, {
        availableJobs: jobs,
      });
    }

    case EMPTY_AVAILABLE_JOBS: {
      return Immutable.merge(state, {
        availableJobsUpcoming: [],
      });
    }
    case ACCEPT_JOB.SUCCESS: {
      let tempJobs = _.cloneDeep(state.availableJobs);
      let index = _.findIndex(tempJobs, ['delivery', action.id]);
      console.log({tempJobBefore: tempJobs});
      tempJobs.splice(index, 1);
      console.log({tempJobAfter: tempJobs});
      return Immutable.merge(state, {
        availableJobs: tempJobs,
      });
    }
    case START_JOB.SUCCESS: {
      let tempJobs = _.cloneDeep(state.availableJobsUpcoming);
      let index = _.findIndex(tempJobs, ['delivery', action.id]);
      let jobInProgress = tempJobs[index];
      if (jobInProgress) jobInProgress.start_time = moment();
      return Immutable.merge(state, {
        jobInProgress,
        onJob: true,
      });
    }
    case END_JOB.SUCCESS: {
      return Immutable.merge(state, {
        jobInProgress: {},
        onJob: false,
      });
    }
    case GET_ACCEPTED_UPCOMING_JOBS.SUCCESS: {
      let jobInProgress = {};
      let onJob = false;
      action.data.forEach(element => {
        if (element.on_job && element.start_time) {
          jobInProgress = element;
          onJob = true;
        }
      });
      return Immutable.merge(state, {
        availableJobsUpcoming: action.data,
        jobInProgress,
        onJob,
      });
    }
    // when user logout then empty data
    case DRIVER_LOGOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    case LEFT_FOR_JOB.SUCCESS: {
      const jobDeliveryId = action.data.delivery_id;
      const jobIndex = _.findIndex(state.availableJobsUpcoming, item => {
        return item.delivery === jobDeliveryId;
      });
      const jobInProgress = _.cloneDeep(state.availableJobsUpcoming[jobIndex]);
      jobInProgress.currentStop = 0;
      jobInProgress.completed = false;

      jobInProgress.location.forEach((element, i) => {
        if (i === jobInProgress.currentStop) {
          element.showListingDetail = true;
        } else {
          element.showListingDetail = false;
        }
        element.showFind = false;
        element.targetTime =
          '1' + i + ':5' + i * 2 + ' - ' + i * 2 + '1:' + i + '3';
        element.foundLocation = false;
        element.instructionsRead = false;
        element.timeSpent = -1;
        element.initialFail = false;
        element.failed = false;
        element.deliveryForm = -1;
        element.deliveredTo = '';
        element.localImages = [];
      });

      return Immutable.merge(state, {onJob: true, jobInProgress});
    }
    case UPDATE_LOCATION: {
      let tempJobInProgress = _.cloneDeep(state.jobInProgress);
      tempJobInProgress.location[tempJobInProgress.currentStop] =
        action.location;
      return Immutable.merge(state, {jobInProgress: tempJobInProgress});
    }
    case UPDATE_JON_IN_PROGRESS: {
      let onJob = true;
      if (_.isEmpty(action.job)) {
        onJob = false;
      }
      return Immutable.merge(state, {jobInProgress: action.job, onJob});
    }
    case STOP_COMPLETE.SUCCESS: {
      let tempCurrentJobInProgress = _.cloneDeep(state.jobInProgress);
      let onJob = true;
      tempCurrentJobInProgress.location[
        tempCurrentJobInProgress.currentStop
      ].showListingDetail = false;
      const nextStop = tempCurrentJobInProgress.currentStop + 1;
      if (nextStop < tempCurrentJobInProgress.location.length) {
        tempCurrentJobInProgress.currentStop = nextStop;
        tempCurrentJobInProgress.location[nextStop].showListingDetail = true;
      } else {
        tempCurrentJobInProgress.currentStop = nextStop;
        tempCurrentJobInProgress.completed = true;
      }
      return Immutable.merge(state, {
        jobInProgress: tempCurrentJobInProgress,
      });
    }
    case GET_SINGLE_JOB.SUCCESS: {
      let newJob = {};
      if (action.data) {
        newJob = action.data;
      }

      return Immutable.merge(state, {
        job: newJob,
      });
    }
    case COMPLETE_JOBS.SUCCESS: {
      if (action.page === 1) {
        return Immutable.merge(state, {
          completeJobsListing: action.data,
        });
      } else {
        return Immutable.merge(state, {
          completeJobsListing: [...state.completeJobsListing, ...action.data],
        });
      }
    }
    case GET_COMPLETE_JOBS_DETAIL.SUCCESS: {
      console.log({datass: action});
      return Immutable.merge(state, {
        completedJobDetail: action.data,
      });
    }
    default:
      return state;
  }
};

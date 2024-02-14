// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  MARK_AVAILABILITY,
  GET_AVAILABILITY,
  DRIVER_LOGOUT,
} from '../actions/ActionTypes';
import {reducer} from 'redux-storage';

const initialState = Immutable({
  availability: [],
});
export default (state = initialState, action) => {
  switch (action.type) {
    case MARK_AVAILABILITY.SUCCESS: {
      let tempAvailability = _.cloneDeep(state.availability);

      return Immutable.merge(state, {
        availability: tempAvailability,
      });
    }
    case GET_AVAILABILITY.SUCCESS: {
      return Immutable.merge(state, {
        availability: action.data,
      });
    }
    // when user logout then empty data
    case DRIVER_LOGOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }
    default:
      return state;
  }
};

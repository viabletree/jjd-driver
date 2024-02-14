import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {GET_TRACKING_TOKEN} from '../actions/ActionTypes';

const initialState = Immutable({
  trackingToken: '',
});

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TRACKING_TOKEN.SUCCESS: {
      return Immutable.merge(state, {
        trackingToken: action.token,
      });
    }
    default:
      return state;
  }
};

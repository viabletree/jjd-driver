// @flow
import Immutable from 'seamless-immutable';
import _ from 'lodash';
import {
  CREATE_DRIVER_PROFILE,
  //old
  USER_LOGIN,
  USER_SIGNUP,
  USER_SIGNOUT,
  UPDATE_USER_PROFILE,
  GET_PROFILE_SECTIONS,
  SET_ADDITIONAL_VEHICLE_DATA,
  VERIFY_CODE,
  REMOVE_PASSWORD,
  PROFILE_DATA,
  GET_VEHICLE_DETAIL_DATA_REQUEST,
  DRIVER_LOGOUT,
} from '../actions/ActionTypes';

const initialState = Immutable({
  data: {},
  vehicleData: {},
  profileSections: [],
  passData: {},
  profileData: {},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_DRIVER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    //get selected vehicle detail
    case GET_VEHICLE_DETAIL_DATA_REQUEST.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    //success  when otp is verified by the server
    case VERIFY_CODE.SUCCESS: {
      return Immutable.merge(state, {
        passData: {phone: action.data.phone, pass: action.data.pass},
      });
    }
    //removing saved password once saved to the keychain
    case REMOVE_PASSWORD: {
      return Immutable.merge(state, {
        passData: {},
      });
    }
    case USER_LOGIN.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data.userData,
        vehicleData: action.data.vehicleData,
      });
    }
    case USER_SIGNUP.SUCCESS: {
      return Immutable.merge(state, {
        data: action.data,
      });
    }
    case UPDATE_USER_PROFILE.SUCCESS: {
      return Immutable.merge(state, {
        data: {...state.data, ...action.data},
      });
    }
    case USER_SIGNOUT.SUCCESS: {
      return Immutable.merge(state, initialState);
    }

    case GET_PROFILE_SECTIONS.SUCCESS: {
      return Immutable.merge(state, {
        profileSections: action.data,
      });
    }
    case PROFILE_DATA.SUCCESS: {
      return Immutable.merge(state, {
        profileData: action.data,
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

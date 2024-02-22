import _ from 'lodash';
import {Platform} from 'react-native';
// import firebase from 'react-native-firebase';
import {Actions} from 'react-native-router-flux';
import {updateDeviceTokenRequest} from '../actions/GeneralActions';
import DataHandler from '../services/DataHandler';
import Util from '../util';
import {
  KIFFGO_NOTIFICATION_CHANNEL,
  NOTIFICATION_PERMISSION_DENIED_ERROR,
  NOTIFICATION_TYPES,
} from '../constants';
import messaging from '@react-native-firebase/messaging';
import util from '../util';

const updateDeviceToken = async token => {
  let fcmToken = '';

  fcmToken = await messaging().getToken();
  console.log({fcmToken});
  if (fcmToken) {
    console.log({fcmToken});
    DataHandler.getStore().dispatch(
      updateDeviceTokenRequest({
        deviceId: fcmToken,
        devicePlatform: Platform.OS,
      }),
    );
  }

  return fcmToken;
};

const navigateOnNotificationTap = (data, isFreshLaunch = false) => {
  console.log({data});

  switch (data.type) {
    case NOTIFICATION_TYPES.MARK_AVAILABILITY:
      Actions.jump('availability');
      break;
    case NOTIFICATION_TYPES.NEW_PRIORITY_JOB:
      Actions.jump('available_jobs');
      break;
    case NOTIFICATION_TYPES.JOB_COMING_SOON: {
      const extraData = JSON.parse(data.extraData);
      Actions.acceptedJobDetails({jobId: parseInt(extraData.delivery_id)});
      break;
    }
    case NOTIFICATION_TYPES.GOTO_ACCEPTED_JOB_DETAILS: {
      const extraData = JSON.parse(data.extraData);
      Actions.acceptedJobDetails({jobId: parseInt(extraData.delivery_id)});
      break;
    }
    default:
  }
};

export {updateDeviceToken, navigateOnNotificationTap};

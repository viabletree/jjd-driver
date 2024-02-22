/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {navigateOnNotificationTap} from './src/services/firebaseHelper';

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  switch (type) {
    case EventType.DELIVERED:
      console.log('User DELIVERED notification', detail.notification);

      break;
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail.notification);
      break;
    case EventType.PRESS:
      navigateOnNotificationTap(detail.notification.data, true);
      break;
    case EventType.ACTION_PRESS:
      console.log('User pressed notification', detail.notification);
      break;
  }
});
notifee.onForegroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;

  switch (type) {
    case EventType.DELIVERED:
      console.log('User DELIVERED notification', detail);

      break;
    case EventType.DISMISSED:
      console.log('User dismissed notification', detail);

      break;
    case EventType.PRESS:
      console.log('User pressed notification');
      navigateOnNotificationTap(detail.notification.data, true);
      break;
    case EventType.ACTION_PRESS:
      console.log('User pressed notification', detail.notification);

      break;
  }
});

// Register background handler
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});
AppRegistry.registerComponent(appName, () => App);

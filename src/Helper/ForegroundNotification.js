import notifee, {AndroidImportance} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';

export default ForegroundHander = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {data, notification} = remoteMessage || {};

      const {title} = data || {};
      const {body} = notification;
      console.log({remoteMessage});

      await notifee.displayNotification({
        title: title,
        body: body,
        data: data,
        android: {
          channelId: 'com_jjd_driver',
          smallIcon: 'ic_launcher',
          importance: AndroidImportance.HIGH,
        },
        ios: {
          sound: 'default',
        },
      });

      return unsubscribe;
    });
  }, []);
  return null;
};

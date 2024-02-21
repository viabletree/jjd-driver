import messaging from '@react-native-firebase/messaging';
import {useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import util from '../util';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default ForegroundHander = () => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      const {data, notification} = remoteMessage || {};

      const {notificationId = '', title, result = ''} = data || {};

      const {body} = notification;
      console.log({remoteMessage});
      if (util.isPlatformAndroid()) {
        PushNotification.createChannel(
          {
            channelId: 'com_jjd_driver',
            channelName: 'Jjd_driver',
            importance: 4,
            vibrate: true,
            importance: Importance.HIGH,
          },
          created => {
            console.log(`CreateChannel returned '${created}'`);
          },
        );
        const notId = notificationId || getRandomInt(1, 1000000);
        console.log({notId});
        PushNotification.localNotification({
          channelId: 'com_jjd_driver',
          title: title,
          body: body,
          message: body,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          id: notId,
          massageId: notId,
          priority: 'high',
          data: result?.length > 0 ? JSON.parse(result) : data,
        });
      } else {
        console.log('ioosss', PushNotificationIOS);

        PushNotificationIOS.addNotificationRequest({
          message: title,
          title: title,
          body: body,
          vibrate: true,
          playSound: true,
          soundName: 'default',
          id: notificationId,
          massageId: notificationId,
          userInfo: data,
          interruptionLevel: 'timeSensitive',
        });

        // PushNotification.localNotification({
        //   title: title,
        //   body: body,
        //   message: body,
        //   vibrate: true,
        //   playSound: true,
        //   soundName: 'default',
        //   id: notificationId || `${getRandomInt(1, 1000000)}`,
        //   massageId: notificationId || `${getRandomInt(1, 1000000)}`,
        //   priority: 'high',
        //   data: data,
        // });
      }

      return unsubscribe;
    });
  }, []);
  return null;
};

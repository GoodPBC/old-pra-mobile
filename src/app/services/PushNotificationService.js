import PushNotification from 'react-native-push-notification';
import { Platform, PushNotificationIOS } from 'react-native';
import Config from 'react-native-config';

export default class PushNotificationService {
  static init(onRegister, onNotification) {
    PushNotification.configure({
      onRegister,
      onNotification: notification => {
        onNotification(notification);
        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      senderID: 'provider-response-195115',
    });
  }
}

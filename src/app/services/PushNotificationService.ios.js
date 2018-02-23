import PushNotification from 'react-native-push-notification';
import { 
  Platform, 
  Alert,
  PushNotificationIOS,
} from 'react-native';
import Config from 'react-native-config';

export default class PushNotificationService {
  static init(onRegister, onNotification) {
    PushNotification.configure({
      onRegister: token => {
        console.log('TOKEN: ', token);
        if (typeof onRegister === 'function') {
          onRegister(token);
        }
      },
      onNotification: notification => {
        console.log('NOTIFICATION: ', notification);
        if (typeof onNotification === 'function') {
          onNotification(notification);
        }

        if (notification.foreground) {
          Alert.alert(
            notification.message.title,
            notification.message.body,
            [],
            { onDismiss: () => { } },
          );
        }

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
        // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
      senderID: '423191307127',
    });
  }
}

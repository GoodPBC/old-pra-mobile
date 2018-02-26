import {
  Platform,
  Alert,
  PushNotificationIOS,
} from 'react-native';
import PushNotification from 'react-native-push-notification';

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

        this.updateBadgeCount(notification);

        if (notification.foreground) {
          this.showNotificationAlert(notification);
        }

        if (Platform.OS === 'ios') {
          notification.finish(PushNotificationIOS.FetchResult.NoData);
        }
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      senderID: '423191307127',
    });
  }

  static clearBadgeCount() {
    console.log('reset badge count to zero');
    PushNotification.setApplicationIconBadgeNumber(0);
  }

  static updateBadgeCount(notification) {
    PushNotification.getApplicationIconBadgeNumber(badgeCount => {
      const increment = notification.badge || 1;
      const newBadgeCount = badgeCount + increment;
      PushNotification.setApplicationIconBadgeNumber(newBadgeCount);
    });
  }

  static showNotificationAlert(notification) {
    if (Platform.OS === 'ios') {
      this.showNotificationAlertIOS(notification);
    } else {
      this.showNotificationAlertAndroid(notification);
    }
  }

  static showNotificationAlertIOS(notification) {
    Alert.alert(
      notification.message.title,
      notification.message.body,
      [],
      { onDismiss: () => {} },
    );
  }

  static showNotificationAlertAndroid(notification) {
    Alert.alert(
      notification.title,
      notification.message,
      [],
      { onDismiss: () => {} },
    );
  }
}

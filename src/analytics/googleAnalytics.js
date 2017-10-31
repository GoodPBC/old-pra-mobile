import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import Config from 'react-native-config';

const GoogleAnalytics = new GoogleAnalyticsTracker(Config.GOOGLE_ANALYTICS_TRACKING_ID);

export default GoogleAnalytics;

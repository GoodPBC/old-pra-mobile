import DeviceInfo from 'react-native-device-info';

const selectStyle = (obj, orientation = 'portrait') => {
  const deviceModel = DeviceInfo.getModel();

  const modelSpecificStyle = obj[deviceModel] || obj.default || {};
  const modelOrientationSpecificStyle = modelSpecificStyle[orientation] || {};

  return modelOrientationSpecificStyle;
}

export default selectStyle;

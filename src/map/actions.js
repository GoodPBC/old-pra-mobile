import axios from 'axios';
import moment from 'moment';
import Config from 'react-native-config';
import * as types from './actionTypes';
import { maxSince } from './helpers';

const endpoints = {
  GENERAL_CANVASSING: 'getgeneralcanvassing/',
  INTENSIVE_CANVASSING: 'getintensivecanvassingdata/',
  JOINT_OPERATIONS: 'getjointoperations/',
  PANHANDLING: 'getpanhandlingdata/',
};

function getSinceDate(state) {
  const { lastUpdated } = state;
  let since = maxSince;
  if (moment.isMoment(lastUpdated) && lastUpdated.isAfter(maxSince)) {
    since = lastUpdated;
  }
  return encodeURI(since.format('YYYY-MM-DD HH-mm-ss'));
}

function getUrl(actionName, state) {
  let baseUrl;
  let endpoint;
  let sinceDate;
  switch (actionName) {
    case types.FETCH_GENERAL_CANVASSING:
      baseUrl = Config.GENERAL_CANVASSING_URL;
      endpoint = endpoints.GENERAL_CANVASSING;
      sinceDate = getSinceDate(state.map.generalCanvassing);
      break;
    case types.FETCH_INTENSIVE_CANVASSING:
      baseUrl = Config.INTENSIVE_CANVASSING_URL;
      endpoint = endpoints.INTENSIVE_CANVASSING;
      sinceDate = getSinceDate(state.map.intensiveCanvassing);
      break;
    case types.FETCH_JOINT_OPERATIONS:
      baseUrl = Config.JOINT_OPERATIONS_URL;
      endpoint = endpoints.JOINT_OPERATIONS;
      sinceDate = getSinceDate(state.map.jointOperations);
      break;
    case types.FETCH_PANHANDLING:
      baseUrl = Config.PANHANDLING_URL;
      endpoint = endpoints.PANHANDLING;
      sinceDate = getSinceDate(state.map.panhandling);
      break;
    default:
      throw new Error(`Does not recognize the ${actionName} action`);
  }
  return baseUrl + endpoint + sinceDate;
}

function fetchCanvassingData(actionName) {
  return (dispatch, getState) => {
    const url = getUrl(actionName, getState());
    dispatch({ type: `${actionName}_REQUEST` });
    return axios.get(url)
      .then(res => {
        dispatch({ type: `${actionName}_SUCCESS`, payload: res.data });
      })
      .catch(error => {
        dispatch({ type: `${actionName}_FAILURE`, error });
      });
  };
}

export function fetchGeneralCanvassingData() {
  return fetchCanvassingData(types.FETCH_GENERAL_CANVASSING);
}

export function fetchIntensiveCanvassingData() {
  return fetchCanvassingData(types.FETCH_INTENSIVE_CANVASSING);
}

export function fetchJointOperationsData() {
  return fetchCanvassingData(types.FETCH_JOINT_OPERATIONS);
}

export function fetchPanhandlingData() {
  return fetchCanvassingData(types.FETCH_PANHANDLING);
}
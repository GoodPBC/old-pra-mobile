import axios from 'axios';
import moment from 'moment';
import Config from 'react-native-config';
import * as types from './actionTypes';

const endpoints = {
  GENERAL_CANVASSING: 'getgeneralcanvassing/',
  INTENSIVE_CANVASSING: 'getintensivecanvassingdata/',
  JOINT_OPERATIONS: 'getjointoperations/',
  PANHANDLING: 'getpanhandlingdata/',
};

function parseTime(timeStr) {
  return moment(timeStr, 'YYYY-MM-DD HH:mm:ss.SSS');
}

function momentToStr(momentDate) {
  return momentDate.format('YYYY-MM-DD HH-mm-ss');
}

function getSinceDate(state) {
  const now = moment();
  const since = __DEV__ ? now.subtract(7, 'days') : now.subtract(2, 'hours');
  return encodeURI(momentToStr(since));
}

function getUrl(actionName, state) {
  let baseUrl;
  let endpoint;
  let sinceDate;
  switch (actionName) {
    case 'FETCH_GENERAL_CANVASSING':
      baseUrl = Config.GENERAL_CANVASSING_URL;
      endpoint = endpoints.GENERAL_CANVASSING;
      sinceDate = getSinceDate(state.generalCanvassing);
      break;
    case 'FETCH_INTENSIVE_CANVASSING':
      baseUrl = Config.INTENSIVE_CANVASSING_URL;
      endpoint = endpoints.INTENSIVE_CANVASSING;
      sinceDate = getSinceDate(state.intensiveCanvassing);
      break;
    case 'FETCH_JOINT_OPERATIONS':
      baseUrl = Config.JOINT_OPERATIONS_URL;
      endpoint = endpoints.JOINT_OPERATIONS;
      sinceDate = getSinceDate(state.jointOperations);
      break;
    case 'FETCH_PANHANDLING':
      baseUrl = Config.PANHANDLING_URL;
      endpoint = endpoints.PANHANDLING;
      sinceDate = getSinceDate(state.panhandling);
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
  return fetchCanvassingData('FETCH_GENERAL_CANVASSING');
}

export function fetchIntensiveCanvassingData() {
  return fetchCanvassingData('FETCH_INTENSIVE_CANVASSING');
}

export function fetchJointOperationsData() {
  return fetchCanvassingData('FETCH_JOINT_OPERATIONS');
}

export function fetchPanhandlingData() {
  return fetchCanvassingData('FETCH_PANHANDLING');
}
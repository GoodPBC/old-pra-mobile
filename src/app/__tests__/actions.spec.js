import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import { API_REQUEST } from '../../shared';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('App Redux Actions', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should create SELECT_TAB and UPDATE_TAB_CONTEXT with no context', () => {
    const selectedTab = 'SELECTED_TAB';
    const context = null;
    const expectedActions = [
      { type: actionTypes.SELECT_TAB, selectedTab },
      { type: actionTypes.UPDATE_TAB_CONTEXT, context },
    ];

    const store = mockStore();

    store.dispatch(actions.selectTab(selectedTab));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should create SELECT_TAB and UPDATE_TAB_CONTEXT with non-null context', () => {
    const selectedTab = 'SELECTED_TAB';
    const context = 'context';
    const expectedActions = [
      { type: actionTypes.SELECT_TAB, selectedTab },
      { type: actionTypes.UPDATE_TAB_CONTEXT, context },
    ];

    const store = mockStore();

    store.dispatch(actions.selectTab(selectedTab, context));
    expect(store.getActions()).toEqual(expectedActions);
  });

  it('should creates an action to update the selected tab\'s context', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_TAB_CONTEXT,
      context: 'context',
    };

    expect(actions.updateTabContext('context')).toEqual(expectedAction);
  });

  it('should create an action to update device\'s info with an object', () => {
    const expectedAction = {
      type: actionTypes.UPDATE_DEVICE_INFO,
      deviceInfo: { token: 'token' },
    };

    expect(actions.updateDeviceInfo({ token: 'token'})).toEqual(expectedAction);
  });

  it('should create GA_TRACK_EVENT action from gaTrackPressEvent', () => {
    const expectedAction = {
      type: actionTypes.GA_TRACK_EVENT,
      eventCategory: 'Interactions',
      eventAction: 'Pressed',
      eventLabel: 'Something',
    };
    expect(actions.gaTrackPressEvent('Something')).toEqual(expectedAction);
  });

  it('should creates an action to track event for Google Analytics', () => {
    const expectedAction = {
      type: actionTypes.GA_TRACK_EVENT,
      eventCategory: 'Category',
      eventAction: 'Action',
      eventLabel: 'Label',
    };
    expect(actions.gaTrackEvent('Category', 'Action', 'Label')).toEqual(expectedAction);
  });

  it('should create an action for screen view', () => {
    const expectedAction = {
      type: actionTypes.GA_TRACK_SCREEN_VIEW,
      screenName: 'welcome',
    };
    expect(actions.gaTrackScreenView('welcome')).toEqual(expectedAction);
  });

  it('should create an action to clear error message', () => {
    const expectedAction = {
      type: actionTypes.CLEAR_ERROR_MESSAGE,
    };
    expect(actions.clearErrorMessage()).toEqual(expectedAction);
  });

  it('should create an action to update apiRequestInProgress', () => {
    const expectedAction = {
      type: actionTypes.SET_API_REQUEST_IN_PROGRESS,
      apiRequestInProgress: true,
    };
    expect(actions.setApiRequestInProgress(true)).toEqual(expectedAction);
  });
});

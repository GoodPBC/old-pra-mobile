import { Reducer } from 'redux-testkit';
import moment from 'moment';
import * as actionTypes from '../actionTypes';
import uut, { 
  initialState, 
  transformStreetSmartServiceRequests,
} from '../reducer';
import { LOGOUT_USER } from '../../user/actionTypes';
import { SYNC_SERVICE_REQUESTS } from '../../offline/actionTypes';

describe('team reducer', () => {
  it('should return the initial state', () => {
    expect(uut(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_SERVICE_REQUESTS_SUCCESS', () => {
    const receivedServiceRequests = [
      {
        SR_Number: 'sr_number',
        Address: 'address',
        SR_Status: 'Onsite',
      },
    ];
    const transformedServiceRequests = transformStreetSmartServiceRequests(receivedServiceRequests);
    const action = {
      type: actionTypes.FETCH_SERVICE_REQUESTS_SUCCESS,
      data: {
        Service_Requests: receivedServiceRequests,
      },
    };
    const existingState = {
      ...initialState,
      isRefreshing: true,
    };
    const expectedState = {
      ...existingState,
      serviceRequests: transformedServiceRequests,
      hasLoadedServiceRequests: true,
      isRefreshing: false,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle MARK_PENDING_STATUS with resolved status', () => {
    const action = {
      type: actionTypes.MARK_PENDING_STATUS,
      serviceRequest: { sr_number: 'sr_1' },
      pendingStatus: 'resolved',
      updatedAt: moment('2013-02-08 09:30:26.123', 'YYYY-MM-DD HH:mm:ss.SSS'),
      name: 'spiderman',
      resolutionCode: 12345,
      resolutionNotes: 'thwip',
    };
    const existingState = {
      ...initialState,
      serviceRequests: [
        { sr_number: 'sr_1' },
        { sr_number: 'sr_2' },
      ],
    };
    const expectedState = {
      ...existingState,
      serviceRequests: [
        {
          sr_number: 'sr_1',
          status: 'visit_complete',
          updated_at: '2013-02-08 09:30:26.123',
          updated_by: 'spiderman',
          resolution_code: 12345,
          resolution_notes: 'thwip',
          unsynced: true,
        },
        { sr_number: 'sr_2' },
      ],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle MARK_PENDING_STATUS with on_site status', () => {
    const action = {
      type: actionTypes.MARK_PENDING_STATUS,
      serviceRequest: { sr_number: 'sr_2' },
      pendingStatus: 'onsite',
      updatedAt: moment('2013-02-08 09:30:26.123', 'YYYY-MM-DD HH:mm:ss.SSS'),
      name: 'spiderman',
    };
    const existingState = {
      ...initialState,
      serviceRequests: [
        { sr_number: 'sr_1' },
        { sr_number: 'sr_2' },
      ],
    };
    const expectedState = {
      ...existingState,
      serviceRequests: [
        { sr_number: 'sr_1' },
        {
          sr_number: 'sr_2',
          status: 'on_site',
          actual_onsite_time: '2013-02-08 09:30:26.123',
          updated_by: 'spiderman',
          unsynced: true,
        },
      ],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle RERENDER_SERVICE_REQUESTS', () => {
    const action = {
      type: actionTypes.RERENDER_SERVICE_REQUESTS,
    };
    const existingState = {
      ...initialState,
      serviceRequests: [
        { sr_number: '123' },
        { sr_number: '456' },
      ],
    };
    const expectedState = {
      ...existingState,
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(expectedState);
  });

  it('should handle SELECT_SERVICE_REQUEST by changing currentSrNumber and clearing all resolution info', () => {
    const action = {
      type: actionTypes.SELECT_SERVICE_REQUEST,
      serviceRequest: { sr_number: 'sr_number' },
    };
    const existingState = {
      ...initialState,
      currentSrNumber: 'another_sr_number',
      resolutionNotes: 'hello',
      selectedResolutionCode: 99999,
    };
    const expectedChange = {
      currentSrNumber: 'sr_number',
      resolutionNotes: null,
      selectedResolutionCode: null,
    };
    Reducer(uut).withState(existingState).expect(action).toChangeInState(expectedChange);
  });

  it('should set currentSrNumber to null if SELECT_SERVICE_REQUEST has non-truthy serviceRequest', () => {
    const action = {
      type: actionTypes.SELECT_SERVICE_REQUEST,
      serviceRequest: undefined,
    };
    const existingState = {
      ...initialState,
      currentSrNumber: 'another_sr_number',
    };
    const expectedChange = {
      currentSrNumber: null,
    };
    Reducer(uut).withState(existingState).expect(action).toChangeInState(expectedChange);
  })

  it('should handle SELECT_SERVICE_REQUEST_RESOLUTION', () => {
    const action = {
      type: actionTypes.SELECT_SERVICE_REQUEST_RESOLUTION,
      selectedResolutionCode: 0,
    };
    const existingState = {
      ...initialState,
      resolutionNotes: 'hello world',
    };
    const expectedChange = {
      resolutionNotes: null,
      selectedResolutionCode: 0,
    };
    Reducer(uut).withState(existingState).expect(action).toChangeInState(expectedChange);
  });

  it('should handle SYNC_SERVICE_REQUESTS', () => {
    const action = {
      type: SYNC_SERVICE_REQUESTS,
    };
    const expectedChange = {
      isRefreshing: true,
    };
    Reducer(uut).expect(action).toChangeInState(expectedChange);
  });

  it('should handle UPDATE_RESOLUTION_NOTES', () => {
    const action = {
      type: actionTypes.UPDATE_RESOLUTION_NOTES,
      notes: 'my_notes',
    };
    const expectedChange = {
      resolutionNotes: 'my_notes',
    };
    Reducer(uut).expect(action).toChangeInState(expectedChange);
  });

  it('should reset to initialState on LOGOUT_USER', () => {
    const action = {
      type: LOGOUT_USER,
    };
    const existingState = {
      ...initialState,
      serviceRequests: [
        { sr_number: 1 },
        { sr_number: 2 },
      ],
    };
    Reducer(uut).withState(existingState).expect(action).toReturnState(initialState);
  });

});
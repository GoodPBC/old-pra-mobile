import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import Config from 'react-native-config';
import moment from 'moment';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';
import { API_REQUEST, API_REQUEST_FAILURE } from '../../shared';
import { momentToStr } from '../helpers';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Service Request Redux Actions', () => {
    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('should create SELECT_SERVICE_REQUEST_RESOLUTION', () => {
        const expectedAction = {
            type: actionTypes.SELECT_SERVICE_REQUEST_RESOLUTION,
            selectedResolutionCode: 0,
        };
        expect(actions.selectServiceRequestResolution(0)).toEqual(expectedAction);
    });

    it('should create FETCH_SERVICE_REQUESTS', () => {
        const since = momentToStr(moment().subtract(100, 'days'));
        const expectedAction = {
            type: API_REQUEST,
            actionName: actionTypes.FETCH_SERVICE_REQUESTS,
            requestPath: `Get311ServiceRequests/${encodeURIComponent(since)}`,
            endpoint: 'Get311ServiceRequests',
            requestMethod: 'GET',
            onSuccess: null,
        };
        expect(actions.fetchServiceRequests(null)).toEqual(expectedAction);
    });

    it('should create RERENDER_SERVICE_REQUESTS', () => {
        const expectedAction = {
            type: actionTypes.RERENDER_SERVICE_REQUESTS,
        };
        expect(actions.rerenderServiceRequests()).toEqual(expectedAction);
    });

    it('should create MARK_PENDING_STATUS and API_REQUEST on resolving service request', () => {
        const serviceRequest = {
            sr_number: 'sr_number',
        };
        const store = mockStore({
            user: { name: 'username', userId: 12345 },
            serviceRequests: { resolutionNotes: 'notes' },
        });

        store.dispatch(actions.resolveServiceRequest(serviceRequest, 0));
        const receivedActions = store.getActions();
        const updatedAt = receivedActions[0].updatedAt;
        const expectedActions = [{
                type: actionTypes.MARK_PENDING_STATUS,
                serviceRequest,
                pendingStatus: 'resolved',
                updatedAt,
                name: 'username',
                resolutionNotes: 'notes',
                resolutionCode: 0
            },
            {
                type: API_REQUEST,
                actionName: actionTypes.RESOLVE_SERVICE_REQUEST,
                requestPath: 'update311servicerequests',
                endpoint: 'update311servicerequests',
                requestMethod: 'POST',
                requestParams: [{
                    SR_Number: 'sr_number',
                    ModifiedAt: momentToStr(updatedAt),
                    PRASRStatusId: actions.STATUS_CODES.visit_complete,
                    ModifiedBy: 12345,
                    PRASRResolutionCodeId: 0,
                }],
                serviceRequest,
                onSuccess: () => {},
            },
        ];
        // Using JSON.stringify to ignore onSuccess
        expect(JSON.stringify(receivedActions)).toEqual(JSON.stringify(expectedActions));
    });

    it('should create SELECT_SERVICE_REQUEST', () => {
        const serviceRequest = {
            sr_number: '1234',
        };
        const expectedAction = {
            type: actionTypes.SELECT_SERVICE_REQUEST,
            serviceRequest,
        };
        expect(actions.selectServiceRequest(serviceRequest)).toEqual(expectedAction);
    });

    it('should create SERVICE_SERVICE_REQUEST with null to unselect serviceRequest', () => {
        const expectedAction = {
            type: actionTypes.SELECT_SERVICE_REQUEST,
            serviceRequest: null,
        };
        expect(actions.unselectServiceRequest()).toEqual(expectedAction);
    });

    it('should create MARK_PENDING_STATUS and API_REQUEST on updating on-site status', () => {
        const serviceRequest = {
            sr_number: 'sr_number',
        };
        const store = mockStore({
            user: { name: 'username', userId: 12345 },
            serviceRequests: { resolutionNotes: 'notes' },
        });
        store.dispatch(actions.updateOnsiteStatus(serviceRequest));
        const receivedActions = store.getActions();
        const updatedAt = receivedActions[0].updatedAt;
        const expectedActions = [{
                type: actionTypes.MARK_PENDING_STATUS,
                serviceRequest,
                pendingStatus: 'onsite',
                updatedAt,
                name: 'username',
            },
            {
                type: API_REQUEST,
                actionName: actionTypes.UPDATE_ONSITE_STATUS,
                requestPath: 'update311servicerequests',
                endpoint: 'update311servicerequests',
                requestMethod: 'POST',
                requestParams: [{
                    SR_Number: 'sr_number',
                    ModifiedAt: momentToStr(updatedAt),
                    PRASRStatusId: actions.STATUS_CODES.on_site,
                    ModifiedBy: 12345,
                    PRASRResolutionCodeId: null,
                }],
                serviceRequest,
                onSuccess: () => {},
            },
        ];
        // Using JSON.stringify to ignore onSuccess
        expect(JSON.stringify(receivedActions)).toEqual(JSON.stringify(expectedActions));
    });

    it('should create ADD_CONTACT_TO_SERVICE_REQUEST by dispatching API_REQUEST', () => {
        const contact = { contact: 'contact' };
        const expectedAction = {
            type: API_REQUEST,
            actionName: actionTypes.ADD_CONTACT_TO_SERVICE_REQUEST,
            requestMethod: 'POST',
            requestPath: 'contacts',
            requestParams: { contact },
        };
        expect(actions.addContactToServiceRequest(contact)).toEqual(expectedAction);
    });

    it('should create UPDATE_RESOLUTION_NOTES', () => {
        const notes = 'hello, world!';
        const expectedAction = {
            type: actionTypes.UPDATE_RESOLUTION_NOTES,
            notes,
        };
        expect(actions.updateResolutionNotes(notes)).toEqual(expectedAction);
    });

    it('should create UPDATE_PING_RESPONSE API_REQUEST', () => {
        const pingResponse = {
            actualOnsiteTime: 'actual_onsite_time',
            modifiedAt: 'modified_at',
            pingNote: 'ping_note',
            reasonId: 'reason_id',
            srNumber: 'sr_number',
        };
        const store = mockStore({
            user: { userId: 12345 },
        });
        const expectedActions = [{
            type: API_REQUEST,
            actionName: actionTypes.UPDATE_PING_RESPONSE,
            requestMethod: 'POST',
            requestPath: 'updatepingresponse',
            endpoint: 'updatepingresponse',
            requestParams: {
                ActualOnsiteTime: pingResponse.actualOnsiteTime,
                ModifiedAt: pingResponse.modifiedAt,
                ModifiedBy: 12345,
                PingNote: pingResponse.pingNote,
                ReasonId: pingResponse.reasonId,
                SR_Number: pingResponse.srNumber
            },
        }];
        store.dispatch(actions.updateServiceRequestPingResponse(pingResponse));
        expect(store.getActions()).toEqual(expectedActions);
    })
});
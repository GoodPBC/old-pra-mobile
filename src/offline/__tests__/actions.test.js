import * as actions from '../actions';
import * as actionTypes from '../actionTypes';

describe('Offline Redux Actions', () => {
	it('should create ADD_TO_SYNC_QUEUE', () => {
		const expectedAction = {
			type: actionTypes.ADD_TO_SYNC_QUEUE,
			action: 0,
		};
		expect(actions.addToSyncQueue(0)).toEqual(expectedAction);
	});

	it('should create SYNC_SERVICE_REQUESTS', () => {
		const expectedAction = {
			type: actionTypes.SYNC_SERVICE_REQUESTS,
		};
		expect(actions.syncServiceRequests()).toEqual(expectedAction);
	});

	it('should create UPDATE_NETWORK_STATUS', () => {
		const expectedAction = {
			type: actionTypes.UPDATE_NETWORK_STATUS,
			isConnected: true,
		};
		expect(actions.updateNetworkStatus(true)).toEqual(expectedAction);
	});
});
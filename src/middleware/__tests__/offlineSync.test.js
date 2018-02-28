import offlineSync, { tracker } from '../offlineSync';
import Config from 'react-native-config';
import fetchMock from 'fetch-mock';
import thunk from 'redux-thunk';
import { API_REQUEST } from '../../shared';
import { fetchServiceRequests } from '../../serviceRequests/actions';
import { addToSyncQueue } from '../../offline/actions';

const mockStore = state => {
	const getState = jest.fn(() => state);
	const dispatch = jest.fn();
	return { getState, dispatch };
};

describe('offline sync middleware', () => {
	const create = mockedStore => {
		const store = mockedStore || {
			getState: jest.fn(() => ({})),
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const invoke = action => offlineSync(store)(next)(action);
		return { store, next, invoke };
	};

	it('should pass NETWORK_STATUS_CHANGE through and not call dispatch', () => {
		const store = mockStore({
			offline: { networkIsConnected: true, syncQueue: [] },
		});
		const { next, invoke } = create(store);
		const action = {
			type: 'NETWORK_STATUS_CHANGE',
		};

		invoke(action);

		expect(next).toHaveBeenCalledWith(action);
		expect(store.dispatch).not.toHaveBeenCalledWith();
	});

	describe('when networkIsConnected is true', () => {
		it('should not dispatch any other actions when it is not one of drainTriggerActions', () => {
			const store = mockStore({
				offline: { networkIsConnected: true, syncQueue: [] },
			});
			const { next, invoke } = create(store);
			const action = {
				type: 'TEST_ACTION',
			};

			invoke(action);

			expect(next).toHaveBeenCalledWith(action);
			expect(store.dispatch).not.toHaveBeenCalledWith();
		});

		it('should drain syncQueue for SYNC_SERVICE_REQUESTS', () => {
			const store = mockStore({
				offline: { 
					networkIsConnected: true, 
					syncQueue: ['ACTION_1', 'ACTION_2'],
				},
			});
			const { next, invoke } = create(store);
			const action = {
				type: 'SYNC_SERVICE_REQUESTS',
			};

			const expectedActions = [
				'ACTION_1',
				'ACTION_2',
				{ type: 'FINISH_SYNC' },
				fetchServiceRequests(),
			];

			invoke(action);

			expect(next).toHaveBeenCalledWith(action);
			expect(store.dispatch).toHaveBeenCalledTimes(4);
			expect(store.dispatch).toHaveBeenCalledWith(expectedActions[0]);
			expect(store.dispatch).toHaveBeenCalledWith(expectedActions[1]);
			expect(store.dispatch).toHaveBeenCalledWith(expectedActions[2]);
			expect(store.dispatch).toHaveBeenCalledWith(expectedActions[3]);
		});
	});

	describe('when networkIsConnected is false', () => {
		let store;

		beforeEach(() => {
			store = mockStore({
				offline: {
					networkIsConnected: false,
					syncQueue: ['ACTION_1', 'ACTION_2'],
				},
			});
		});

		describe('when it is an API_REQUEST action', () => {
			it('should handle queueable actions with serviceRequest', () => {
				const { next, invoke } = create(store);
				const action = {
					type: API_REQUEST,
					actionName: 'RESOLVE_SERVICE_REQUEST',
					serviceRequest: 'SERVICE_REQUEST',
				};
				const expectedAction = addToSyncQueue(action);

				invoke(action);

				expect(next).not.toHaveBeenCalled();
				expect(store.dispatch).toHaveBeenCalledTimes(1);
				expect(store.dispatch).toHaveBeenCalledWith(expectedAction);
			});

			it('should handle queueable actions without serviceRequest', () => {
				const { next, invoke } = create(store);
				const action = {
					type: API_REQUEST,
					actionName: 'RESOLVE_SERVICE_REQUEST',
				};
				invoke(action);
				expect(next).not.toHaveBeenCalled();
				expect(store.dispatch).not.toHaveBeenCalled();
			});
			
			it('should handle non-queueable actions', () => {
				const { next, invoke } = create(store);
				const action = {
					type: API_REQUEST,
					actionName: 'NON_QUEUEABLE_ACTION',
				};
				invoke(action);
				expect(next).not.toHaveBeenCalled();
				expect(store.dispatch).not.toHaveBeenCalled();
			});
		});

		describe('when it is not an API_REQUEST action', () => {
			it('should handle an action that is one of drainTriggerActions', () => {
				const { next, invoke } = create(store);
				const action = {
					type: 'SYNC_SERVICE_REQUESTS',
				};

				invoke(action);

				expect(next).toHaveBeenCalledWith(action);
				expect(store.dispatch).not.toHaveBeenCalled();
			});

			it('should handle an action that is not one of drainTriggerActions', () => {
				const { next, invoke } = create(store);
				const action = {
					type: 'NOT_API_REQUEST',
				};
				const expectedActions = [
					'ACTION_1',
					'ACTION_2',
					{ type: 'FINISH_SYNC' },
					fetchServiceRequests(),
				];

				invoke(action);

				expect(next).toHaveBeenCalledWith(action);
				expect(store.dispatch).not.toHaveBeenCalled();
			});
		});
	});

});
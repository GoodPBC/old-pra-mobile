import * as actionTypes from '../actionTypes';
import reducer, { initialState } from '../reducer';
import { LOGOUT_USER } from '../../user/actionTypes';

describe('offline reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual(initialState);
	});

	it('should handle UPDATE_NETWORK_STATUS', () => {
		const action = {
			type: actionTypes.UPDATE_NETWORK_STATUS,
			isConnected: false,
		};
		const expectedState = {
			...initialState,
			networkIsConnected: false,
		};
		expect(reducer(initialState, action)).toEqual(expectedState);
	});

	it('should empty syncQueue on FINISH_SYNC', () => {
		const action = {
			type: actionTypes.FINISH_SYNC,
		};
		const existingState = {
			...initialState,
			syncQueue: [1, 2, 3, 4],
		};
		const expectedState = {
			...existingState,
			syncQueue: [],
		};
		expect(reducer(existingState, action)).toEqual(expectedState);
	});

	it('should handle ADD_TO_SYNC_QUEUE', () => {
		const action = {
			type: actionTypes.ADD_TO_SYNC_QUEUE,
			action: 'superman',
		};
		const existingState = {
			...initialState,
			syncQueue: ['batman'],
		};
		const expectedState = {
			...existingState,
			syncQueue: ['batman', 'superman'],
		};
		expect(reducer(existingState, action)).toEqual(expectedState);
	});
});
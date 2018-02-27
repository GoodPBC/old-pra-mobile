import offlineSync, { tracker } from '../offlineSync';

describe('offline sync middleware', () => {
	const create = (getState) => {
		const store = {
			getState: getState || jest.fn(() => ({})),
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const invoke = action => offlineSync(store)(next)(action);
		return { store, next, invoke };
	};

	test('', () => {});
});
import googleAnalytics, { tracker } from '../googleAnalytics';
import {
	API_REQUEST,
	API_REQUEST_SUCCESS,
	API_REQUEST_FAILURE,
} from '../../shared';

describe('google analytics middleware', () => {
	const create = (getState) => {
		const store = {
			getState: getState || jest.fn(() => ({})),
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const invoke = action => googleAnalytics(store)(next)(action);
		return { store, next, invoke };
	};

	const spyTrackScreenView = jest.spyOn(tracker, 'trackScreenView');
	const spyTrackException = jest.spyOn(tracker, 'trackException');
	const spyTrackEvent = jest.spyOn(tracker, 'trackEvent');

	afterEach(() => {
		spyTrackScreenView.mockReset();
		spyTrackScreenView.mockRestore();

		spyTrackException.mockReset();
		spyTrackException.mockRestore();

		spyTrackEvent.mockReset();
		spyTrackEvent.mockRestore();
	});

	it('passes through all redux action', () => {
		const { next, invoke } = create();
		const action = { type: 'TEST' };
		invoke(action);
		expect(next).toHaveBeenCalledWith(action);
	});

	describe('API_REQUEST_FAILURE', () => {
		it('should call trackException', () => {
			const { next, invoke } = create();
			const action = {
				type: 'API_REQUEST_FAILURE',
				action: {
					requestMethod: 'FOO',
					requestPath: 'BAR',
				},
				error: 'BAZ',
			};
	
			invoke(action);
	
			expect(spyTrackException).toHaveBeenCalledWith('FOO /BAR BAZ', false);
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('API_REQUEST_NETWORK_ERROR', () => {
		it('should call trackException', () => {
			const { next, invoke } = create();
			const action = {
				type: 'API_REQUEST_NETWORK_ERROR',
				action: {
					requestMethod: 'FOO',
					requestPath: 'BAR',
				},
				error: 'BAZ',
			};
	
			invoke(action);
	
			expect(spyTrackException).toHaveBeenCalledWith('FOO /BAR BAZ', false);
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('GA_TRACK_EVENT', () => {
		it('should call trackEvent and break', () => {
			const { next, invoke } = create();
			const action = {
				type: 'GA_TRACK_EVENT',
				eventCategory: 'foo',
				eventAction: 'bar',
				eventLabel: 'baz',
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('foo', 'bar', { label: 'baz' });
			expect(next).not.toBeCalled();
		});
	});

	describe('GA_TRACK_SCREEN_VIEW', () => {
		it('should call trackScreenView and break', () => {
			const { next, invoke } = create();
			const action = {
				type: 'GA_TRACK_SCREEN_VIEW',
				screenName: 'Teams',
			};

			invoke(action);
			
			expect(spyTrackScreenView).toHaveBeenCalledWith('Teams');
			expect(next).not.toBeCalled();
		});
	});

	describe('SELECT_SERVICE_REQUEST', () => {
		it('should call trackEvent', () => {
			const { next, invoke } = create();
			const action = {
				type: 'SELECT_SERVICE_REQUEST',
				serviceRequest: {
					sr_number: 'sr_number',
				},
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Interactions', 'Viewed', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should not call trackEvent if no serviceRequest is provided', () => {
			const { next, invoke } = create();
			const action = {
				type: 'SELECT_SERVICE_REQUEST',
			};

			invoke(action);

			expect(spyTrackEvent).not.toBeCalled();
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('SYNC_SERVICE_REQUESTS', () => {
		it('should call spyTrackEvent', () => {
			const { next, invoke } = create();
			const action = {
				type: 'SYNC_SERVICE_REQUESTS',
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toBeCalledWith('Interactions', 'Pressed', { label: 'Refresh' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('FETCH_SERVICE_REQUESTS_SUCCESS', () => {
		it('should call trackEvent', () => {
			const getState = jest.fn(() => ({
				user: { userAccountName: 'username' },
			}));
			const { next, invoke } = create(getState);
			const action = {
				type: 'FETCH_SERVICE_REQUESTS_SUCCESS',
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toBeCalledWith('Service Requests', 'Fetched', { label: 'username' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('RESOLVE_SERVICE_REQUEST_SUCCESS', () => {
		it('should call trackEvent for assistance_offered', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 1,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Assistance Offered', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent for insufficient_information', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 2,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Insufficient Information', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent for person_not_found', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 3,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Person Not Found', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent for referred_to_911', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 4,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Referred To 911', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent for refused_assistance', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 5,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Refused Assistance', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent for out_of_jurisdiction', () => {
			const { next, invoke } = create();
			const action = {
				type: 'RESOLVE_SERVICE_REQUEST_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
							PRASRResolutionCodeId: 7,
						},
					],
				},
			};
	
			invoke(action);
	
			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Resolved: Out Of Jurisdiction', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('UPDATE_ONSITE_STATUS_SUCCESS', () => {
		it('should call trackEvent', () => {
			const { next, invoke } = create();
			const action = {
				type: 'UPDATE_ONSITE_STATUS_SUCCESS',
				data: {
					Service_Requests: [
						{
							SR_Number: 'sr_number',
						},
					],
				},
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Service Requests', 'Went On-site', { label: 'sr_number' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('JOIN_TEAM', () => {
		it('should call trackEvent with "Changed" when switching teams', () => {
			const { next, invoke } = create();
			const action = {
				type: 'JOIN_TEAM',
				oldTeam: { name: 'old_team' },
				team: { name: 'new_team' },
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Teams', 'Changed', { label: 'old_team -> new_team' });
			expect(next).toHaveBeenCalledWith(action);
		});

		it('should call trackEvent with "Joined" when joining for the first time', () => {
			const { next, invoke } = create();
			const action = {
				type: 'JOIN_TEAM',
				team: { name: 'new_team' },
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Teams', 'Joined', { label: 'new_team' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('LOGIN_USER_SUCCESS', () => {
		it('should call trackEvent when login succeeds', () => {
			const { next, invoke } = create();
			const action = {
				type: 'LOGIN_USER_SUCCESS',
				data: { UserAccountName: 'username' },
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Users', 'Logged In', { label: 'username' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});

	describe('LOGOUT_USER', () => {
		it('should call trackEvent when login succeeds', () => {
			const { next, invoke } = create();
			const action = {
				type: 'LOGOUT_USER',
				user: { userAccountName: 'username' },
			};

			invoke(action);

			expect(spyTrackEvent).toHaveBeenCalledWith('Users', 'Logged Out', { label: 'username' });
			expect(next).toHaveBeenCalledWith(action);
		});
	});
});
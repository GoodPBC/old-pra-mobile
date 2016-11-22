import reducer from '../reducers';

describe('service request reducer', () => {
  it('has an initial state', () => {
    const action = {
      type: 'foo',
    };
    expect(reducer(undefined, action)).toBeTruthy();
  });

  describe('onsite status update', () => {
    let currentServiceRequest = null;
    let existingState = null;
    let action = null;

    beforeEach(() => {
      currentServiceRequest = {
        id: 123,
        complaint_details: 'old info',
      };
      existingState = {
        currentServiceRequest: currentServiceRequest,
        serviceRequests: [
          currentServiceRequest,
          {
            id: 456,
            complaint_details: 'do not change me',
          }
        ]
      };

      action = {
        type: 'UPDATE_ONSITE_STATUS_SUCCESS',
        data: {
          service_request: {
            id: 123,
            complaint_details: 'updated info'
          }
        },
      };
    });

    it('handles onsite status updates by updating the current SR data', () => {
      const newState = reducer(existingState, action);

      expect(newState.currentServiceRequest.complaint_details).toBe('updated info');
    });
  });
});
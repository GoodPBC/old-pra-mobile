import { FETCH_SERVICE_REQUESTS } from './actionTypes';
import { API_REQUEST } from '../shared';

const SERVICE_REQUESTS_PATH = 'service_requests';

export function fetchServiceRequests() {
    return {
        type: API_REQUEST,
        actionName: FETCH_SERVICE_REQUESTS,
        requestPath: SERVICE_REQUESTS_PATH,
        requestMethod: 'GET',
    };
}
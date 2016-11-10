import {
    FETCH_SERVICE_REQUESTS,
    FETCH_SERVICE_REQUEST_DETAILS,
    SELECT_SERVICE_REQUEST,
    UPDATE_ONSITE_STATUS,
} from './actionTypes';
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

export function fetchServiceRequestDetails(serviceRequest) {
    return {
        type: API_REQUEST,
        actionName: FETCH_SERVICE_REQUEST_DETAILS,
        requestPath: `service_requests/${serviceRequest.id}`,
        requestMethod: 'GET',
    }
}

export function selectServiceRequest(serviceRequest) {
    return {
        type: SELECT_SERVICE_REQUEST,
        serviceRequest,
    };
}

export function updateOnsiteStatus(serviceRequest) {
    const reportedAtDate = Date();

    return {
        type: API_REQUEST,
        actionName: UPDATE_ONSITE_STATUS,
        requestPath: `service_requests/${serviceRequest.id}/onsite`,
        requestMethod: 'POST',
        requestParams: {
            status: {
                reported_at: reportedAtDate,
            }
        }
    };
}
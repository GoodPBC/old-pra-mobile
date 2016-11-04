import { CREATE_TEAM_SUCCESS } from './actionTypes';

/**
 *
 * Proposed JSON structure for teams:
 *
 * {
 *   "name": "Whatever",
 *   "created_at": ...,
 *   "updated_at": ...,
 *   "users": [
 *     { ... }
 *   ]
 * }
 *
 */
export function createTeam(teamName) {
  // TODO: Replace this with an API call.
  return {
    type: CREATE_TEAM_SUCCESS,
    data: {
      team: {
        name: teamName,
      }
    }
  };
}
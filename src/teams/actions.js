import {
  CREATE_TEAM_SUCCESS,
  FETCH_TEAMS_SUCCESS,
  JOIN_TEAM_SUCCESS,
} from './actionTypes';

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
        users: []
      }
    }
  };
}

export function fetchTeams() {
  // TODO: Replace with API call
  return {
    type: FETCH_TEAMS_SUCCESS,
    data: {
      teams: [
        {
          id: 123,
          name: 'Red Team (fake data)',
          users: [
            {
              email: 'red1@example.com',
            },
            {
              email: 'red2@example.com',
            }
          ]
        },
        {
          id: 456,
          name: 'Blue Team (fake data)',
          users: [
            {
              email: 'blue1@example.com',
            },
            {
              email: 'blue2@example.com',
            }
          ]
        }
      ]
    }
  }
}

export function joinTeam(team) {
  return {
    type: JOIN_TEAM_SUCCESS,
    data: {
      // TODO: Assume for the sake of convenience that the request returns
      // the latest team object.
      team: team,
    }
  }
}
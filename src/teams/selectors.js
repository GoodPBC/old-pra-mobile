import { createSelector } from 'reselect';

export const getTeams = (state) => state.teams.teams;
const getCurrentTeamId = (state) => state.teams.currentTeamId;
const getSelectedTeamId = (state) => state.teams.selectedTeamId;

export const getCurrentTeam = createSelector(
  [getTeams, getCurrentTeamId],
  (teams, currentTeamId) => {
    console.log({ teams, currentTeamId });
    return teams.find(team => team.id === currentTeamId);
  }
);

export const getSelectedTeam = createSelector(
  [getTeams, getSelectedTeamId],
  (teams, selectedTeamId) => {
    return teams.find(team => team.id === selectedTeamId);
  }
);
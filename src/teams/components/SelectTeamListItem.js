import React, { PropTypes } from 'react';
import { Image, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import detailArrowImage from '../../serviceRequests/components/img/details-arrow-icon-white.png';
import { LIGHT_BLUE, Radio } from '../../shared';

export default function SelectTeamListItem({ selected, onSelectTeam, onViewTeamDetails, team }) {
  // Add this button for Team Detail Screen
  // <TouchableOpacity style={styles.detailsLink} onPress={() => onViewTeamDetails(team)}>
  //   <View>
  //     <Image source={detailArrowImage} />
  //   </View>
  // </TouchableOpacity>

  return (
    <View key={team.id} style={styles.container}>
      <TouchableOpacity
        style={styles.selectableName}
        onPress={() => onSelectTeam(team)}
        underlayColor={'gray'}>
        <View style={styles.teamNameContainer}>
          <View style={styles.checkboxContainer}>
            <Radio checked={selected} />
          </View>
          <Text style={styles.teamName}>{team.name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

SelectTeamListItem.propTypes = {
  selected: PropTypes.bool,
  onViewTeamDetails: PropTypes.func.isRequired,
  onSelectTeam: PropTypes.func.isRequired,
  team: PropTypes.object.isRequired,
};


const styles = StyleSheet.create({
  checkboxContainer: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsLink: {
    flex: 0,
    paddingRight: 20,
  },
  selectableName: {
    flex: 1,
    paddingVertical: 20,
  },
  teamName: {
    color: LIGHT_BLUE,
  },
  teamNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

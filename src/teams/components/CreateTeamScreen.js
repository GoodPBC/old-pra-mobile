import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {
  InvertButton,
  InvertText,
  InvertTextInput,
  Separator,
  LIGHT_BLUE,
  X_AXIS_PADDING,
} from '../../shared';

export default class CreateTeamScreen extends Component {
  constructor(props){
    super(props);

    this.state = {
      teamName: null
    };

    this._onChangeText = this._onChangeText.bind(this);
    this._onSubmitForm = this._onSubmitForm.bind(this);
  }

  _onChangeText(text) {
    this.setState({ teamName: text});
  }

  _onSubmitForm() {
    this.props.createTeam(this.state.teamName);
    this.props.onFinish();
  }

  _renderWarningText() {
    const { currentTeam } = this.props;
    return (
      <View style={styles.warning}>
        <InvertText style={styles.warningText}>BY CREATING THIS TEAM YOU WILL BE REMOVED FROM TEAM</InvertText>
        <Separator style={{width: 200, marginTop: 20, marginBottom: 20}}/>
        <InvertText style={styles.teamName}>{currentTeam.name}</InvertText>
      </View>
    );
  }

  render() {
    const { currentTeam } = this.props;
    return(
      <View style={styles.container}>
        {currentTeam && this._renderWarningText()}
        <View>
          <InvertTextInput
            style={styles.input}
            onChangeText={this._onChangeText}
            placeholder="Team Name"
            value={this.state.teamName} />
          <InvertButton onPress={this._onSubmitForm}>Create Team</InvertButton>
        </View>
      </View>
    );
  }
}

CreateTeamScreen.propTypes = {
  currentTeam: PropTypes.object,
  createTeam: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LIGHT_BLUE,
    flex: 1,
    paddingLeft: X_AXIS_PADDING,
    paddingRight: X_AXIS_PADDING,
    justifyContent: 'space-around',
  },
  input: {
    marginBottom: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1
  },
  teamName: {
    fontStyle: 'italic',
    fontSize: 30,
  },
  warningText: {
    fontSize: 18,
    textAlign: 'center'
  },
  warning: {
    alignItems: 'center',
  }
});
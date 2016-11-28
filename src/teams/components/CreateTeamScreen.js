import React, { Component, PropTypes } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  GradientBackground,
  InvertButton,
  InvertTextInput,
  X_AXIS_PADDING,
} from '../../shared';
import CreateTeamWarningHeader from './CreateTeamWarningHeader';

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
    this.setState({ teamName: text });
  }

  _onSubmitForm() {
    this.props.createTeam(this.state.teamName);
    this.props.onFinish();
  }

  render() {
    const { currentTeam } = this.props;
    return (
      <GradientBackground
        style={styles.container}>
        {currentTeam && <CreateTeamWarningHeader currentTeam={currentTeam} />}
        <View>
          <InvertTextInput
            style={styles.input}
            onChangeText={this._onChangeText}
            placeholder="Team Name"
            value={this.state.teamName} />
          <InvertButton onPress={this._onSubmitForm}>Create Team</InvertButton>
        </View>
      </GradientBackground>
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
});
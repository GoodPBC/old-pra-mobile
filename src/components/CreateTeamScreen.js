import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Button from './Button';

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

  render() {
    return(
      <View style={styles.container}>
        <Text>Enter a team name</Text>
        <TextInput style={styles.input} onChangeText={this._onChangeText} />
        <Button onPress={this._onSubmitForm}>Create Team</Button>
      </View>
    );
  }
}

CreateTeamScreen.propTypes = {
  createTeam: PropTypes.func.isRequired,
  onFinish: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 30,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1
  },
});
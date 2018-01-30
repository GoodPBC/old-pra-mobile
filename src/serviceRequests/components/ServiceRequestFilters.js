import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import {
  Button,
  DARK_BLUE,
} from '../../shared';

const FILTERS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export default class ServiceRequestFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentFilter: FILTERS.ACTIVE,
    };
  }

  _changeFilter(filterType) {
    this.setState({ currentFilter: filterType },
      () => this.props.onFilterChange(filterType));
  }

  _isSelected(filterType) {
    return this.state.currentFilter === filterType;
  }

  renderFilterButton(filterType, name) {
    const additionalStyles = {};
    additionalStyles[FILTERS.ACTIVE] = s.leftButton;
    additionalStyles[FILTERS.INACTIVE] = s.rightButton;

    const buttonStyle = this._isSelected(filterType) ? s.buttonActive : s.button;
    const textStyle = this._isSelected(filterType) ? s.textActive : s.text;
    return (
      <Button
        style={[buttonStyle, additionalStyles[filterType]]}
        textStyle={textStyle}
        onPress={ () => this._changeFilter(filterType)}
      >{name}</Button>
    );
  }

  render() {
    return (
      <View style={s.buttonRow}>
        {this.renderFilterButton(FILTERS.ACTIVE, 'Active')}
        {this.renderFilterButton(FILTERS.INACTIVE, 'Closed')}
      </View>
    );
  }
}

ServiceRequestFilters.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
};

const s = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: DARK_BLUE,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 10
  },
  button: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: DARK_BLUE
  },
  buttonActive: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
  },
  leftButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  text: {
    color: 'white',
    fontSize: 14,
  },
  textActive: {
    color: DARK_BLUE,
    fontSize: 14,
  }
});
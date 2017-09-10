import React from 'react';
import {Provider} from 'react-redux';
import {View, StatusBar, Text} from 'react-native';
import Router from './src/scenes/router';

export default class App extends React.Component {
  render() {
    return (
      <Router/>
    );
  }
}

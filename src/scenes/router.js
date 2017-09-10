import React, {Element} from 'react'
import { Provider } from 'react-redux'
import {Platform, Alert, BackHandler, StatusBar} from 'react-native';
import {Router} from 'react-native-router-flux'
import createReduxStore from '../store/createReduxStore'
import scenes from './scenes'

const getSceneStyle = () => ({
  flex: 1,
  backgroundColor: '#231f21',
  //paddingTop: Platform.iOS ? null: 20,
})

const reduxStore = createReduxStore()

export default() : Element => (
  <Provider store={reduxStore}>
    <Router scenes={scenes} getSceneStyle={getSceneStyle} navigationBarStyle={{
      borderBottomColor: 'transparent',
      borderBottomWidth: 65
    }}/>
  </Provider>
)

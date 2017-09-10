import { AppRegistry, StatusBar } from 'react-native';
import App from './App';

StatusBar.setHidden(false)
StatusBar.setBackgroundColor('#231f21')
AppRegistry.registerComponent('FitTest', () => App);

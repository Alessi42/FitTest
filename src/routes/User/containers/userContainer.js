import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform
} from 'react-native'
import {Actions} from 'react-native-router-flux'
import TodoItems from '../../../components/TodoItems'
import WheelCurvedPicker from 'react-native-wheel-picker'

class User extends Component {
  render() {
    console.log(WheelCurvedPicker)
    return (
      <View style={styles.container}>
        <WheelCurvedPicker/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})

export default User

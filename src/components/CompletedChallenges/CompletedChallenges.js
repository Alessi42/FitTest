import React, {Component} from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native'
import { ListView } from 'realm/react-native'

export default class App extends Component {
  state = {textInput: ''}
  _onSubmit (e) {
    const {createCompletedChallenge} = this.props
    if (e && e.nativeEvent.text.trim().length > 0) {
      createCompletedChallenge(1,1,parseFloat(e.nativeEvent.text.trim()))
    }
    this.setState({textInput: ''})
  }
  render () {
    const {dataSource, deleteCompletedChallenge} = this.props
    const {textInput} = this.state
    return (
      <View style={styles.container}>
        <TextInput
          blurOnSubmit={false}
          keyboardType='numeric'
          style={styles.textInput}
          onSubmitEditing={(e) => this._onSubmit(e)}
          value={textInput}
          onChange={(event) => this.setState({textInput: event.nativeEvent.text})} />
        {dataSource.length ?
        <ListView
          dataSource={dataSource}
          renderRow={(CompletedChallenge) => <Text style={{color: '#fff'}} onPress={() => deleteCompletedChallenge(CompletedChallenge)}>{CompletedChallenge.time}</Text>}
        />
      : null
      }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    height: 50,
    borderRadius: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    marginHorizontal: 12,
    paddingHorizontal: 12
  }
})

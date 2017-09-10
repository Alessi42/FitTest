import React from 'react'
import {View, ScrollView, Text, TouchableOpacity, StyleSheet} from 'react-native'
import Dimensions from 'Dimensions';

const {width,height} = Dimensions.get('window');

const Score = (props) => {
  const {level, completed} = props
  return (
    <View style={styles.container}></View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between'
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    fontSize: 30
  },
  score: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  bar: {
    height: 8,
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
})

export default Score

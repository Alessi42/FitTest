import React from 'react'
import {View, TouchableOpacity, StyleSheet} from 'react-native'

const StarRating = (props) => {
  const {tab, handleTabPress} = props
  var circles = []
  for(let i = 0; i < 5; i++){
    circles.push(
      <TouchableOpacity key={i} onPress={e => handleTabPress(i)} style={styles.touchable}>
        <View style={[{backgroundColor: i == tab ? '#fff':'#555'}, styles.circle]} />
      </TouchableOpacity>
    )
  }
  return (
    <View style={styles.container}>
      { circles }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  touchable: {
    height: 14,
    width: 30,
    paddingLeft: 8,
    paddingRight: 8,
  },
  circle: {
    height: 14,
    width: 14,
    borderRadius: 7,
  }
})

export default StarRating

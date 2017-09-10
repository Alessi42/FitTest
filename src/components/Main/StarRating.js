import React from 'react'
import {View, Image, StyleSheet} from 'react-native'

const StarRating = (props) => {
  const {rating} = props
  var stars = []
  for(let i = 0; i < 5; i++){
    stars.push(
      <Image key={i} style={[{tintColor: i <= rating? '#fff':'#555'}, styles.star]} source={require('../Icons/Star.png')}></Image>
    )
  }
  return (
    <View style={styles.container}>
      { stars }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    padding: 16,
  },
  star: {
    height: 16,
    width: 16
  }
})

export default StarRating

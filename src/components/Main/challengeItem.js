import React from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native'

const challengeItem = (props) => {
  const {id, name, record, thumbnail} = props
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image
          style={{height: 56, width: 100, resizeMode: 'cover'}}
          source={thumbnail? {uri: thumbnail} : require("../Icons/Thumbnail.png")}
      />
      <View style={styles.textContainer}>
        <Text style={styles.nameText}>
          {name.toUpperCase()}
        </Text>
        <Text style={styles.recordText}>
          Record: {record? record: "N/A"}
        </Text>
      </View>
      <Image style={styles.graph} source={require('../Icons/Graph.png')}/>
    </TouchableOpacity>
  )
}
/*
<TouchableOpacity style={styles.container}>
  {thumbnail? <Image source={thumbnail}/>: null}
  <View style={styles.textContainer}>
    <Text>
      please
    </Text>
    <Text>
      Record: word
    </Text>
  </View>
</TouchableOpacity>
 */
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 72,
    padding: 4,
    paddingLeft: 16,
    paddingRight: 16,
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  nameText: {
    textAlign: 'center',
    fontSize: 22,
    color: '#fff'
  },
  recordText: {
    fontSize: 16,
    color: '#bbb'
  },
  graph: {
    height: 30,
    width: 30,
    tintColor: '#fff'
  }
})

export default challengeItem

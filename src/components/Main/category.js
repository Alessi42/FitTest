import React from 'react'
import {View, ScrollView, Text, TouchableOpacity, StyleSheet, Platform, Image} from 'react-native'
import Dimensions from 'Dimensions';
const {width,height} = Dimensions.get('window');


const Category = (props) => {
  const {category, scene} = props
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Image resizeMode="contain" style={styles.backgroundImage} source={category.background}>
        <View style={styles.imageContainer}>
      {category.icon ? <Image style={styles.image} source={category.icon} />:null}
      <Text style={styles.text}>{category.title}</Text>
      </View>
      </Image>
    {/* <Image style={styles.image} source={require('../Icons/ChevronRight.png')} /> */}
    </TouchableOpacity>
  )
}



const styles = StyleSheet.create({
  container: {
    width: (width/2)-16,
    height: (width/2)-16,
    margin: 4,
    justifyContent: 'center',
    alignItems:'center'
  },
  text: {
    fontFamily: (Platform.OS === 'ios') ? 'Arial': 'Roboto',
    fontWeight: '300',
    fontSize: 16,
    padding: 8,
    color: '#EEE',
  },
  image: {
    height: 38,
    width: 38,
    tintColor: '#eee', //'#ecdca9',
    paddingRight: 8,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: (width/2)-16,
    height: (width/2)-16,
    backgroundColor:'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

{/* <TouchableOpacity style={styles.container} onPress={props.onPress}>
  {category.icon ? <Image style={styles.image} source={category.icon} />:null}
  <Text style={styles.text}>{category.title}</Text>
<Image style={styles.image} source={require('../Icons/ChevronRight.png')} />
</TouchableOpacity>
const styles = StyleSheet.create({
  container: {
    height: 50,
    margin: 1,
    marginTop: 0,
    backgroundColor: '#231f21',
    paddingLeft: 8,
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  text: {
    flex: 1,
    paddingLeft: 8,
    fontFamily: (Platform.OS === 'ios') ? 'Arial': 'Roboto',
    fontWeight: '300',
    fontSize: 20,
    color: '#EEE',
  },
  image: {
    height: 30,
    width: 30,
    tintColor: '#ecdca9',
    paddingRight: 8,
  }
}) */}

export default Category

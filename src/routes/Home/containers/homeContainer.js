import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native'
import Dimensions from 'Dimensions';
import {Actions} from 'react-native-router-flux'
import Counter from '../../../components/Counter/counter'
import Score from '../../../components/Main/score'
import Category from '../../../components/Main/category'

const {width, height} = Dimensions.get('window');

class Home extends Component {
  constructor() {
    super();
    this.state = {
      categories: [
        {
          key: 1,
          title: 'Warm-ups',
          completed: 0.2,
          component: 'WarmUps',
          icon: require('../../../components/Icons/WarmUps.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }, {
          key: 2,
          title: 'Cardio',
          completed: 0.2,
          component: 'Cardio',
          icon: require('../../../components/Icons/Heart.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }, {
          key: 3,
          title: 'Legs',
          completed: 0.2,
          component: 'Legs',
          icon: require('../../../components/Icons/Legs.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }, {
          key: 4,
          title: 'Arms',
          completed: 0.6,
          component: 'Arms',
          icon: require('../../../components/Icons/Arms.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }, {
          key: 5,
          title: 'Core',
          completed: 0.4,
          component: 'Core',
          icon: require('../../../components/Icons/Core.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }, {
          key: 6,
          title: 'Cool downs',
          completed: 0.7,
          component: 'CoolDowns',
          icon: require('../../../components/Icons/CoolDowns.png'),
          background: require('../../../components/Icons/ArmsBackground.jpg')
        }
      ]
    }
  }
  onPress(category) {
    if (typeof category !== "undefined") {
      Actions.workouts({title: category.title.toUpperCase()});
    } else {
      Actions.progress();
    }
  }
  componentWillMount() {
  }
  // <Image source={require('../assets/background.png')} style={styles.backgroundImage}>
  // contentContainerStyle={styles.container}
  render() {
    const createCategories = () => {
      return this.state.categories.map((category) => {
        return <Category key={category.key} category={category} onPress={() => this.onPress(category)}/>
      });
    }
    return (
      <ScrollView style={styles.container}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo} source={require('../assets/TextLogo.png')} />
        </View>
        <View style={styles.categoryContainer}>
          {createCategories()}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 56,
  },
  categoryContainer: {
    flex: 1,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    marginTop: 20
  },
  logoContainer: {
    alignItems: 'center',
    padding: 4
  },
  logo: {
    height: 52,
    width: 204,
  },
  recentWorkouts: {
    flex: 1
  }
})

export default Home
